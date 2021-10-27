CHAIN_ID_1=($(jq -r '."chain-id"' chain_a_config.json))
CHAIN_ID_2=($(jq -r '."chain-id"' chain_b_config.json))

rly config init

echo "Adding chain configs"
rly chains add -f chain_a_config.json
rly chains add -f chain_b_config.json

echo "Generating chain keys"
rly keys add ${CHAIN_ID_1} relayer-chain-1 |& tee "${CUDOS_HOME}/relayer-chain-1.wallet"
rly keys add ${CHAIN_ID_2} relayer-chain-2 |& tee "${CUDOS_HOME}/relayer-chain-2.wallet"

echo "Adding chain keys to config"
rly chains edit ${CHAIN_ID_1} key relayer-chain-1
rly chains edit ${CHAIN_ID_2} key relayer-chain-2

echo "Initializing chains"
rly light init ${CHAIN_ID_1} -f
rly light init ${CHAIN_ID_2} -f

echo "Generating paths"
rly paths generate ${CHAIN_ID_1} ${CHAIN_ID_2} transfer --port=transfer
rly paths show transfer --yaml |& tee "${CUDOS_HOME}/transfer.json"


echo "Starting relayer"
rly start transfer
