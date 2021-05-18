if [[ -z "${CUDOS_HOME}" ]]; then
    CUDOS_HOME="./cudos-data"
fi

rm -R ./cudos-data

cudos-noded init $MONIKER

cp ./external-config/genesis.json ./cudos-data/config/genesis.json

# for port 1317
sed -i "104s/enable = false/enable = true/" "${CUDOS_HOME}/config/app.toml"

# for port 1317
sed -i "s/enabled-unsafe-cors = false/enabled-unsafe-cors = true/" "${CUDOS_HOME}/config/app.toml"

# for port 26657
sed -i "s/cors_allowed_origins = \[\]/cors_allowed_origins = \[\"\*\"\]/" "${CUDOS_HOME}/config/config.toml"

# for port 26657
sed -i "s/laddr = \"tcp:\/\/127.0.0.1:26657\"/laddr = \"tcp:\/\/0.0.0.0:26657\"/" "${CUDOS_HOME}/config/config.toml"

sed -i "s/persistent_peers = \"\"/persistent_peers = \"$PERSISTENT_PEERS\"/g" "${CUDOS_HOME}/config/config.toml"

sed -i "s/seeds = \"\"/seeds = \"$SEEDS\"/g" "${CUDOS_HOME}/config/config.toml"

sed -i "s/private_peer_ids = \"\"/private_peer_ids = \"$PRIVATE_PEERS\"/g" "${CUDOS_HOME}/config/config.toml"

cudos-noded tendermint show-node-id |& tee "${CUDOS_HOME}/sentry.nodeid"