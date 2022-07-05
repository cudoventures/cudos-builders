#!/bin/bash

cd ${OSMOSIS_HOME}
rm ${OSMOSIS_HOME}/config/genesis.json

osmosisd init osmosis-test-node --chain-id=osmo-test-4 --home $OSMOSIS_HOME

echo "Setting up config.toml"
sed -i "s/seeds = \".*\"/seeds = \"$SEEDS\"/g" "${OSMOSIS_HOME}/config/config.toml"
sed -i "s/persistent_peers = \".*\"/persistent_peers = \"$PERSISTENT_PEERS\"/g" "${OSMOSIS_HOME}/config/config.toml"

# for port 26657
sed -i "s/laddr = \"tcp:\/\/127.0.0.1:26657\"/laddr = \"tcp:\/\/0.0.0.0:26657\"/" "${OSMOSIS_HOME}/config/config.toml"

cd ${OSMOSIS_HOME}/config

wget $GENESIS_URL && \
    tar -xjf genesis.tar.bz2 && \
    rm genesis.tar.bz2

osmosisd unsafe-reset-all --home $OSMOSIS_HOME


cd ${OSMOSIS_HOME}

wget -O data.tar.lz4 $SNAPSHOT_URL && \
    lz4 -d data.tar.lz4 | tar -xvf - && \
    rm data.tar.lz4