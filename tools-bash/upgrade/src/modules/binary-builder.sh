#!/bin/bash -i

echo "" # new line

echo -ne "Preparing the binary builder...";
cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/binary-builder"
dockerResult=$(docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder build 2>&1)
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error building the binary builder for export $?: ${dockerResult}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
