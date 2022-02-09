function getModuleAddress {
    result=$(jq .app_state.auth.accounts "$1" | jq "map(select(.name == \"$2\") | .base_account.address)" | jq ".[0]")
    echo ${result//\"/}
}

function sum {
    cat "$1" | python3 -c "import json, sys; print(sum(map(lambda x: int(x), json.load(sys.stdin))))"
}

tmpGenesisPath="/tmp/genesis.tmp.json"
# tmpGenesisPath="$WORKING_DIR/config/genesis.tmp.json"
rootGenesisPath="$1"
# dataGenesisPath="$WORKING_DIR/config/genesis.gentxs.json"
RESULT_GENESIS_PATH="$WORKING_EXPORT_DIR/genesis.json"

# copy to result genesis location
cp "$rootGenesisPath" "$RESULT_GENESIS_PATH"

# if there are no any genesises then there is nothing to merge
if [ ! -d "$WORKING_DATA_GENESIS_DIR" ]; then
    return
fi

# process client genesises
cd "$WORKING_DATA_GENESIS_DIR"
for dataGenesisPath in ./*; do
    [ -e $dataGenesisPath ] || continue
    jq .app_state.auth.accounts "$dataGenesisPath" | jq "map(select(.\"@type\" == \"/cosmos.auth.v1beta1.BaseAccount\") | .)" > "$tmpGenesisPath"
    validatorsSize=$(jq length "$tmpGenesisPath")
    if [ "$validatorsSize" != "1" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There are several accounts in $WORKING_DATA_GENESIS_DIR/$dataGenesisPath";
        exit 1;
    fi
    validatorAddress=$(jq .[0].address "$tmpGenesisPath")
    validatorAddress=${validatorAddress//\"/}

    # auth.accounts
    result=$(jq -s '.[0].app_state.auth.accounts = .[0].app_state.auth.accounts + .[1]' "$RESULT_GENESIS_PATH" "$tmpGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"

    # bank.balances
    jq .app_state.bank.balances "$dataGenesisPath" | jq "map(select(.address == \"$validatorAddress\") | .)" > "$tmpGenesisPath"
    balancesSize=$(jq length "$tmpGenesisPath")
    if [ "$balancesSize" != "0" ]; then
        result=$(jq -s '.[0].app_state.bank.balances = .[0].app_state.bank.balances + .[1]' "$RESULT_GENESIS_PATH" "$tmpGenesisPath" | jq '.[0]')
        echo $result > "$RESULT_GENESIS_PATH"
    fi

    # staking.delegations
    result=$(jq -s '.[0].app_state.staking.delegations = .[0].app_state.staking.delegations + .[1].app_state.staking.delegations' "$RESULT_GENESIS_PATH" "$dataGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"

    # staking.last_total_power
    jq -s '. = [.[0].app_state.staking.last_total_power] + [.[1].app_state.staking.last_total_power]' "$RESULT_GENESIS_PATH" "$dataGenesisPath" > "$tmpGenesisPath"
    lastTotalPower=$(sum $tmpGenesisPath)
    result=$(jq ".app_state.staking.last_total_power = \"$lastTotalPower\"" "$RESULT_GENESIS_PATH")
    echo $result > "$RESULT_GENESIS_PATH"

    # staking.last_validator_powers
    result=$(jq -s '.[0].app_state.staking.last_validator_powers = .[0].app_state.staking.last_validator_powers + .[1].app_state.staking.last_validator_powers' "$RESULT_GENESIS_PATH" "$dataGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"

    # staking.validators
    result=$(jq -s '.[0].app_state.staking.validators = .[0].app_state.staking.validators + .[1].app_state.staking.validators' "$RESULT_GENESIS_PATH" "$dataGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"

    # validators
    result=$(jq -s '.[0].validators = .[0].validators + .[1].validators' "$RESULT_GENESIS_PATH" "$dataGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"

    # distribution.delegator_starting_infos
    result=$(jq -s '.[0].app_state.distribution.delegator_starting_infos = .[0].app_state.distribution.delegator_starting_infos + .[1].app_state.distribution.delegator_starting_infos' "$RESULT_GENESIS_PATH" "$dataGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"

    # distribution.validator_current_rewards
    result=$(jq -s '.[0].app_state.distribution.validator_current_rewards = .[0].app_state.distribution.validator_current_rewards + .[1].app_state.distribution.validator_current_rewards' "$RESULT_GENESIS_PATH" "$dataGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"

    result=$(jq '.app_state.distribution.validator_current_rewards[].rewards.rewards = []' "$RESULT_GENESIS_PATH")
    echo $result > "$RESULT_GENESIS_PATH"

    # distribution.validator_historical_rewards
    result=$(jq -s '.[0].app_state.distribution.validator_historical_rewards = .[0].app_state.distribution.validator_historical_rewards + .[1].app_state.distribution.validator_historical_rewards' "$RESULT_GENESIS_PATH" "$dataGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"

    # distribution.validator_accumulated_commissions
    result=$(jq -s '.[0].app_state.distribution.validator_accumulated_commissions = .[0].app_state.distribution.validator_accumulated_commissions + .[1].app_state.distribution.validator_accumulated_commissions' "$RESULT_GENESIS_PATH" "$dataGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"

    result=$(jq '.app_state.distribution.validator_accumulated_commissions[].accumulated.commission = []' "$RESULT_GENESIS_PATH")
    echo $result > "$RESULT_GENESIS_PATH"

    # slashing.signing_infos
    result=$(jq -s '.[0].app_state.slashing.signing_infos = .[0].app_state.slashing.signing_infos + .[1].app_state.slashing.signing_infos' "$RESULT_GENESIS_PATH" "$dataGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"
done

result=$(jq ".initial_height = \"1\"" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

result=$(jq ".app_state.cudoMint.minter.norm_time_passed = \"0.000\"" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

result=$(jq '.app_state.distribution.fee_pool.community_pool = []' "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

result=$(jq '.app_state.distribution.outstanding_rewards = []' "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

if [ "$PARAM_STATIC_VAL_COSMOS_ADDRS" != "" ]; then
    result=$(jq ".app_state.gravity.static_val_cosmos_addrs = [.app_state.gravity.static_val_cosmos_addrs | join(\",\") + \",$PARAM_STATIC_VAL_COSMOS_ADDRS\"]" "$RESULT_GENESIS_PATH")
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
result=$(jq ".app_state.auth.accounts = [.app_state.auth.accounts[] | if (.\"@type\" == \"/cosmos.auth.v1beta1.BaseAccount\") then (.sequence = \"0\") else . end]" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"
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

# bank.supply
jq ".app_state.bank.balances | map(.coins) | flatten | map(select(.denom == \"acudos\") | .amount)" "$RESULT_GENESIS_PATH" > "$tmpGenesisPath"
totalSupply=$(sum $tmpGenesisPath)
result=$(jq ".app_state.bank.supply[0].amount = \"$totalSupply\"" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

# rm -f "$tmpGenesisPath"
