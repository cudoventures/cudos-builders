#!/bin/bash -i

# node env
if [ "$PARAM_NODE_NAME" = "root-node" ]; then
    sed -i "s/CHAIN_ID=.*/CHAIN_ID=\"$TARGET_CHAIN_ID\"/g" "$MIGRATED_NODE_ENV"
fi
