if [[ -z "${CUDOS_HOME}" ]]; then
    CUDOS_HOME="./cudos-data"
fi

if [ "$SHOULD_USE_GLOBAL_PEERS" = "true" ]; then
    PERSISTENT_PEERS=$(cat ./external-config/persistent-peers.config)
    SEEDS=$(cat ./external-config/seeds.config)
fi

WORKING_PATH=$(pwd) && cd $CUDOS_HOME && rm -Rf ./* && cd $WORKING_PATH
BOND_DENOM="acudos"

cudos-noded init $MONIKER

cp ./external-config/genesis.json "${CUDOS_HOME}/config/genesis.json"

# gas price
sed -i "s/minimum-gas-prices = \"\"/minimum-gas-prices = \"0${BOND_DENOM}\"/" "${CUDOS_HOME}/config/app.toml"

sed -i "s/persistent_peers = \".*\"/persistent_peers = \"$PERSISTENT_PEERS\"/g" "${CUDOS_HOME}/config/config.toml"

sed -i "s/seeds = \".*\"/seeds = \"$SEEDS\"/g" "${CUDOS_HOME}/config/config.toml"

if [ "$SHOULD_USE_STATE_SYNC" = "true" ]; then
    STATE_SYNC_JSON=$(curl -s http://34.123.153.6:26657/commit | jq "{height: .result.signed_header.header.height, hash: .result.signed_header.commit.block_id.hash}")
    STATE_SYNC_HEIGHT=$(echo $STATE_SYNC_JSON | jq ".height")
    STATE_SYNC_HASH=$(echo $STATE_SYNC_JSON | jq ".hash")
    sed -i "s/enable = false/enable = true/g" "${CUDOS_HOME}/config/config.toml"
    sed -i "s/rpc_servers = \".*\"/rpc_servers = \"35.224.105.243:26657,34.123.153.6:26657\"/g" "${CUDOS_HOME}/config/config.toml"
    sed -i "s/trust_height = 0/trust_height = $STATE_SYNC_HEIGHT/g" "${CUDOS_HOME}/config/config.toml"
    sed -i "s/trust_hash = \".*\"/trust_hash = $STATE_SYNC_HASH/g" "${CUDOS_HOME}/config/config.toml"
fi

cudos-noded tendermint show-node-id |& tee "${CUDOS_HOME}/tendermint.nodeid"