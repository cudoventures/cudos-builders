if [[ -z "${CUDOS_HOME}" ]]; then
    CUDOS_HOME="./cudos-data"
fi

# port 26657
sed -i "s/laddr = \"tcp:\/\/0.0.0.0:26657\"/laddr = \"tcp:\/\/127.0.0.1:26657\"/" "${CUDOS_HOME}/config/config.toml"
sed -i "s/cors_allowed_origins = .*/cors_allowed_origins = \[\]/" "${CUDOS_HOME}/config/config.toml"

sed -i "s/persistent_peers = \".*\"/persistent_peers = \"$PERSISTENT_PEERS\"/g" "${CUDOS_HOME}/config/config.toml"

MY_OWN_PEER_ID=$(cudos-noded tendermint show-node-id)
sed -i "s/private_peer_ids = \".*\"/private_peer_ids = \"$MY_OWN_PEER_ID\"/g" "${CUDOS_HOME}/config/config.toml"

sed -i "s/seeds = \".*\"/seeds = \"$SEEDS\"/g" "${CUDOS_HOME}/config/config.toml"

sed -i "s/pex = true/pex = false/" "${CUDOS_HOME}/config/config.toml"