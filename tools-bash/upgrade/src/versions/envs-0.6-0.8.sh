#!/bin/bash -i

# node env
if [ "$PARAM_NODE_NAME" = "root-node" ]; then
    sed -i "s/CHAIN_ID=.*/CHAIN_ID=\"cudos-testnet-private-3\"/g" "$MIGRATED_NODE_ENV"
fi
