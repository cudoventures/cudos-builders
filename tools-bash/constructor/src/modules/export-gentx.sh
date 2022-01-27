#!/bin/bash -i

timestamp=$(date +%s)

rm -rf "$WORKING_DIR/gen-tx"
mkdir -p "$WORKING_DIR/gen-tx"
cd "$PARAM_SOURCE_DIR/CudosData/cudos-data-full-node-client-mainnet/config/gentx/"
files=(*)
cp "$PARAM_SOURCE_DIR/CudosData/cudos-data-full-node-client-mainnet/config/gentx/${files[0]}" "$WORKING_DIR/gen-tx/gentx-$MONIKER-$timestamp.json"