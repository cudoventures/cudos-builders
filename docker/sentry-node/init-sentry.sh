if [[ -z "${CUDOS_HOME}" ]]; then
    CUDOS_HOME="./cudos-data"
fi

rm -R ./cudos-data

cudos-noded init $MONIKER

cp ./external-config/genesis.json ./cudos-data/config/genesis.json

sed -i "s/persistent_peers = \"\"/persistent_peers = \"$PERSISTENT_PEERS\"/g" ./cudos-data/config/config.toml

sed -i "s/seeds = \"\"/seeds = \"$SEEDS\"/g" ./cudos-data/config/config.toml

sed -i "s/private_peer_ids = \"\"/private_peer_ids = \"$PRIVATE_PEERS\"/g" ./cudos-data/config/config.toml

cudos-noded tendermint show-node-id |& tee "${CUDOS_HOME}/sentry.nodeid"