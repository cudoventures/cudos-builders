# Build image for nodes

# Start root node

#Start sentry node

# Start orchestrator


# Start full node 01 

# Convert full node 01 to validator 01

# Start gravity bridge validator 01

# Start full node 02 
## Init
cd ./docker/full-node&& sudo docker-compose --env-file ./full-node.client.local02.arg -f ./init-full-node.yml -p cudos-init-full-node-client-local-02 up --build

## Config 

cd ./docker/full-node&& sudo docker-compose --env-file ./full-node.client.local02.arg -f ./config-full-node.yml -p cudos-config-full-node-client-local-02 up --build

## Start full node

cd ./docker/full-node&& sudo docker-compose --env-file ./full-node.client.local02.arg -f ./start-full-node.yml -p cudos-start-full-node-client-local-02 up --build


# Convert full node 02 to validator 02

docker exec -ti cudos-start-sentry-node-01 sh -c '
export STAKE="1acudos" && export CHAIN_ID="cosmos3" &&

cudos-noded keys add validator --recover --keyring-backend="os" &&

cudos-noded tx staking create-validator --amount=$STAKE \
    --from=validator \
    --pubkey=$(cudos-noded tendermint show-validator) \
    --moniker=$MONIKER \
    --chain-id=$CHAIN_ID \
    --commission-rate="0.10" \
    --commission-max-rate="0.20" \
    --commission-max-change-rate="0.01" \
    --min-self-delegation="1" \
    --gas="auto" \
    --gas-prices="0.025acudos" \
    --gas-adjustment="1.80" \
    --keyring-backend="os" \
    -y
'




