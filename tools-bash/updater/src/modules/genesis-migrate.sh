#!/bin/bash -i

echo "" # new line

echo -e "${STYLE_BOLD}Migrating the genesis.json:${STYLE_DEFAULT}";

echo -ne "Preparing the binary builder...";
cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/binary-builder"
dockerResult=$(docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder build 2>&1)
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

echo -ne "Starting the container for migration...";
cd "$NODE_BUILDERS_DOCKER_PATH"
dockerResult=$(docker-compose --env-file $NODE_ARG_PATH -f ./$START_YML -p ${START_CONTAINER_NAME} up --build -d 2>&1);
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error building the sleeping node for migration $?: ${dockerResult}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Migrating genesis.json...";
\cp -f "$WORKING_MIGRATE_DIR/genesis.exported.json" "$WORKING_MIGRATE_DIR/genesis.migrated.json"

if [ "$UPDATE_FROM_VERSION" = "v0.3" ] && [ "$UPDATE_TO_VERSION" = "v0.6.0" ]; then
    # no need to execute cudos-noded migrate because both version are running 0.44
    source "$WORKING_SRC_VERSIONS_DIR/genesis-0.3-0.6.sh"
fi

\cp -f "$WORKING_MIGRATE_DIR/genesis.migrated.json" "$VOLUME_PATH/config/genesis.json"

user=$(ls -ld "$WORKING_MIGRATE_DIR/.." | awk '{print $3}')
group=$(ls -ld "$WORKING_MIGRATE_DIR/.." | awk '{print $4}')

chown "$user":"$group" -R "$WORKING_MIGRATE_DIR"
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Resetting the state...";
docker container exec $START_CONTAINER_NAME /bin/bash -c "cudos-noded unsafe-reset-all" &> /dev/null
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
