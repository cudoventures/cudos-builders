#!/bin/bash -i

echo -ne "Preparing the binary builder...";
cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/binary-builder"
dockerResult=$(docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder build 2> /dev/null)
if [ "$?" != 0 ]; then
    echo -e "${COLOR_RED}Error:${COLOR_DEFAULT} There was an error building the container $?: ${dockerResult}";
    exit 1;
fi
echo -e "${COLOR_GREEN}OK${COLOR_DEFAULT}";