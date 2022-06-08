#!/bin/bash -i

tmpGenesisPath="/tmp/genesis.tmp.json"
rootGenesisPath="$1"
accountDataGenesisPath="/tmp/genesis.accounts.json"
delegatorsDataGenesisPath="/tmp/genesis.delegators.json"
predefinedBalancesDataGenesisPath="/tmp/genesis.balances.json"
adminDataGenesisPath="/tmp/genesis.admin.json"

# copy to result genesis location
cp "$rootGenesisPath" "$RESULT_GENESIS_PATH"

source "$WORKING_SRC_DIR/modules/merge-root-genesis.sh"

source "$WORKING_SRC_DIR/modules/merge-client-genesises.sh"

# staking.last_total_power
jq "[.app_state.staking.last_validator_powers[].power]" "$RESULT_GENESIS_PATH" > "$tmpGenesisPath"
lastTotalPower=$(sum $tmpGenesisPath)
result=$(jq ".app_state.staking.last_total_power = \"$lastTotalPower\"" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

#
result=$(jq '.app_state.distribution.validator_current_rewards[].rewards.rewards = []' "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

#
result=$(jq '.app_state.distribution.validator_accumulated_commissions[].accumulated.commission = []' "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

# pre-defined balances
result=$(jq ".balances" "$STAKING_JSON")
echo $result > "$predefinedBalancesDataGenesisPath"
predefinedBalancesSize=$(jq length "$predefinedBalancesDataGenesisPath")
for i in $(seq 0 $(($predefinedBalancesSize-1))); do
    predefinedAddress=$(jq ".[$i].address" "$predefinedBalancesDataGenesisPath")
    predefinedAddress=${predefinedAddress//\"/}
    predefinedBalance=$(jq ".[$i].balance" "$predefinedBalancesDataGenesisPath")
    predefinedBalance=${predefinedBalance//\"/}

    currentBalance=$(getAccountBalanceInAcudos "$RESULT_GENESIS_PATH" "$predefinedAddress")
    echo "[\"$currentBalance\", \"$predefinedBalance\"]" > "$tmpGenesisPath"
    totalBalance=$(sum $tmpGenesisPath)
    setAccountBalanceInAcudos "$RESULT_GENESIS_PATH" "$predefinedAddress" "$totalBalance"
done

# accounts with cudoAdmin
result=$(jq ".admins" "$STAKING_JSON")
echo $result > "$adminDataGenesisPath"
adminsSize=$(jq length "$adminDataGenesisPath")
for i in $(seq 0 $(($adminsSize-1))); do
    adminAddress=$(jq ".[$i].address" "$adminDataGenesisPath")
    adminAddress=${adminAddress//\"/}
    adminBalance=$(jq ".[$i].balance" "$adminDataGenesisPath")
    adminBalance=${adminBalance//\"/}

    setAccountBalanceInCudosAdmin "$RESULT_GENESIS_PATH" "$adminAddress" "$adminBalance"
done

result=$(jq ".initial_height = \"1\"" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

result=$(jq ".app_state.cudoMint.minter.norm_time_passed = \"0.53172694105988\"" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

result=$(jq '.app_state.distribution.fee_pool.community_pool = []' "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

result=$(jq '.app_state.distribution.outstanding_rewards = []' "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

if [ "$PARAM_STATIC_VAL_COSMOS_ADDRS" != "" ]; then
    result=$(jq ".app_state.gravity.static_val_cosmos_addrs = (.app_state.gravity.static_val_cosmos_addrs | join(\",\") + \",$PARAM_STATIC_VAL_COSMOS_ADDRS\" | split(\",\"))" "$RESULT_GENESIS_PATH")
    echo $result > "$RESULT_GENESIS_PATH"
fi

result=$(jq ".app_state.auth.accounts = [.app_state.auth.accounts[] | if (.\"@type\" == \"/cosmos.auth.v1beta1.ModuleAccount\") then (.base_account.account_number = \"0\") else . end]" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"
result=$(jq ".app_state.auth.accounts = [.app_state.auth.accounts[] | if (.\"@type\" == \"/cosmos.auth.v1beta1.ModuleAccount\") then (.base_account.sequence = \"0\") else . end]" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"
result=$(jq ".app_state.auth.accounts = [.app_state.auth.accounts[] | if (.\"@type\" == \"/cosmos.auth.v1beta1.ModuleAccount\") then (.base_account.pub_key = null) else . end]" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

result=$(jq ".app_state.auth.accounts = [.app_state.auth.accounts[] | if (.\"@type\" == \"/cosmos.auth.v1beta1.BaseAccount\") then (.account_number = \"0\") else . end]" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"
# result=$(jq ".app_state.auth.accounts = [.app_state.auth.accounts[] | if (.\"@type\" == \"/cosmos.auth.v1beta1.BaseAccount\") then (.sequence = \"0\") else . end]" "$RESULT_GENESIS_PATH")
# echo $result > "$RESULT_GENESIS_PATH"
result=$(jq ".app_state.auth.accounts = [.app_state.auth.accounts[] | if (.\"@type\" == \"/cosmos.auth.v1beta1.BaseAccount\") then (.pub_key = null) else . end]" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

# reset fee collector amount
feeCollectorAddress=$(getModuleAddress "$RESULT_GENESIS_PATH" "fee_collector")
result=$(jq ".app_state.bank.balances = [.app_state.bank.balances[] | if (.address == \"$feeCollectorAddress\") then (.coins[0].amount = \"0\") else . end]" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

# calculate bonded tokens pool
jq ".app_state.staking.validators | map(.tokens)" "$RESULT_GENESIS_PATH" > "$tmpGenesisPath"
bondedTokens=$(sum $tmpGenesisPath)
bondedTokensPoolAddress=$(getModuleAddress "$RESULT_GENESIS_PATH" "bonded_tokens_pool")
result=$(jq ".app_state.bank.balances = [.app_state.bank.balances[] | if (.address == \"$bondedTokensPoolAddress\") then (.coins[0].amount = \"$bondedTokens\") else . end]" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

# remove distribution module balance
distributionAddress=$(getModuleAddress "$RESULT_GENESIS_PATH" "distribution")
result=$(jq ".app_state.bank.balances = [.app_state.bank.balances[] | if (.address == \"$distributionAddress\") then (.coins[0].amount = \"0\") else . end]" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

# calculate total supply so far
jq ".app_state.bank.balances | map(.coins) | flatten | map(select(.denom == \"acudos\") | .amount)" "$RESULT_GENESIS_PATH" > "$tmpGenesisPath"
totalSupply=$(sum $tmpGenesisPath)

# gravity module balance
gravityAddress=$(getModuleAddress "$RESULT_GENESIS_PATH" "gravity")
initialGravityBalance=$(getAccountBalanceInAcudos "$RESULT_GENESIS_PATH" "$gravityAddress")
gravityTotalSupply=$(calculateGravityModuleBalance $totalSupply $initialGravityBalance)
setAccountBalanceInAcudosWithoutAuthAccount "$RESULT_GENESIS_PATH" "$gravityAddress" "$gravityTotalSupply"
echo $result > "$RESULT_GENESIS_PATH"

# bank.supply
jq ".app_state.bank.balances | map(.coins) | flatten | map(select(.denom == \"acudos\") | .amount)" "$RESULT_GENESIS_PATH" > "$tmpGenesisPath"
totalSupply=$(sum $tmpGenesisPath)
result=$(jq ".app_state.bank.supply = [{
    \"amount\": \"$totalSupply\",
    \"denom\": \"acudos\"
}]" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

jq ".app_state.bank.balances | map(.coins) | flatten | map(select(.denom == \"cudosAdmin\") | .amount)" "$RESULT_GENESIS_PATH" > "$tmpGenesisPath"
totalSupply=$(sum $tmpGenesisPath)
if [ "$totalSupply" != "0" ]; then
    result=$(jq ".app_state.bank.supply += [{
        \"amount\": \"$totalSupply\",
        \"denom\": \"cudosAdmin\"
    }]" "$RESULT_GENESIS_PATH")
    echo $result > "$RESULT_GENESIS_PATH"
fi

rm -f "$tmpGenesisPath"
rm -f "$accountDataGenesisPath"
rm -f "$delegatorsDataGenesisPath"
rm -f "$predefinedBalancesDataGenesisPath"
rm -f "$adminDataGenesisPath"
