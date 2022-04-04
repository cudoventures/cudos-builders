#!/bin/bash -i

cd "$WORKING_DATA_GENESIS_DIR"
for dataGenesisPath in ./*; do
    [ -e "$dataGenesisPath" ] || continue

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
    jq ".stake | map(select(.address == \"$validatorAddress\") | .)" "$STAKING_JSON" > "$tmpGenesisPath"
    stakingSize=$(jq length "$tmpGenesisPath")
    if [ "$stakingSize" = "0" ]; then
        if [ "$DEBUG_GENESIS" = "true" ]; then
            echo "Skipping validator $validatorAddress from file $dataGenesisPath"
        fi
        continue;
    fi
    if [ "$DEBUG_GENESIS" = "true" ]; then
        echo "Processing validator $validatorAddress from file $dataGenesisPath"
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
        echo $result > "$delegatorsDataGenesisPath"
        historicalRefCount=$(jq .delegation "$tmpGenesisPath" | jq length)
        historicalRefCount=$(($historicalRefCount + 2))
        stakingDelegations=$(jq ".delegation | map({delegator_address: .delegatorAddress, shares: (.delegation + \".000000000000000000\"), validator_address: \"$validatorOperAddress\"})" "$tmpGenesisPath")
        distributionDelegatorStartingInfos=$(jq ".delegation | map({delegator_address: .delegatorAddress, starting_info: {height: \"0\", previous_period: \"1\", stake: (.delegation + \".000000000000000000\")}, validator_address: \"$validatorOperAddress\"})" "$tmpGenesisPath")
    else
        echo "[]" > "$delegatorsDataGenesisPath"
        historicalRefCount="2"
        stakingDelegations=""
        distributionDelegatorStartingInfos=""
    fi

    validatorReward=$(getRewardByAddress "$validatorAddress")
    if [ "$?" != "0" ]; then 
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} More than a single reward for a validator: $rootValidatorRefAddress";
        exit 1
    fi
    setAccountBalanceInAcudos "$RESULT_GENESIS_PATH" "$validatorAddress" "$validatorReward"

    addDelegatorsAccountsAndBalances "$delegatorsDataGenesisPath"
    
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
    result=$(jq ".app_state.staking.delegations = [.app_state.staking.delegations[] | if (.delegator_address == \"$validatorAddress\" and .validator_address == \"$validatorOperAddress\") then (.shares = \"$validatorStakingBalance.000000000000000000\") else . end]" $RESULT_GENESIS_PATH)
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
    result=$(jq ".app_state.distribution.delegator_starting_infos = [.app_state.distribution.delegator_starting_infos[] | if (.delegator_address == \"$validatorAddress\" and .validator_address == \"$validatorOperAddress\") then (.starting_info.stake = \"$validatorStakingBalance.000000000000000000\") else . end]" "$RESULT_GENESIS_PATH")
    echo $result > "$RESULT_GENESIS_PATH"

    if [ "$distributionDelegatorStartingInfos" != "" ]; then
        echo $distributionDelegatorStartingInfos > "$tmpGenesisPath"
        result=$(jq -s '.[0].app_state.distribution.delegator_starting_infos = .[0].app_state.distribution.delegator_starting_infos + .[1]' "$RESULT_GENESIS_PATH" "$tmpGenesisPath" | jq '.[0]')
        echo $result > "$RESULT_GENESIS_PATH"
    fi

    # distribution.validator_current_rewards
    result=$(jq -s '.[0].app_state.distribution.validator_current_rewards = .[0].app_state.distribution.validator_current_rewards + .[1].app_state.distribution.validator_current_rewards' "$RESULT_GENESIS_PATH" "$dataGenesisPath" | jq '.[0]')
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

    # slashing.signing_infos
    result=$(jq -s '.[0].app_state.slashing.signing_infos = .[0].app_state.slashing.signing_infos + .[1].app_state.slashing.signing_infos' "$RESULT_GENESIS_PATH" "$dataGenesisPath" | jq '.[0]')
    echo $result > "$RESULT_GENESIS_PATH"
done
