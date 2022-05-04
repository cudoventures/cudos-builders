#!/bin/bash -i

echo -ne "Starting the node...";
cd "$NODE_BUILDER_PATH"
dockerResult=$(docker-compose --env-file "$NODE_ARG_PATH" -f "$START_YML" -p "$START_CONTAINER_NAME" up --build -d 2>&1)
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error building the starting container $?: ${dockerResult}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
