function getModuleAddress {
    result=$(jq .app_state.auth.accounts "$1" | jq "map(select(.name == \"$2\") | .base_account.address)" | jq ".[0]")
    echo ${result//\"/}
}

function sum {
    cat "$1" | python3 -c "import json, sys; print(sum(map(lambda x: int(x), json.load(sys.stdin))))"
}

tmpGenesisPath="/tmp/genesis.tmp.json"
rootGenesisPath="$1"
accountDataGenesisPath="/tmp/genesis.filtered.json"
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

    # validator address
    jq .app_state.auth.accounts "$dataGenesisPath" | jq "map(select(.\"@type\" == \"/cosmos.auth.v1beta1.BaseAccount\") | .)" > "$accountDataGenesisPath"
    validatorsSize=$(jq length "$accountDataGenesisPath")
    if [ "$validatorsSize" != "1" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There are several accounts in $WORKING_DATA_GENESIS_DIR/$dataGenesisPath";
        exit 1;
    fi
    result=$(jq ".[0].sequence = \"1\"" "$accountDataGenesisPath")
    validatorAddress=$(jq .[0].address "$accountDataGenesisPath")
    validatorAddress=${validatorAddress//\"/}

    # STAKING - validator operator address
    jq ".app_state.staking.delegations | map(select(.delegator_address == \"$validatorAddress\") | .validator_address)" $dataGenesisPath > "$tmpGenesisPath"
    validatorsSize=$(jq length "$tmpGenesisPath")
    if [ "$validatorsSize" != "1" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} More than a single delegation in $WORKING_DATA_GENESIS_DIR/$dataGenesisPath";
        exit 1;
    fi
    validatorOperAddress=$(jq ".[0]" "$tmpGenesisPath")
    validatorOperAddress=${validatorOperAddress//\"/}

    # STAKING - validator hash address
    jq "[.validators[].address]" $dataGenesisPath > "$tmpGenesisPath"
    validatorsSize=$(jq length "$tmpGenesisPath")
    if [ "$validatorsSize" != "1" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} More than a single validator in $WORKING_DATA_GENESIS_DIR/$dataGenesisPath";
        exit 1;
    fi
    validatorHashAddress=$(jq ".[0]" "$tmpGenesisPath")
    validatorHashAddress=${validatorHashAddress//\"/}

    # STAKING - validator staking balance, delegations
    jq "map(select(.address == \"$validatorAddress\") | .)" "$STAKING_JSON" > "$tmpGenesisPath"
    stakingSize=$(jq length "$tmpGenesisPath")
    if [ "$stakingSize" = "0" ]; then
        echo "[]" | jq ". += [{id: \"0x0\", tokens: \"500000000000000000000000000\", address: \"$validatorAddress\"}]" > "$tmpGenesisPath"
        stakingSize="1"
        # continue;
    fi
    if [ "$stakingSize" != "1" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There are several staked accounts with identical address: $validatorAddress";
        exit 1;
    fi
    result=$(jq ".[0]" "$tmpGenesisPath")
    echo $result > "$tmpGenesisPath"
    validatorStakingBalance=$(jq "." "$tmpGenesisPath" | jq .tokens)
    validatorStakingBalance=${validatorStakingBalance//\"/}

    result=$(jq ".delegation" "$tmpGenesisPath")
    if [ "$result" != "null" ]; then
        historicalRefCount=$(jq .delegation "$tmpGenesisPath" | jq length)
        historicalRefCount=$(($historicalRefCount + 2))
        stakingDelegations=$(jq ".delegation | map({delegator_address: .delegatorAddress, shares: (.delegation + \".000000000000000000\"), validator_address: \"$validatorOperAddress\"})" "$tmpGenesisPath")
        authAccounts=$(jq ".delegation | map({\"@type\": \"/cosmos.auth.v1beta1.BaseAccount\", account_number: \"0\", address: .delegatorAddress, pub_key: null, sequence: \"1\"})" "$tmpGenesisPath")
        distributionDelegatorStartingInfos=$(jq ".delegation | map({delegator_address: .delegatorAddress, starting_info: {height: \"0\", previous_period: \"1\", stake: (.delegation + \".000000000000000000\")}, validator_address: \"$validatorOperAddress\"})" "$tmpGenesisPath")
    else
        historicalRefCount="2"
        stakingDelegations=""
        authAccounts=""
        distributionDelegatorStartingInfos=""
    fi

    # auth.accounts
    result=$(jq -s '.[0].app_state.auth.accounts = .[0].app_state.auth.accounts + .[1]' "$RESULT_GENESIS_PATH" "$accountDataGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"

    # STAKING - append to auth.accounts
    if [ "$authAccounts" != "" ]; then
        echo $authAccounts > "$tmpGenesisPath"
        result=$(jq -s '.[0].app_state.auth.accounts = .[0].app_state.auth.accounts + .[1]' "$RESULT_GENESIS_PATH" "$tmpGenesisPath" | jq '.[0]')
        echo $result > "$RESULT_GENESIS_PATH"
    fi

    # bank.balances
    jq .app_state.bank.balances "$dataGenesisPath" | jq "map(select(.address == \"$validatorAddress\") | .)" > "$tmpGenesisPath"
    balancesSize=$(jq length "$tmpGenesisPath")
    if [ "$balancesSize" != "0" ]; then
        if [ "$balancesSize" = "1" ]; then
            # set validator's balance to 0, because all of its state will be delegated
            result=$(jq ".[].coins = [.[].coins[] | if (.denom == \"acudos\") then (.amount = \"0\") else . end]" $tmpGenesisPath)
            echo $result > $tmpGenesisPath
            # merge balances
            result=$(jq -s '.[0].app_state.bank.balances = .[0].app_state.bank.balances + .[1]' "$RESULT_GENESIS_PATH" "$tmpGenesisPath" | jq '.[0]')
            echo $result > "$RESULT_GENESIS_PATH"
        else
            echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There are several balances for account: $validatorAddress";
            exit 1;
        fi
    fi
    
    # staking.delegations
    result=$(jq -s '.[0].app_state.staking.delegations = .[0].app_state.staking.delegations + .[1].app_state.staking.delegations' "$RESULT_GENESIS_PATH" "$dataGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"

    # STAKING - append to staking.delegations
    if [ "$stakingDelegations" != "" ]; then
        echo $stakingDelegations > "$tmpGenesisPath"
        result=$(jq -s '.[0].app_state.staking.delegations = .[0].app_state.staking.delegations + .[1]' "$RESULT_GENESIS_PATH" "$tmpGenesisPath" | jq '.[0]')
        echo $result > "$RESULT_GENESIS_PATH"
    fi

    # STAKING - update self delegation
    result=$(jq ".app_state.staking.delegations = [.app_state.staking.delegations[] | if (.delegator_address == \"$validatorAddress\") then (.shares = \"$validatorStakingBalance.000000000000000000\") else . end]" $RESULT_GENESIS_PATH)
    echo $result > $RESULT_GENESIS_PATH

    # STAKING - calculate total delegations
    jq "[.app_state.staking.delegations | map(select(.validator_address == \"$validatorOperAddress\") | .shares) | .[] | gsub(\".000000000000000000$\"; \"\")]" $RESULT_GENESIS_PATH > "$tmpGenesisPath"
    validatorTotalShares=$(sum $tmpGenesisPath)
    validatorVotingPower=${validatorTotalShares::-18}

    # staking.last_validator_powers
    result=$(jq -s '.[0].app_state.staking.last_validator_powers = .[0].app_state.staking.last_validator_powers + .[1].app_state.staking.last_validator_powers' "$RESULT_GENESIS_PATH" "$dataGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"

    # STAKING - change last_validator_powers
    result=$(jq ".app_state.staking.last_validator_powers = [.app_state.staking.last_validator_powers[] | if (.address == \"$validatorOperAddress\") then (.power = \"$validatorVotingPower\") else . end]" $RESULT_GENESIS_PATH)
    echo $result > $RESULT_GENESIS_PATH

    # staking.last_total_power
    jq "[.app_state.staking.last_validator_powers[].power]" "$RESULT_GENESIS_PATH" > "$tmpGenesisPath"
    lastTotalPower=$(sum $tmpGenesisPath)
    result=$(jq ".app_state.staking.last_total_power = \"$lastTotalPower\"" "$RESULT_GENESIS_PATH")
    echo $result > "$RESULT_GENESIS_PATH"

    # staking.validators
    result=$(jq -s '.[0].app_state.staking.validators = .[0].app_state.staking.validators + .[1].app_state.staking.validators' "$RESULT_GENESIS_PATH" "$dataGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"

    # STAKING - update validator
    result=$(jq ".app_state.staking.validators = [.app_state.staking.validators[] | if (.operator_address == \"$validatorOperAddress\") then (.delegator_shares = \"$validatorTotalShares.000000000000000000\" | .tokens = \"$validatorTotalShares\") else . end]" "$RESULT_GENESIS_PATH")
    echo $result > "$RESULT_GENESIS_PATH"

    # validators
    result=$(jq -s '.[0].validators = .[0].validators + .[1].validators' "$RESULT_GENESIS_PATH" "$dataGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"

    # STAKING - update validator power
    result=$(jq ".validators = [.validators[] | if (.address == \"$validatorHashAddress\") then (.power = \"$validatorVotingPower\") else . end]" "$RESULT_GENESIS_PATH")
    echo $result > "$RESULT_GENESIS_PATH"

    # distribution.delegator_starting_infos
    result=$(jq -s '.[0].app_state.distribution.delegator_starting_infos = .[0].app_state.distribution.delegator_starting_infos + .[1].app_state.distribution.delegator_starting_infos' "$RESULT_GENESIS_PATH" "$dataGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"

    # STAKING - update distribution starting info
    result=$(jq ".app_state.distribution.delegator_starting_infos = [.app_state.distribution.delegator_starting_infos[] | if (.delegator_address == \"$validatorAddress\") then (.starting_info.stake = \"$validatorStakingBalance.000000000000000000\") else . end]" "$RESULT_GENESIS_PATH")
    echo $result > "$RESULT_GENESIS_PATH"

    if [ "$distributionDelegatorStartingInfos" != "" ]; then
        echo $distributionDelegatorStartingInfos > "$tmpGenesisPath"
        result=$(jq -s '.[0].app_state.distribution.delegator_starting_infos = .[0].app_state.distribution.delegator_starting_infos + .[1]' "$RESULT_GENESIS_PATH" "$tmpGenesisPath" | jq '.[0]')
        echo $result > "$RESULT_GENESIS_PATH"
    fi

    # distribution.validator_current_rewards
    result=$(jq -s '.[0].app_state.distribution.validator_current_rewards = .[0].app_state.distribution.validator_current_rewards + .[1].app_state.distribution.validator_current_rewards' "$RESULT_GENESIS_PATH" "$dataGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"

    result=$(jq '.app_state.distribution.validator_current_rewards[].rewards.rewards = []' "$RESULT_GENESIS_PATH")
    echo $result > "$RESULT_GENESIS_PATH"

    # distribution.validator_historical_rewards
    result=$(jq -s '.[0].app_state.distribution.validator_historical_rewards = .[0].app_state.distribution.validator_historical_rewards + .[1].app_state.distribution.validator_historical_rewards' "$RESULT_GENESIS_PATH" "$dataGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"

    # STAKING - update reference count
    result=$(jq ".app_state.distribution.validator_historical_rewards = [.app_state.distribution.validator_historical_rewards[] | if (.validator_address == \"$validatorOperAddress\") then (.rewards.reference_count = $historicalRefCount) else . end]" "$RESULT_GENESIS_PATH")
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

# bank.supply
jq ".app_state.bank.balances | map(.coins) | flatten | map(select(.denom == \"acudos\") | .amount)" "$RESULT_GENESIS_PATH" > "$tmpGenesisPath"
totalSupply=$(sum $tmpGenesisPath)
result=$(jq ".app_state.bank.supply[0].amount = \"$totalSupply\"" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

# rm -f "$tmpGenesisPath"
