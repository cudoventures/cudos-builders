VALID_TOKEN_CONTRACT_ADDRESS="true"
PARAM_UNBONDING_TIME="28800s"
PARAM_MAX_DEPOSIT_PERIOD="21600s"
PARAM_VOTING_PERIOD="21600s"

if [[ -z "${CUDOS_HOME}" ]]; then
    CUDOS_HOME="./cudos-data"
fi

KEYALGO="eth_secp256k1"
BOND_DENOM="acudos"

mkdir $CUDOS_HOME
WORKING_PATH=$(pwd) && cd $CUDOS_HOME && rm -Rf ./* && cd $WORKING_PATH

# validate dependencies are installed
command -v jq > /dev/null 2>&1 || { echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"; exit 1; }

ethermintd config keyring-backend os
ethermintd config chain-id $DEBUG_CHAIN_ID

echo $MONIKER
ethermintd init $MONIKER --chain-id=$DEBUG_CHAIN_ID --home $CUDOS_HOME

# Change parameter token denominations to acudos
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state[\"staking\"][\"params\"][\"bond_denom\"]=\"$BOND_DENOM\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state[\"crisis\"][\"constant_fee\"][\"denom\"]=\"${BOND_DENOM}\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state[\"gov\"][\"deposit_params\"][\"min_deposit\"][0][\"denom\"]=\"${BOND_DENOM}\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state[\"mint\"][\"params\"][\"mint_denom\"]=\"${BOND_DENOM}\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json

# consensus params
cat ${CUDOS_HOME}/config/genesis.json | jq ".consensus_params.evidence.max_age_num_blocks = \"531692\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat ${CUDOS_HOME}/config/genesis.json | jq ".consensus_params["block"]["max_gas"]="10000000"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat $HOME/.ethermintd/config/genesis.json | jq '.consensus_params["block"]["time_iota_ms"]="1000"' > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json

# slashing params
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.slashing.params.signed_blocks_window = \"19200\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.slashing.params.min_signed_per_window = \"0.1\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.slashing.params.slash_fraction_downtime = \"0.0001\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json

# staking params
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.staking.params.bond_denom = \"$BOND_DENOM\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.staking.params.unbonding_time = \"$PARAM_UNBONDING_TIME\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json

# crisis params
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.crisis.constant_fee.amount = \"5000000000000000000000\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.crisis.constant_fee.denom = \"$BOND_DENOM\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json

# government proposal params
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.gov.deposit_params.min_deposit[0].amount = \"50000000000000000000000\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.gov.deposit_params.min_deposit[0].denom = \"$BOND_DENOM\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.gov.deposit_params.max_deposit_period = \"$PARAM_MAX_DEPOSIT_PERIOD\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.gov.voting_params.voting_period = \"$PARAM_VOTING_PERIOD\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.gov.tally_params.quorum = \"0.5\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.gov.tally_params.threshold = \"0.5\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.gov.tally_params.veto_threshold = \"0.4\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json

# distribution params
cat ${CUDOS_HOME}/config/genesis.json | jq "app_state.distribution.params.community_tax = \"0.2\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json

# fractions metadata
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.bank.denom_metadata[0].description = \"The native staking token of the Cudos Hub\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.bank.denom_metadata[0].base = \"$BOND_DENOM\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.bank.denom_metadata[0].name = \"cudos\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.bank.denom_metadata[0].symbol = \"CUDOS\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json
cat ${CUDOS_HOME}/config/genesis.json | jq ".app_state.bank.denom_metadata[0].display = \"cudos\"" > ${CUDOS_HOME}/config/tmp_genesis.json && mv ${CUDOS_HOME}/config/tmp_genesis.json ${CUDOS_HOME}/config/genesis.json

genesisJson=$(jq ".app_state.bank.denom_metadata[0].denom_units = [
  {
    \"denom\": \"acudos\",
    \"exponent\": \"0\",
    \"aliases\": [ \"attocudos\" ]
  }, {
    \"denom\": \"fcudos\",
    \"exponent\": \"3\",
    \"aliases\": [ \"femtocudos\" ]
  }, {
    \"denom\": \"pcudos\",
    \"exponent\": \"6\",
    \"aliases\": [ \"picocudos\" ]
  }, {
    \"denom\": \"ncudos\",
    \"exponent\": \"9\",
    \"aliases\": [ \"nanocudos\" ]
  }, {
    \"denom\": \"ucudos\",
    \"exponent\": \"12\",
    \"aliases\": [ \"microcudos\" ]
  }, {
    \"denom\": \"mcudos\",
    \"exponent\": \"15\",
    \"aliases\": [ \"millicudos\" ]
  }, {
    \"denom\": \"cudos\",
    \"exponent\": \"18\"
  }
]" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"

sed -i 's/create_empty_blocks_interval = "0s"/create_empty_blocks_interval = "30s"/g' ${CUDOS_HOME}/config/config.toml
sed -i 's/timeout_propose = "3s"/timeout_propose = "30s"/g' ${CUDOS_HOME}/config/config.toml
sed -i 's/timeout_propose_delta = "500ms"/timeout_propose_delta = "5s"/g' ${CUDOS_HOME}/config/config.toml
sed -i 's/timeout_prevote = "1s"/timeout_prevote = "10s"/g' ${CUDOS_HOME}/config/config.toml
sed -i 's/timeout_prevote_delta = "500ms"/timeout_prevote_delta = "5s"/g' ${CUDOS_HOME}/config/config.toml
sed -i 's/timeout_precommit = "1s"/timeout_precommit = "10s"/g' ${CUDOS_HOME}/config/config.toml
sed -i 's/timeout_precommit_delta = "500ms"/timeout_precommit_delta = "5s"/g' ${CUDOS_HOME}/config/config.toml
sed -i 's/timeout_commit = "5s"/timeout_commit = "150s"/g' ${CUDOS_HOME}/config/config.toml
sed -i 's/timeout_broadcast_tx_commit = "10s"/timeout_broadcast_tx_commit = "150s"/g' ${CUDOS_HOME}/config/config.toml

# create zero account
(echo $KEYRING_OS_PASS; echo $KEYRING_OS_PASS) | ethermintd keys add zero-account --algo $KEYALGO --keyring-backend os --home ${CUDOS_HOME} |& tee "${CUDOS_HOME}/zero-account.wallet"
chmod 600 "${CUDOS_HOME}/zero-account.wallet"
ZERO_ACCOUNT_ADDRESS=$(echo $KEYRING_OS_PASS | ethermintd keys show zero-account -a --keyring-backend os --home ${CUDOS_HOME})

ethermintd add-genesis-account $ZERO_ACCOUNT_ADDRESS "1${BOND_DENOM}" --home ${CUDOS_HOME}


for i in $(seq 1 $NUMBER_OF_VALIDATORS); do
    if [ "$i" = "1" ] && [ "$ROOT_VALIDATOR_MNEMONIC" != "" ]; then
        (echo $ROOT_VALIDATOR_MNEMONIC; echo $KEYRING_OS_PASS) | ethermintd keys add "validator-$i" --recover --keyring-backend os --algo $KEYALGO --home ${CUDOS_HOME}
    else
        (echo $KEYRING_OS_PASS; echo $KEYRING_OS_PASS) | ethermintd keys add "validator-$i" --keyring-backend os --algo $KEYALGO --home ${CUDOS_HOME} |& tee "${CUDOS_HOME}/validator-$i.wallet"
    fi

    chmod 600 "${CUDOS_HOME}/validator-$i.wallet"

    validatorAddress=$(echo $KEYRING_OS_PASS | ethermintd keys show validator-${i} -a --keyring-backend os --home ${CUDOS_HOME})
    ethermintd add-genesis-account $validatorAddress "${VALIDATOR_BALANCE}${BOND_DENOM}" --home ${CUDOS_HOME}
done


# add faucet account
if [ "$FAUCET_BALANCE" != "" ] && [ "$FAUCET_BALANCE" != "0" ]; then
    ((echo $KEYRING_OS_PASS; echo $KEYRING_OS_PASS) | ethermintd keys add faucet --keyring-backend os --home ${CUDOS_HOME}) |& tee "${CUDOS_HOME}/faucet.wallet"
    chmod 600 "${CUDOS_HOME}/faucet.wallet"
    FAUCET_ADDRESS=$(echo $KEYRING_OS_PASS | ethermintd keys show faucet -a --keyring-backend os --home ${CUDOS_HOME})
    ethermintd add-genesis-account $FAUCET_ADDRESS "${FAUCET_BALANCE}${BOND_DENOM}" --home ${CUDOS_HOME}
fi


if [ "$OPEN_ALL_PORTS" = "true" ]; then
    # port 1317
    # enable
    sed -i "/\[api\]/,/\[/ s/enable = .*/enable = true/" "${CUDOS_HOME}/config/app.toml"
    sed -i "s/enabled-unsafe-cors = \".*\"/enabled-unsafe-cors = true/" "${CUDOS_HOME}/config/app.toml"

    # port 9090
    # enable
    sed -i "/\[grpc\]/,/\[/ s/enable = .*/enable = true/" "${CUDOS_HOME}/config/app.toml"

    # port 26657
    # enable
    sed -i "/\[rpc\]/,// s/laddr = \".*\"/laddr = \"tcp:\/\/0.0.0.0:26657\"/" "${CUDOS_HOME}/config/config.toml"
    sed -i "/\[rpc\]/,// s/cors_allowed_origins = .*/cors_allowed_origins = \[\"\*\"\]/" "${CUDOS_HOME}/config/config.toml"

    # port 26660
    sed -i "s/prometheus = \".*\"/prometheus = true/g" "${CUDOS_HOME}/config/config.toml"
fi;

if [ "$ZERO_GAS_PRICE" = "true" ]; then
    # gas price
    sed -i "s/minimum-gas-prices = \".*\"/minimum-gas-prices = \"0acudos\"/" "${CUDOS_HOME}/config/app.toml"
fi;

(echo $KEYRING_OS_PASS; echo $KEYRING_OS_PASS) | ethermintd gentx validator-1 "${VALIDATOR_BALANCE}${BOND_DENOM}" --min-self-delegation 2000000000000000000000000 --chain-id $DEBUG_CHAIN_ID --keyring-backend os --home ${CUDOS_HOME}

# Collect genesis tx
ethermintd collect-gentxs --home ${CUDOS_HOME}

# Run this to ensure everything worked and that the genesis file is setup correctly
ethermintd validate-genesis --home ${CUDOS_HOME}

ethermintd tendermint show-node-id --home ${CUDOS_HOME}|& tee "${CUDOS_HOME}/tendermint.nodeid"

chmod 755 "${CUDOS_HOME}/config"
