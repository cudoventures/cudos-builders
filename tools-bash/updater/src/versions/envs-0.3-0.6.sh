#!/bin/bash -i

nodeEnv="$WORKING_MIGRATE_DIR/node.env"
orchestratorEnv="$WORKING_MIGRATE_DIR/orchestrator.env"

# node env
if [ "$PARAM_NODE_NAME" = "root-node" ]; then
    sed -i "/CUDOS_HOME/d" "$nodeEnv"

    echo "MONITORING_ENABLED=\"false\"" >> "$nodeEnv"
    echo "ADDR_BOOK_STRICT=\"true\"" >> "$nodeEnv"
    echo "GRAVITY_MODULE_BALANCE=\"10000000000000000000000000000\"" >> "$nodeEnv"
    echo "CUDOS_TOKEN_CONTRACT_ADDRESS=\"0x9fdE6D55dDa637806DbF016a03B6970613630333\"" >> "$nodeEnv"
    echo "NUMBER_OF_VALIDATORS=\"3\"" >> "$nodeEnv"
    echo "NUMBER_OF_ORCHESTRATORS=\"3\"" >> "$nodeEnv"
    echo "VALIDATOR_BALANCE=\"2000000000000000000000000\"" >> "$nodeEnv"
    echo "ORCHESTRATOR_BALANCE=\"1000000000000000000000000\"" >> "$nodeEnv"
    echo "FAUCET_BALANCE=\"20000000000000000000000000000\"" >> "$nodeEnv"
    echo "KEYRING_OS_PASS=\"123123123\"" >> "$nodeEnv"
fi

if [ "$PARAM_NODE_NAME" = "seed-node" ]; then
    sed -i "/CUDOS_HOME/d" "$nodeEnv"

    echo "SEEDS=\"\"" >> "$nodeEnv"
    echo "SHOULD_USE_STATE_SYNC=\"false\"" >> "$nodeEnv"
    echo "MONITORING_ENABLED=\"false\"" >> "$nodeEnv"
    echo "EXTERNAL_ADDRESS=\"\"" >> "$nodeEnv"
    echo "ADDR_BOOK_STRICT=\"true\"" >> "$nodeEnv"
fi

if [ "$PARAM_NODE_NAME" = "sentry-node" ]; then
    sed -i "/CUDOS_HOME/d" "$nodeEnv"

    echo "SHOULD_USE_STATE_SYNC=\"false\"" >> "$nodeEnv"
    echo "MONITORING_ENABLED=\"false\"" >> "$nodeEnv"
    echo "EXTERNAL_ADDRESS=\"\"" >> "$nodeEnv"
    echo "ADDR_BOOK_STRICT=\"true\"" >> "$nodeEnv"
fi

if [ "$PARAM_NODE_NAME" = "full-node" ]; then
    sed -i "/CUDOS_HOME/d" "$nodeEnv"

    echo "SHOULD_USE_STATE_SYNC=\"false\"" >> "$nodeEnv"
    echo "MONITORING_ENABLED=\"false\"" >> "$nodeEnv"
    echo "EXTERNAL_ADDRESS=\"\"" >> "$nodeEnv"
    echo "ADDR_BOOK_STRICT=\"true\"" >> "$nodeEnv"
fi

# orchestrator env
if [ "$HAS_ORCHESTRATOR" = "true" ]; then
    sed -i "s/FEES=.*/FEES=\"5000000000000acudos\"/g" "$orchestratorEnv"
fi
