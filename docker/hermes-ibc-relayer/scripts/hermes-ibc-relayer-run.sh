#!/bin/bash

echo "Setting chain ids in config.toml"
sed -zi "s/id = '[^']*'/id = \'${CHAIN_ID_0}\'/1" "/root/.hermes/config.toml"
sed -zi "s/id = '[^']*'/id = \'${CHAIN_ID_1}\'/2" "/root/.hermes/config.toml"

echo "Setting up wallets for each chain"
hermes keys restore ${CHAIN_ID_0} -m "${SEED_0}"
hermes keys restore ${CHAIN_ID_1} -m "${SEED_1}"

echo "Creating channel"
hermes create channel ${CHAIN_ID_0} ${CHAIN_ID_1} --port-a transfer --port-b transfer

echo "Starting relayer"
hermes start