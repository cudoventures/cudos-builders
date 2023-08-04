#!/bin/bash

# How to use: As of now, you need tag v0.5.0 of CudosBuilders, CudosGravityBridge and CudosNode and a CudosBuilders setup as per the readme ( folder structure )
# also you need a correct root-node.local.env in ../../docker/root-node/root-node.local.env
# an example is shown below
# Sample root-node.local.env
# MONIKER="local-test-node"
# CHAIN_ID="cudos-local-network"
# ORCH_ETH_ADDRESS=0x41D0B5762341B0FCE6aDCCF69572c663481C7286
# MONITORING_ENABLED="true"
# ADDR_BOOK_STRICT="false"
# GRAVITY_MODULE_BALANCE="10000000000000000000000000000"
# CUDOS_TOKEN_CONTRACT_ADDRESS="0xE92f6A5b005B8f98F30313463Ada5cb35500a919"
# NUMBER_OF_VALIDATORS="3"
# NUMBER_OF_ORCHESTRATORS="3"
# VALIDATOR_BALANCE="2000000000000000000000000"
# ORCHESTRATOR_BALANCE="1000000000000000000000000"
# FAUCET_BALANCE="20000000000000000000000000000"
# KEYRING_OS_PASS="123123123"
# This scripts generates a cudos-data folder based on the init-root script and calls cudos-noded start in the current dir

set -a # automatically export all variables
source ../../docker/root-node/root-node.local.env
set +a

if [[ "$OSTYPE" == "darwin"* ]]; then
    cp ../../docker/root-node/scripts/init-root.sh ./init-root-copy.sh
    sed -i '' "s/sed -i/sed -i \"\"/" "./init-root-copy.sh"
    sed -i '' "s/|& tee/>/" "./init-root-copy.sh"
    sed -e 's/[[:<:]]os[[:>:]]/test/g' "./init-root-copy.sh" >init-local-node.sh
    chmod a+x ./init-local-node.sh
    source ./init-local-node.sh
    rm ./init-root-copy.sh

    # https://github.com/cosmos/cosmos-sdk/issues/10081
    sed -i "" "/\[api\]/,/\[/ s/enable = false/enable = true/" "${CUDOS_HOME}/config/app.toml"
    sed -i "" "/\[grpc\]/,/\[/ s/enable = false/enable = true/" "${CUDOS_HOME}/config/app.toml"
else
    cp ../../docker/root-node/scripts/init-root.sh ./init-local-node.sh
    chmod a+x init-local-node.sh
    source ./init-local-node.sh

    # https://github.com/cosmos/cosmos-sdk/issues/10081
    sed -i "/\[api\]/,/\[/ s/enable = false/enable = true/" "${CUDOS_HOME}/config/app.toml"
    sed -i "/\[grpc\]/,/\[/ s/enable = false/enable = true/" "${CUDOS_HOME}/config/app.toml"
fi

rm ./init-local-node.sh
cudos-noded start --home ./cudos-data/
