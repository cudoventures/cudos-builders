#!/bin/bash

echo "Setting up config.toml"
cp /usr/hermes/config.toml /root/.hermes/config.toml

# relayer REST settings
sed -zi "s/\nenabled = [^\n]*\n/\nenabled = ${REST_ENABLED}\n/1" "/root/.hermes/config.toml"
sed -zi "s/\nhost = '[^']*'/\nhost = '${REST_HOST}'/1" "/root/.hermes/config.toml"
sed -zi "s/\nport = [^\n]*\n/\nport = ${REST_PORT}\n/1" "/root/.hermes/config.toml"

# relayer TELEMETRY settings
sed -zi "s/\nenabled = [^\n]*\n/\nenabled = ${TELEMETRY_ENABLED}\n/2" "/root/.hermes/config.toml"
sed -zi "s/\nhost = '[^']*'/\nhost = '${TELEMETRY_HOST}'/2" "/root/.hermes/config.toml"
sed -zi "s/\nport = [^\n]*\n/\nport = ${TELEMETRY_PORT}\n/2" "/root/.hermes/config.toml"

# chain 1 settings
sed -zi "s/\nid = '[^']*'/\nid = '${CHAIN_ID_0}'/1" "/root/.hermes/config.toml"
sed -zi "s/\nrpc_addr = '[^']*'/\nrpc_addr = '${RPC_ADDR_0}'/1" "/root/.hermes/config.toml"
sed -zi "s/\ngrpc_addr = '[^']*'/\ngrpc_addr = '${GRPC_ADDR_0}'/1" "/root/.hermes/config.toml"
sed -zi "s/\nwebsocket_addr = '[^']*'/\nwebsocket_addr = '${WEBSOCKET_ADDR_0}'/1" "/root/.hermes/config.toml"
sed -zi "s/\naccount_prefix = '[^']*'/\naccount_prefix = '${ACCOUNT_PREFIX_0}'/1" "/root/.hermes/config.toml"
sed -zi "s/\nkey_name = '[^']*'/\nkey_name = '${CHAIN_ID_0}_key'/1" "/root/.hermes/config.toml"
sed -zi "s/{ price = [^,]*/{ price = ${GAS_PRICE_0}/1" "/root/.hermes/config.toml"
sed -zi "s/denom = '[^']*'/denom = '${GAS_DENOM_0}'/1" "/root/.hermes/config.toml"

# chain 2 settings
sed -zi "s/\nid = '[^']*'/\nid = '${CHAIN_ID_1}'/2" "/root/.hermes/config.toml"
sed -zi "s/\nrpc_addr = '[^']*'/\nrpc_addr = '${RPC_ADDR_1}'/2" "/root/.hermes/config.toml"
sed -zi "s/\ngrpc_addr = '[^']*'/\ngrpc_addr = '${GRPC_ADDR_1}'/2" "/root/.hermes/config.toml"
sed -zi "s/\nwebsocket_addr = '[^']*'/\nwebsocket_addr = '${WEBSOCKET_ADDR_1}'/2" "/root/.hermes/config.toml"
sed -zi "s/\naccount_prefix = '[^']*'/\naccount_prefix = '${ACCOUNT_PREFIX_1}'/2" "/root/.hermes/config.toml"
sed -zi "s/\nkey_name = '[^']*'/\nkey_name = '${CHAIN_ID_1}_key'/2" "/root/.hermes/config.toml"
sed -zi "s/{ price = [^,]*/{ price = ${GAS_PRICE_1}/2" "/root/.hermes/config.toml"
sed -zi "s/denom = '[^']*'/denom = '${GAS_DENOM_1}'/2" "/root/.hermes/config.toml"


echo "Setting up wallets for each chain"
hermes keys restore ${CHAIN_ID_0} -m "${SEED_0}"
hermes keys restore ${CHAIN_ID_1} -m "${SEED_1}"

#init
if [ "$CREATE_CHANNEL" = true ] ; then
    echo "Creating channel"
    hermes create channel ${CHAIN_ID_0} ${CHAIN_ID_1} --port-a transfer --port-b transfer &> /root/.hermes/create-channel-data.txt
fi