#!/bin/bash -i

# node env
if [ "$PARAM_NODE_NAME" = "root-node" ]; then
    sed -i "/CUDOS_HOME/d" "$MIGRATED_NODE_ENV"
    sed -i "s/CHAIN_ID=.*/CHAIN_ID=\"cudos-testnet-private-2\"/g" "$MIGRATED_NODE_ENV"

    echo "" >> "$MIGRATED_NODE_ENV"
    echo "MONITORING_ENABLED=\"false\"" >> "$MIGRATED_NODE_ENV"
    echo "ADDR_BOOK_STRICT=\"true\"" >> "$MIGRATED_NODE_ENV"
    echo "GRAVITY_MODULE_BALANCE=\"10000000000000000000000000000\"" >> "$MIGRATED_NODE_ENV"
    echo "CUDOS_TOKEN_CONTRACT_ADDRESS=\"0x9fdE6D55dDa637806DbF016a03B6970613630333\"" >> "$MIGRATED_NODE_ENV"
    echo "NUMBER_OF_VALIDATORS=\"3\"" >> "$MIGRATED_NODE_ENV"
    echo "NUMBER_OF_ORCHESTRATORS=\"3\"" >> "$MIGRATED_NODE_ENV"
    echo "VALIDATOR_BALANCE=\"2000000000000000000000000\"" >> "$MIGRATED_NODE_ENV"
    echo "ORCHESTRATOR_BALANCE=\"1000000000000000000000000\"" >> "$MIGRATED_NODE_ENV"
    echo "FAUCET_BALANCE=\"20000000000000000000000000000\"" >> "$MIGRATED_NODE_ENV"
    echo "KEYRING_OS_PASS=\"123123123\"" >> "$MIGRATED_NODE_ENV"
    echo "" >> "$MIGRATED_NODE_ENV"
fi

if [ "$PARAM_NODE_NAME" = "seed-node" ]; then
    sed -i "/CUDOS_HOME/d" "$MIGRATED_NODE_ENV"

    echo "" >> "$MIGRATED_NODE_ENV"
    echo "SEEDS=\"\"" >> "$MIGRATED_NODE_ENV"
    echo "SHOULD_USE_STATE_SYNC=\"false\"" >> "$MIGRATED_NODE_ENV"
    echo "MONITORING_ENABLED=\"false\"" >> "$MIGRATED_NODE_ENV"
    echo "EXTERNAL_ADDRESS=\"\"" >> "$MIGRATED_NODE_ENV"
    echo "ADDR_BOOK_STRICT=\"true\"" >> "$MIGRATED_NODE_ENV"
    echo "" >> "$MIGRATED_NODE_ENV"
fi

if [ "$PARAM_NODE_NAME" = "sentry-node" ]; then
    sed -i "/CUDOS_HOME/d" "$MIGRATED_NODE_ENV"

    echo "" >> "$MIGRATED_NODE_ENV"
    echo "SHOULD_USE_STATE_SYNC=\"false\"" >> "$MIGRATED_NODE_ENV"
    echo "MONITORING_ENABLED=\"false\"" >> "$MIGRATED_NODE_ENV"
    echo "EXTERNAL_ADDRESS=\"\"" >> "$MIGRATED_NODE_ENV"
    echo "ADDR_BOOK_STRICT=\"true\"" >> "$MIGRATED_NODE_ENV"
    echo "" >> "$MIGRATED_NODE_ENV"
fi

if [ "$PARAM_NODE_NAME" = "full-node" ]; then
    sed -i "/CUDOS_HOME/d" "$MIGRATED_NODE_ENV"

    echo "" >> "$MIGRATED_NODE_ENV"
    echo "SHOULD_USE_STATE_SYNC=\"false\"" >> "$MIGRATED_NODE_ENV"
    echo "MONITORING_ENABLED=\"false\"" >> "$MIGRATED_NODE_ENV"
    echo "EXTERNAL_ADDRESS=\"\"" >> "$MIGRATED_NODE_ENV"
    echo "ADDR_BOOK_STRICT=\"true\"" >> "$MIGRATED_NODE_ENV"
    echo "" >> "$MIGRATED_NODE_ENV"
fi

# orchestrator env
if [ "$HAS_ORCHESTRATOR" = "true" ]; then
    sed -i "s/FEES=.*/FEES=\"5000000000000acudos\"/g" "$MIGRATED_ORCHESTRATOR_ENV"
fi
