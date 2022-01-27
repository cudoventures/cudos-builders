#!/bin/bash -i

echo -ne "Preparing the binary builder...";
cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/binary-builder"
dockerResult=$(docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder build 2> /dev/null)
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error building the container $?: ${dockerResult}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Configurating the $NODE_NAME...";
cp "$WORKING_DIR/config/genesis.mainnet.json" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/genesis.json"
# Set private ids if available
if [ "$IS_VALIDATOR" = "true" ]; then
    sed -i "s/pex = true/pex = false/" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
    # Set only persistent peers
fi
if [ "$IS_VALIDATOR" = "false" ]; then
    # Set seeds
    echo "Set Seeds";
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Starting the $NODE_NAME...";
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";