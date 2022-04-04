#!/bin/bash -i

rootValidatorAddress=$(jq .app_state.staking.delegations[0].delegator_address "$RESULT_GENESIS_PATH")
rootValidatorAddress=${rootValidatorAddress//\"/}

rootValidatorOperAddress=$(jq .app_state.staking.delegations[0].validator_address "$RESULT_GENESIS_PATH")
rootValidatorOperAddress=${rootValidatorOperAddress//\"/}

rootValidatorHashAddress=$(jq .validators[0].address "$RESULT_GENESIS_PATH")
rootValidatorHashAddress=${rootValidatorHashAddress//\"/}

rootValidatorRefAddress=$(jq .root.address "$STAKING_JSON")
rootValidatorRefAddress=${rootValidatorRefAddress//\"/}

rootValidatorReward=$(getRewardByAddress "$rootValidatorRefAddress")
if [ "$?" != "0" ]; then 
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} More than a single reward for a validator: $rootValidatorRefAddress";
    exit 1
fi

setAccountBalanceInAcudos "$RESULT_GENESIS_PATH" "$rootValidatorAddress" "$rootValidatorReward"

result=$(jq ".root.delegation" "$STAKING_JSON")
if [ "$result" != "null" ]; then
    echo $result > "$delegatorsDataGenesisPath"
    historicalRefCount=$(jq .root.delegation "$STAKING_JSON" | jq length)
    historicalRefCount=$(($historicalRefCount + 2))
    stakingDelegations=$(jq ".root.delegation | map({delegator_address: .delegatorAddress, shares: (.delegation + \".000000000000000000\"), validator_address: \"$rootValidatorOperAddress\"})" "$STAKING_JSON")
    distributionDelegatorStartingInfos=$(jq ".root.delegation | map({delegator_address: .delegatorAddress, starting_info: {height: \"0\", previous_period: \"1\", stake: (.delegation + \".000000000000000000\")}, validator_address: \"$rootValidatorOperAddress\"})" "$STAKING_JSON")
else
    echo "[]" > "$delegatorsDataGenesisPath"
    historicalRefCount="2"
    stakingDelegations=""
    distributionDelegatorStartingInfos=""
fi

addDelegatorsAccountsAndBalances "$delegatorsDataGenesisPath"

if [ "$stakingDelegations" != "" ]; then
    echo $stakingDelegations > "$tmpGenesisPath"
    result=$(jq -s '.[0].app_state.staking.delegations = .[0].app_state.staking.delegations + .[1]' "$RESULT_GENESIS_PATH" "$tmpGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"
fi

jq "[.app_state.staking.delegations | map(select(.validator_address == \"$rootValidatorOperAddress\") | .shares) | .[] | gsub(\".000000000000000000$\"; \"\")]" $RESULT_GENESIS_PATH > "$tmpGenesisPath"
rootValidatorTotalShares=$(sum $tmpGenesisPath)
rootValidatorVotingPower=${rootValidatorTotalShares::-18}

result=$(jq ".app_state.staking.last_validator_powers = [.app_state.staking.last_validator_powers[] | if (.address == \"$rootValidatorOperAddress\") then (.power = \"$rootValidatorVotingPower\") else . end]" $RESULT_GENESIS_PATH)
echo $result > $RESULT_GENESIS_PATH

result=$(jq ".app_state.staking.validators = [.app_state.staking.validators[] | if (.operator_address == \"$rootValidatorOperAddress\") then (.delegator_shares = \"$rootValidatorTotalShares.000000000000000000\" | .tokens = \"$rootValidatorTotalShares\") else . end]" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

result=$(jq ".validators = [.validators[] | if (.address == \"$rootValidatorHashAddress\") then (.power = \"$rootValidatorVotingPower\") else . end]" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"

if [ "$distributionDelegatorStartingInfos" != "" ]; then
    echo $distributionDelegatorStartingInfos > "$tmpGenesisPath"
    result=$(jq -s '.[0].app_state.distribution.delegator_starting_infos = .[0].app_state.distribution.delegator_starting_infos + .[1]' "$RESULT_GENESIS_PATH" "$tmpGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"
fi

result=$(jq ".app_state.distribution.validator_historical_rewards = [.app_state.distribution.validator_historical_rewards[] | if (.validator_address == \"$rootValidatorOperAddress\") then (.rewards.reference_count = $historicalRefCount) else . end]" "$RESULT_GENESIS_PATH")
echo $result > "$RESULT_GENESIS_PATH"
