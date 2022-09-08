#!/bin/bash
HERMES_HOME="/root/.hermes"
CONFIG_FILE="${HERMES_HOME}/config.toml"


echo "Setting up config.toml"
cp "/usr/hermes/config.toml" "${CONFIG_FILE}"

# relayer REST settings
sed -zi "s/\nenabled = [^\n]*\n/\nenabled = ${REST_ENABLED}\n/1" "${CONFIG_FILE}"
sed -zi "s/\nhost = '[^']*'/\nhost = '${REST_HOST}'/1" "${CONFIG_FILE}"
sed -zi "s/\nport = [^\n]*\n/\nport = ${REST_PORT}\n/1" "${CONFIG_FILE}"

# relayer TELEMETRY settings
sed -zi "s/\nenabled = [^\n]*\n/\nenabled = ${TELEMETRY_ENABLED}\n/2" "${CONFIG_FILE}"
sed -zi "s/\nhost = '[^']*'/\nhost = '${TELEMETRY_HOST}'/2" "${CONFIG_FILE}"
sed -zi "s/\nport = [^\n]*\n/\nport = ${TELEMETRY_PORT}\n/2" "${CONFIG_FILE}"

# chain 1 settings
sed -zi "s/\nid = '[^']*'/\nid = '${CHAIN_ID_0}'/1" "${CONFIG_FILE}"
sed -zi "s/\nrpc_addr = '[^']*'/\nrpc_addr = '${RPC_ADDR_0}'/1" "${CONFIG_FILE}"
sed -zi "s/\ngrpc_addr = '[^']*'/\ngrpc_addr = '${GRPC_ADDR_0}'/1" "${CONFIG_FILE}"
sed -zi "s/\nwebsocket_addr = '[^']*'/\nwebsocket_addr = '${WEBSOCKET_ADDR_0}'/1" "${CONFIG_FILE}"
sed -zi "s/\naccount_prefix = '[^']*'/\naccount_prefix = '${ACCOUNT_PREFIX_0}'/1" "${CONFIG_FILE}"
sed -zi "s/\nkey_name = '[^']*'/\nkey_name = '${CHAIN_ID_0}_key'/1" "${CONFIG_FILE}"
sed -zi "s/{ price = [^,]*/{ price = ${GAS_PRICE_0}/1" "${CONFIG_FILE}"
sed -zi "s/denom = '[^']*'/denom = '${GAS_DENOM_0}'/1" "${CONFIG_FILE}"
sed -zi "s/trusting_period = '[^']*'/trusting_period = '${TRUSTING_PERIOD_0}'/1" "${CONFIG_FILE}"

# chain 2 settings
sed -zi "s/\nid = '[^']*'/\nid = '${CHAIN_ID_1}'/2" "${CONFIG_FILE}"
sed -zi "s/\nrpc_addr = '[^']*'/\nrpc_addr = '${RPC_ADDR_1}'/2" "${CONFIG_FILE}"
sed -zi "s/\ngrpc_addr = '[^']*'/\ngrpc_addr = '${GRPC_ADDR_1}'/2" "${CONFIG_FILE}"
sed -zi "s/\nwebsocket_addr = '[^']*'/\nwebsocket_addr = '${WEBSOCKET_ADDR_1}'/2" "${CONFIG_FILE}"
sed -zi "s/\naccount_prefix = '[^']*'/\naccount_prefix = '${ACCOUNT_PREFIX_1}'/2" "${CONFIG_FILE}"
sed -zi "s/\nkey_name = '[^']*'/\nkey_name = '${CHAIN_ID_1}_key'/2" "${CONFIG_FILE}"
sed -zi "s/{ price = [^,]*/{ price = ${GAS_PRICE_1}/2" "${CONFIG_FILE}"
sed -zi "s/denom = '[^']*'/denom = '${GAS_DENOM_1}'/2" "${CONFIG_FILE}"
sed -zi "s/trusting_period = '[^']*'/trusting_period = '${TRUSTING_PERIOD_1}'/2" "${CONFIG_FILE}"

MNEMONIC_FILE_0="${HERMES_HOME}/mnemonic_0"
MNEMONIC_FILE_1="${HERMES_HOME}/mnemonic_1"

echo "${MNEMONIC_0}" > "${MNEMONIC_FILE_0}"
echo "${MNEMONIC_1}" > "${MNEMONIC_FILE_1}"

echo "Setting up wallets for each chain"
hermes keys add --key-name "${CHAIN_ID_0}_key" --chain "${CHAIN_ID_0}" --mnemonic-file "${MNEMONIC_FILE_0}" --overwrite
hermes keys add --key-name "${CHAIN_ID_1}_key" --chain "${CHAIN_ID_1}" --mnemonic-file "${MNEMONIC_FILE_1}" --overwrite

rm ${MNEMONIC_FILE_0}
rm ${MNEMONIC_FILE_1}

#init
if [ "$CREATE_CHANNEL" = true ] ; then
    echo "Creating channel"
    hermes create connection --a-chain ${CHAIN_ID_0} --b-chain ${CHAIN_ID_1} | tee "${HERMES_HOME}/create-channel-data.txt"
    ERR=$(cat ${HERMES_HOME}/create-channel-data.txt | grep "error")

    if [ "$ERR" == "" ]; then 
        CONNECTION_ID_A=$(cat ${HERMES_HOME}/create-channel-data.txt | grep "SUCCESS Connection" -A 100 | grep \"connection -m 1) 

        CONNECTION_ID_A=${CONNECTION_ID_A//\"/}
        CONNECTION_ID_A=${CONNECTION_ID_A//\,/}

        hermes create channel --a-port transfer --b-port transfer --a-chain ${CHAIN_ID_0} --a-connection ${CONNECTION_ID_A} | tee -a ${HERMES_HOME}/create-channel-data.txt 
    fi
fi
