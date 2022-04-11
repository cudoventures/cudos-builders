#!/bin/bash -i

echo "" # new line

echo -e "${STYLE_BOLD}Exporting the genesis.json:${STYLE_DEFAULT}";

echo -ne "Stopping the container...";
docker stop "$START_CONTAINER_NAME" &> /dev/null
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Preparing the binary builder...";
cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/binary-builder"
dockerResult=$(docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder build 2> /dev/null)
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error building the binary builder for export $?: ${dockerResult}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Configuring the node in sleep mode...";
cd "$NODE_BUILDERS_DOCKER_PATH"
sed -i "s/cudos-noded start/sleep infinity/g" "./$START_DOCKERFILE";
sed -i "s/--state-sync.snapshot-interval 2000 --state-sync.snapshot-keep-recent 2//g" "./$START_DOCKERFILE";
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Starting the container for data export...";
cd "$NODE_BUILDERS_DOCKER_PATH"
dockerResult=$(docker-compose --env-file $NODE_ARG_PATH -f ./$START_YML -p ${START_CONTAINER_NAME} up --build -d 2> /dev/null);
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error building the sleeping node for export $?: ${dockerResult}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Exporting the data...";
# docker container exec "$START_CONTAINER_NAME" /bin/bash -c "rm -rf \"\$CUDOS_HOME/backup\"" &> /dev/null;
# docker container exec "$START_CONTAINER_NAME" /bin/bash -c "mkdir -p \"\$CUDOS_HOME/backup\""  &> /dev/null;
# docker container exec "$START_CONTAINER_NAME" /bin/bash -c "cudos-noded export |& tee \"\$CUDOS_HOME/backup/genesis.exported.json\""  &> /dev/null;
docker container exec "$START_CONTAINER_NAME" /bin/bash -c "cudos-noded export" |& tee "$WORKING_MIGRATE_DIR/genesis.exported.json" &> /dev/null;
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Stopping the container...";
docker stop "$START_CONTAINER_NAME" &> /dev/null
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Restoring the node in default mode...";
cd "$NODE_BUILDERS_DOCKER_PATH"
if [ "$PARAM_NODE_NAME" = "root-node" ] || [ "$PARAM_NODE_NAME" = "full-node" ]; then
    sed -i "s/sleep infinity/cudos-noded start/g" "./$START_DOCKERFILE";
else
    sed -i "s/sleep infinity/cudos-noded start --state-sync.snapshot-interval 2000 --state-sync.snapshot-keep-recent 2/g" "./$START_DOCKERFILE";
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
