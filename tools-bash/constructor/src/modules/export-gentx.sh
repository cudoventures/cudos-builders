#!/bin/bash -i

timestampHumanReadable=$(date '+%Y%m%d%S')
timestamp=$(date '+%s')

rm -rf "$WORKING_DIR/gen-tx"

if [ $IS_VALIDATOR = "true" ]; then
    mkdir -p "$WORKING_DIR/gen-tx";
    cd "$PARAM_SOURCE_DIR/CudosData/cudos-data-full-node-client-mainnet/config/gentx/";
    firstFile=$(ls | head -1);
    cp "$PARAM_SOURCE_DIR/CudosData/cudos-data-full-node-client-mainnet/config/gentx/$firstFile" "$WORKING_DIR/gen-tx/gentx-$MONIKER-$timestampHumanReadable-$timestamp.json";
fi