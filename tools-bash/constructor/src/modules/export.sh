#!/bin/bash -i

timestampHumanReadable=$(date '+%Y%m%d%S')
timestamp=$(date '+%s')

rm -rf "$WORKING_EXPORT_DIR"

if [ $IS_VALIDATOR = "true" ]; then
    mkdir -p "$WORKING_EXPORT_DIR";
    # cd "$PARAM_SOURCE_DIR/CudosData/cudos-data-full-node-client-mainnet/config/gentx/";
    # firstFile=$(ls | head -1);
    # cp -f "$PARAM_SOURCE_DIR/CudosData/cudos-data-full-node-client-mainnet/config/gentx/$firstFile" "$WORKING_DIR/gen-tx/gentx-$MONIKER-$timestampHumanReadable-$timestamp.json";
    echo $EXPORTED_GENESIS > "$WORKING_EXPORT_DIR/genesis-$MONIKER-$timestampHumanReadable-$timestamp.json";
fi

chmod -R 755 "$WORKING_EXPORT_DIR"
