#!/bin/bash -i

echo -ne "Preparing the binary builder...";
cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/binary-builder"
dockerResult=$(docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder build 2> /dev/null)
if [ "$?" != 0 ]; then
    echo -e "${COLOR_RED}Error:${COLOR_DEFAULT} There was an error building the container $?: ${dockerResult}";
    exit 1;
fi
echo -e "${COLOR_GREEN}OK${COLOR_DEFAULT}";

echo -ne "Preparing the $NODE_NAME...";
cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME"
dockerResult=$(docker-compose --env-file ./full-node.client.mainnet.arg -f ./init-full-node.yml -p cudos-init-full-node-client-mainnet up --build 2> /dev/null)
if [ "$?" != 0 ]; then
    echo -e "${COLOR_RED}Error:${COLOR_DEFAULT} There was an error building the container $?: ${dockerResult}";
    exit 1;
fi
echo -e "${COLOR_GREEN}OK${COLOR_DEFAULT}";

if [ $IS_VALIDATOR = "true" ]; then
    echo -ne "Initializing the validator...";
    cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME"
    sed -i "s/cudos-noded start/sleep infinity/g" ./start-full-node.dockerfile
    dockerResult=$(docker-compose --env-file ./full-node.client.mainnet.arg -f ./start-full-node.yml -p cudos-start-full-node-client-mainnet-01 up --build -d 2> /dev/null)
    if [ "$?" != 0 ]; then
        echo -e "${COLOR_RED}Error:${COLOR_DEFAULT} There was an error building the container $?: ${dockerResult}";
        exit 1;
    fi
    sed -i "s/sleep infinity/cudos-noded start/g" ./start-full-node.dockerfile
    echo -e "${COLOR_GREEN}OK${COLOR_DEFAULT}";
fi