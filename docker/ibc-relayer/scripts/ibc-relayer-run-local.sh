#!/bin/bash

CHAIN_ID_1=($(jq -r '."chain-id"' ../chains/local/chain_a_config.json))
CHAIN_ID_2=($(jq -r '."chain-id"' ../chains/local/chain_b_config.json))

rly config init

echo "Adding chain configs"
rly config add-chains ../chains/local

echo $SEED0
echo $SEED1

echo "Key $(rly keys restore cudos-local-network cudos-local-key "$SEED0") imported from cudos-local-network to relayer..."
echo "Key $(rly keys restore cudos-local-network-2 cudos-local-key-2 "$SEED1") imported from cudos-local-network-2 to relayer..."

echo "Balance of accounts chains"
rly q balance ${CHAIN_ID_1}
rly q balance ${CHAIN_ID_2}

echo "Generating paths"
rly config add-paths ../paths/local

echo "Create clients, connections and channels base on the definitions" 
rly tx link transfer-local -o 10s

echo "Starting relayer"
rly start transfer-local
