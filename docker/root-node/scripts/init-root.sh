if [[ -z "${CUDOS_HOME}" ]]; then
    CUDOS_HOME="./cudos-data"
fi

BOND_DENOM="acudos"

WORKING_PATH=$(pwd) && cd $CUDOS_HOME && rm -Rf ./* && cd $WORKING_PATH

cudos-noded init $MONIKER --chain-id=$CHAIN_ID

# gas price
sed -i "s/minimum-gas-prices = \"\"/minimum-gas-prices = \"5000000000000${BOND_DENOM}\"/" "${CUDOS_HOME}/config/app.toml"

# port 1317
sed -i "104s/enable = true/enable = false/" "${CUDOS_HOME}/config/app.toml"

# port 9090
sed -i "158s/enable = true/enable = false/" "${CUDOS_HOME}/config/app.toml"

# port 26657
sed -i "s/laddr = \"tcp:\/\/0.0.0.0:26657\"/laddr = \"tcp:\/\/127.0.0.1:26657\"/" "${CUDOS_HOME}/config/config.toml"
sed -i "s/cors_allowed_origins = .*/cors_allowed_origins = \[\]/" "${CUDOS_HOME}/config/config.toml"

# port 26660
if [ "${MONITORING_ENABLED}" = "true" ]; then
    sed -i "s/prometheus = .*/prometheus = true/g" "${CUDOS_HOME}/config/config.toml"
fi
if [ "${MONITORING_ENABLED}" = "false" ]; then
    sed -i "s/prometheus = .*/prometheus = false/g" "${CUDOS_HOME}/config/config.toml"
fi

sed -i "s/pex = true/pex = false/" "${CUDOS_HOME}/config/config.toml"

if [ "${ADDR_BOOK_STRICT}" = "false" ]; then
    sed -i "s/addr_book_strict = true/addr_book_strict = false/g" "${CUDOS_HOME}/config/config.toml"
fi

MY_OWN_PEER_ID=$(cudos-noded tendermint show-node-id)
sed -i "s/private_peer_ids = \"\"/private_peer_ids = \"$MY_OWN_PEER_ID\"/g" "${CUDOS_HOME}/config/config.toml"

# enable cors origin for local testing
# sed -i "s/enabled-unsafe-cors = false/enabled-unsafe-cors = true/" ${CUDOS_HOME}/config/app.toml
# sed -i "s/cors_allowed_origins = \[\]/cors_allowed_origins = \[\"\*\"\]/" ${CUDOS_HOME}/config/config.toml

# consensus params
genesisJson=$(jq ".consensus_params.evidence.max_age_num_blocks = \"531692\"" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"

# slashing params
genesisJson=$(jq ".app_state.slashing.params.signed_blocks_window = \"19200\"" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"
genesisJson=$(jq ".app_state.slashing.params.min_signed_per_window = \"0.1\"" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"
genesisJson=$(jq ".app_state.slashing.params.slash_fraction_downtime = \"0.0001\"" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"

# staking params
genesisJson=$(jq ".app_state.staking.params.bond_denom = \"$BOND_DENOM\"" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"

# crisis params
genesisJson=$(jq ".app_state.crisis.constant_fee.amount = \"100000000000000000000\"" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"
genesisJson=$(jq ".app_state.crisis.constant_fee.denom = \"$BOND_DENOM\"" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"

# government proposal params
genesisJson=$(jq ".app_state.gov.deposit_params.min_deposit[0].amount = \"50000000000000000000000\"" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"
genesisJson=$(jq ".app_state.gov.deposit_params.min_deposit[0].denom = \"$BOND_DENOM\"" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"
genesisJson=$(jq ".app_state.gov.deposit_params.max_deposit_period = \"1209600s\"" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"
genesisJson=$(jq ".app_state.gov.voting_params.voting_period = \"1209600s\"" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"

# bank params
genesisJson=$(jq ".app_state.bank.params.send_enabled = [
  {
    \"denom\": \"cudosAdmin\",
    \"enabled\": false
  }
]" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"

# distribution params
genesisJson=$(jq ".app_state.distribution.params.community_tax = \"0.2\"" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"

# fractions metadata
genesisJson=$(jq ".app_state.bank.denom_metadata[0].description = \"The native staking token of the Cudos Hub\"" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"
genesisJson=$(jq ".app_state.bank.denom_metadata[0].base = \"$BOND_DENOM\"" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"
genesisJson=$(jq ".app_state.bank.denom_metadata[0].name = \"cudos\"" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"
genesisJson=$(jq ".app_state.bank.denom_metadata[0].symbol = \"CUDOS\"" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"
genesisJson=$(jq ".app_state.bank.denom_metadata[0].display = \"cudos\"" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"

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

# gravity params
genesisJson=$(jq ".app_state.gravity.erc20_to_denoms[0] |= .+ {
  \"erc20\": \"$CUDOS_TOKEN_CONTRACT_ADDRESS\",
  \"denom\": \"acudos\"
}" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"
genesisJson=$(jq ".app_state.gravity.params.minimum_transfer_to_eth = \"300000000000000000000\"" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"
# genesisJson=$(jq ".app_state.gravity.params.minimum_fee_transfer_to_eth = \"333000000000000000000\"" "${CUDOS_HOME}/config/genesis.json")
# echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"

# create zero account
(echo $KEYRING_OS_PASS; echo $KEYRING_OS_PASS) | cudos-noded keys add zero-account --keyring-backend os |& tee "${CUDOS_HOME}/zero-account.wallet"
chmod 600 "${CUDOS_HOME}/zero-account.wallet"
ZERO_ACCOUNT_ADDRESS=$(echo $KEYRING_OS_PASS | cudos-noded keys show zero-account -a --keyring-backend os)
cudos-noded add-genesis-account $ZERO_ACCOUNT_ADDRESS "1${BOND_DENOM}"

for i in $(seq 1 $NUMBER_OF_VALIDATORS); do
    (echo $KEYRING_OS_PASS; echo $KEYRING_OS_PASS) | cudos-noded keys add "validator-$i" --keyring-backend os |& tee "${CUDOS_HOME}/validator-$i.wallet"
    chmod 600 "${CUDOS_HOME}/validator-$i.wallet"
    validatorAddress=$(echo $KEYRING_OS_PASS | cudos-noded keys show validator-$i -a --keyring-backend os)
    cudos-noded add-genesis-account $validatorAddress "${VALIDATOR_BALANCE}${BOND_DENOM},1cudosAdmin"
    cat "${CUDOS_HOME}/config/genesis.json" | jq --arg validatorAddress "$validatorAddress" '.app_state.gravity.static_val_cosmos_addrs += [$validatorAddress]' > "${CUDOS_HOME}/config/tmp_genesis.json" && mv "${CUDOS_HOME}/config/tmp_genesis.json" "${CUDOS_HOME}/config/genesis.json"
done

for i in $(seq 1 $NUMBER_OF_ORCHESTRATORS); do
    (echo $KEYRING_OS_PASS; echo $KEYRING_OS_PASS) | cudos-noded keys add "orch-$i" --keyring-backend os |& tee "${CUDOS_HOME}/orch-$i.wallet"
    chmod 600 "${CUDOS_HOME}/orch-$i.wallet"
    orchAddress=$(echo $KEYRING_OS_PASS | cudos-noded keys show orch-$i -a --keyring-backend os)    
    cudos-noded add-genesis-account $orchAddress "${ORCHESTRATOR_BALANCE}${BOND_DENOM}"
    if [ "$i" = "1" ]; then
        ORCH_01_ADDRESS="$orchAddress"
    fi
done

# add faucet account
if [ "$FAUCET_BALANCE" != "0" ]; then
    ((echo $KEYRING_OS_PASS; echo $KEYRING_OS_PASS) | cudos-noded keys add faucet --keyring-backend os) |& tee "${CUDOS_HOME}/faucet.wallet"
    chmod 600 "${CUDOS_HOME}/faucet.wallet"
    FAUCET_ADDRESS=$(echo $KEYRING_OS_PASS | cudos-noded keys show faucet -a --keyring-backend os)
    cudos-noded add-genesis-account $FAUCET_ADDRESS "${FAUCET_BALANCE}${BOND_DENOM}"
fi

# Setting gravity module account and funding it as per parameter
genesisJson=$(jq ".app_state.auth.accounts += [{
  \"@type\": \"/cosmos.auth.v1beta1.ModuleAccount\",
  \"base_account\": {
    \"account_number\": \"0\",
    \"address\": \"cudos16n3lc7cywa68mg50qhp847034w88pntq8823tx\",
    \"pub_key\": null,
    \"sequence\": \"0\"
  },
  \"name\": \"gravity\",
  \"permissions\": [
    \"minter\",
    \"burner\"
  ]
}]" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"

genesisJson=$(jq ".app_state.bank.balances += [{
  \"address\": \"cudos16n3lc7cywa68mg50qhp847034w88pntq8823tx\",
  \"coins\": [
    {
      \"amount\": \"$GRAVITY_MODULE_BALANCE\",
      \"denom\": \"acudos\"
    }
  ]
}]" "${CUDOS_HOME}/config/genesis.json")
echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"

(echo $KEYRING_OS_PASS; echo $KEYRING_OS_PASS) | cudos-noded gentx validator-1 "${VALIDATOR_BALANCE}${BOND_DENOM}" ${ORCH_ETH_ADDRESS} ${ORCH_01_ADDRESS} --chain-id $CHAIN_ID --keyring-backend os

cudos-noded collect-gentxs

cudos-noded tendermint show-node-id |& tee "${CUDOS_HOME}/tendermint.nodeid"

chmod 755 "${CUDOS_HOME}/config"
