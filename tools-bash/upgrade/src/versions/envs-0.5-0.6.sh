#!/bin/bash -i

# node env
if [ "$PARAM_NODE_NAME" = "root-node" ]; then
    sed -i "s/CHAIN_ID=.*/CHAIN_ID=\"$TARGET_CHAIN_ID\"/g" "$MIGRATED_NODE_ENV"
fi

# if [ "$PARAM_NODE_NAME" = "seed-node" ]; then
# fi

# if [ "$PARAM_NODE_NAME" = "sentry-node" ]; then
# fi

# if [ "$PARAM_NODE_NAME" = "full-node" ]; then
# fi

# orchestrator env
# if [ "$HAS_ORCHESTRATOR" = "true" ]; then
# fi
