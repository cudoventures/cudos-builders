#!/bin/bash -i

cd $PARAM_SOURCE_DIR

echo -ne "Cloning the repos...";
branch="v0.7.0"
git clone -q --branch $branch https://github.com/CudoVentures/cudos-builders.git CudosBuilders
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Copying the .env files...";
\cp -f "$WORKING_DIR/config/relayer.env" "$PARAM_SOURCE_DIR/CudosBuilders/docker/hermes-ibc-relayer/hermes-ibc-relayer.mainnet.env";

dockerIgnorePath="$PARAM_SOURCE_DIR/.dockerignore"
if [ ! -f "$dockerIgnorePath" ]; then
    echo "OsmosisData" > $dockerIgnorePath;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
