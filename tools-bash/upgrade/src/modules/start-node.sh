#!/bin/bash -i

echo "" # new line

echo -e "${STYLE_BOLD}Starting:${STYLE_DEFAULT}";

echo -ne "Starting the node...";
cd "$NODE_BUILDERS_DOCKER_PATH"
dockerResult=$(docker-compose --env-file $NODE_ARG_PATH -f ./$START_YML -p ${START_CONTAINER_NAME} up --build -d 2>&1);
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error building the sleeping node for export $?: ${dockerResult}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
