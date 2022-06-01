#!/bin/bash -i

cd $PARAM_SOURCE_DIR

echo -ne "Cloning the repos...";
branch="v0.9.0"
git clone -q --branch $branch https://github.com/CudoVentures/cudos-builders.git CudosBuilders &> /dev/null
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Copying the .env files...";
if [ "$1" = "start" ]; then
    createChannel="true"
elif [ "$1" = "upgrade" ]; then
    createChannel="false"
else
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Unknown parameter of repo.sh: $1";
    exit 1;
fi
tmpRelayerEnv="/tmp/relayer.env"
\cp -f "$WORKING_DIR/config/relayer.env" "$tmpRelayerEnv"
echo "" >> "$tmpRelayerEnv"
echo "CREATE_CHANNEL=\"$createChannel\"" >> "$tmpRelayerEnv"
\cp -f "$tmpRelayerEnv" "$PARAM_SOURCE_DIR/CudosBuilders/docker/hermes-ibc-relayer/hermes-ibc-relayer.mainnet.env";

dockerIgnorePath="$PARAM_SOURCE_DIR/.dockerignore"
if [ ! -f "$dockerIgnorePath" ]; then
    echo "OsmosisData" > $dockerIgnorePath;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
