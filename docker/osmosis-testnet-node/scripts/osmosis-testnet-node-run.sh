#!/bin/bash

cd ${OSMOSIS_HOME}
mkdir -p cosmovisor
mkdir -p cosmovisor/genesis
mkdir -p cosmovisor/genesis/bin
mkdir -p cosmovisor/upgrades

rm ${OSMOSIS_HOME}/config/genesis.json

osmosisd init cudos-test-node --chain-id=osmosis-testnet-0 --home $OSMOSIS_HOME

echo "Setting up config.toml"
sed -i "s/seeds = \".*\"/seeds = \"$SEEDS\"/g" "${OSMOSIS_HOME}/config/config.toml"

cp cosmovisor/cosmovisor $GOPATH/bin/cosmovisor

wget https://github.com/osmosis-labs/networks/raw/unity/v4/osmosis-1/upgrades/v4/testnet/genesis.tar.bz2 && \
    tar -xjf genesis.tar.bz2

cp $GOPATH/bin/osmosisd $OSMOSIS_HOME/cosmovisor/genesis/bin

osmosisd unsafe-reset-all
wget -O - $SNAPSHOT_URL | xz -d -v | tar xf -