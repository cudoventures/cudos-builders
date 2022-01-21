#!/bin/bash

cd ${OSMOSIS_HOME}
rm ${OSMOSIS_HOME}/config/genesis.json

osmosisd init cudos-test-node --chain-id=osmosis-testnet-0 --home $OSMOSIS_HOME

echo "Setting up config.toml"
sed -i "s/seeds = \".*\"/seeds = \"$SEEDS\"/g" "${OSMOSIS_HOME}/config/config.toml"
sed -i "s/persistent_peers = \".*\"/persistent_peers = \"$PERSISTENT_PEERS\"/g" "${CUDOS_HOME}/config/config.toml"

# for port 26657
sed -i "s/laddr = \"tcp:\/\/127.0.0.1:26657\"/laddr = \"tcp:\/\/0.0.0.0:26657\"/" "${CUDOS_HOME}/config/config.toml"

cd ${OSMOSIS_HOME}/config

wget https://github.com/osmosis-labs/networks/raw/unity/v4/osmosis-1/upgrades/v4/testnet/genesis.tar.bz2 && \
    tar -xjf genesis.tar.bz2

osmosisd unsafe-reset-all --home $OSMOSIS_HOME

wget -O - $SNAPSHOT_URL | xz -d -v | tar xf -