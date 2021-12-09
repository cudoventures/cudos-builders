#!/bin/bash

osmosisd init vtestnode --chain-id=osmosis-testnet-0 --home $OSMOSIS_HOME

echo "Setting up config.toml"
sed -i "s/seeds = \".*\"/seeds = \"$SEEDS\"/g" "${OSMOSIS_HOME}/config/config.toml"

cd $OSMOSIS_HOME && /
    git clone https://github.com/cosmos/cosmos-sdk && \
    cd cosmos-sdk && \
    git checkout v0.42.9 && \
    make cosmovisor && \
    cp cosmovisor/cosmovisor $GOPATH/bin/cosmovisor

cd $OSMOSIS_HOME && \
    mkdir -p cosmovisor && \
    mkdir -p cosmovisor/genesis && \
    mkdir -p cosmovisor/genesis/bin && \
    mkdir -p cosmovisor/upgrades

echo "# Setup Cosmovisor" >> ~/.profile
echo "export DAEMON_NAME=osmosisd" >> ~/.profile
echo "export DAEMON_HOME=$OSMOSIS_HOME" >> ~/.profile
echo "export DAEMON_ALLOW_DOWNLOAD_BINARIES=false" >> ~/.profile
echo "export DAEMON_LOG_BUFFER_SIZE=512" >> ~/.profile
echo "export DAEMON_RESTART_AFTER_UPGRADE=true" >> ~/.profile
source ~/.profile

cd $OSMOSIS_HOME/config && \
    wget https://github.com/osmosis-labs/networks/raw/unity/v4/osmosis-1/upgrades/v4/testnet/genesis.tar.bz2 && \
    tar -xjf genesis.tar.bz2

cp $GOPATH/bin/osmosisd $OSMOSIS_HOME/cosmovisor/genesis/bin

cosmovisor version
osmosisd version

osmosisd unsafe-reset-all

cp -r /mnt/snapshot/data-new ${OSMOSIS_HOME}/data

DAEMON_NAME=osmosisd
DAEMON_HOME=${OSMOSIS_HOME}
DAEMON_RESTART_AFTER_UPGRADE=true
DAEMON_ALLOW_DOWNLOAD_BINARIES=false
DAEMON_LOG_BUFFER_SIZE=512
User=$USER

cosmovisor start --home ${OSMOSIS_HOME}
