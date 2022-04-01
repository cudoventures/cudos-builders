
EXPORTED_GENESIS="$WORKING_DIR/exports/genesis.json"
BASE_GENESIS="$WORKING_DIR/tests/config/genesis.root.json"
STAKING_JSON="$WORKING_DIR/tests/config/staking.json"
tmpExportedAddressespath="/tmp/tmpExportedAddresses.json"


#get exported auth addresses
jq ".app_state.auth.accounts | map(select(.address != null) | .address)" "$EXPORTED_GENESIS" > "$tmpExportedAddressespath"
exportedAuthAddresses=$(cat "$tmpExportedAddressespath")

#get exported bank.balances 
jq ".app_state.bank.balances | map(select(.address != null) | .)" "$EXPORTED_GENESIS" > "$tmpExportedAddressespath"
exportedBankBalances=$(cat "$tmpExportedAddressespath")

#get exported bank.balances addresses
echo "$exportedBankBalances" | jq "[.[].address]" > "$tmpExportedAddressespath"
exportedBankBalAddresses=$(cat "$tmpExportedAddressespath")

#get root auth addresses
jq ".app_state.auth.accounts | map(select(.address != null) | .address)" "$rootGenesisPath" > "$tmpExportedAddressespath"
rootAuthAddresses=$(cat "$tmpExportedAddressespath")

#get root bank balances
jq ".app_state.bank.balances | map(select(.address != null) | .)" "$rootGenesisPath" > "$tmpExportedAddressespath"
rootBankBalances=$(cat "$tmpExportedAddressespath")

#get root bank balances addresses
echo "$rootBankBalances" | jq "[.[].address]" > "$tmpExportedAddressespath"
rootBankBalAddresses=$(cat "$tmpExportedAddressespath")

#get staking balances
jq ".balances | map(select(.address != null) | .)" "$STAKING_JSON" > "$tmpExportedAddressespath"
stakeBalances=$(cat "$tmpExportedAddressespath")

#get staking balances addresses
echo "$stakeBalances" | jq "[.[].address]" > "$tmpExportedAddressespath"
stakeBalancesAddr=$(cat "$tmpExportedAddressespath")

#get staking admins
jq ".admins | map(select(.address != null) | .)" "$STAKING_JSON" > "$tmpExportedAddressespath"
stakeAdmins=$(cat "$tmpExportedAddressespath")

#get staking admin addresses
echo "$stakeAdmins" | jq "[.[].address]" > "$tmpExportedAddressespath"
stakeAdminsAddr=$(cat "$tmpExportedAddressespath")

#get staking validators
#get staking validators addresses

stakeValidatorsAddr="[]"
for dataGenesisPath in $WORKING_DATA_GENESIS_DIR/*; do
    [ -e "$dataGenesisPath" ] || continue
    setAllValAddrFromGen "$dataGenesisPath"

    if [ "$tempValStakeAddrLength" != "0" ]; then
        stakeValidatorsAddr=$(echo "$stakeValidatorsAddr" | jq ". + $tempValStakeAddrArray")
    fi
done

#get root delegators
jq "[.app_state.staking.delegations[]]" "$rootGenesisPath" > "$tmpExportedAddressespath"
rootDelegations=$(cat "$tmpExportedAddressespath")

echo "$rootDelegations" | jq "[.[].delegator_address]" > "$tmpExportedAddressespath"
rootDelegationsAddr=$(cat "$tmpExportedAddressespath")


#get staking delegators
tmpStakeDelegPath="/tmp/tmpStakeDelegPath.json"
jq ".stake | map(select(.delegation != null and .address as \$in | $stakeValidatorsAddr | index(\$in)) | .delegation) | flatten" "$STAKING_JSON" > "$tmpStakeDelegPath"

#get staking delegators
tmpStakeRootDelegPath="/tmp/tmpStakeRootDelegPath.json"
jq ".root.delegation | map(select(.delegation != null) | .) | flatten" "$STAKING_JSON" > "$tmpStakeRootDelegPath"
jq -s ". = .[0] + .[1]" "$tmpStakeDelegPath" "$tmpStakeRootDelegPath" > "$tmpExportedAddressespath"
stakeDelegators=$(cat "$tmpExportedAddressespath")

#get staking delegators addresses
echo "$stakeDelegators" | jq "[.[].delegatorAddress]" > "$tmpExportedAddressespath"
stakeDelegatorsAddr=$(cat "$tmpExportedAddressespath")

allGivenAddrInStake=$(echo "$stakeValidatorsAddr" | jq ". + $stakeDelegatorsAddr")

#get staking validators with rewards addresses
jq ".bank | map(select(.address as \$in | $stakeValidatorsAddr | index(\$in)) | .address)" "$STAKING_JSON" > "$tmpExportedAddressespath"
stakeValidatorsWithRewards=$(cat "$tmpExportedAddressespath")

#get staking delegators with rewards addresses
stakeDelegatorsWithRewards=$(jq ".bank | map(select(.address as \$in | $stakeDelegatorsAddr | index(\$in)) | .address)" "$STAKING_JSON")

#get staking root val address
stakeRootValAddress=$(jq ".root.address" "$STAKING_JSON")

#get staking root val with reward
stakeRootWithReward=$(jq ".bank | map(select(.address as \$in | $stakeRootValAddress | index(\$in)) | .address)" "$STAKING_JSON")

#get all validator addresses
## get all validators consesnsus pubkeys
### get exported validators consensus pubkeys
exportedValidatorsConsensusPubkey=$(getValAddr "consPubKey" $EXPORTED_GENESIS)

### get root validators consensus pubkeys
rootValidatorsConsensusPubkey=$(getValAddr "consPubKey" $rootGenesisPath)

## get all validators operator addresses
### get exported validators operator_address
exportedValidatorsOperAddr=$(getValAddr "oper" $EXPORTED_GENESIS)

### get root validators operator_address
rootValidatorsOperAddr=$(getValAddr "oper" $rootGenesisPath)

### get exported staking.last_validator_powers addresses
jq "[.app_state.staking.last_validator_powers[].address]" "$EXPORTED_GENESIS" > "$tmpExportedAddressespath"
exportedValLastPowAddr=$(cat "$tmpExportedAddressespath")

### get exported distribution.validator_current_rewards addresses
jq "[.app_state.distribution.validator_current_rewards[].validator_address]" "$EXPORTED_GENESIS" > "$tmpExportedAddressespath"
exportedValCurRewAddr=$(cat "$tmpExportedAddressespath")

### get exported distribution.validator_historical_rewards addresses
jq "[.app_state.distribution.validator_historical_rewards[].validator_address]" "$EXPORTED_GENESIS" > "$tmpExportedAddressespath"
exportedValHistRewAddr=$(cat "$tmpExportedAddressespath")

### get exported distribution.validator_accumulated_commissions addresses
jq "[.app_state.distribution.validator_accumulated_commissions[].validator_address]" "$EXPORTED_GENESIS" > "$tmpExportedAddressespath"
exportedValAccumCommAddr=$(cat "$tmpExportedAddressespath")

## get all validators signing_infos addresses
### get root slashing.signing_infos addresses
rootValSignInfoConsAddr=$(getValAddr "cons" $rootGenesisPath)

### get exported slashing.signing_infos addresses
exportedValSignInfoConsAddr=$(getValAddr "cons" $EXPORTED_GENESIS)

### get provided genesises validators pubkeys and addresses
tmpTempAddrs="/tmp/tmpTempAddr.json"
tmpProvidedValConsensusPubkeys="/tmp/tmpProvidedValConsensusPubkeys.json"
tmpProvidedValOperAddr="/tmp/tmpProvidedValOperAddr.json"
tmpProvidedValConsAddr="/tmp/tmpProvidedValConsAddr.json"

echo "[]" > "$tmpProvidedValConsensusPubkeys"
echo "[]" > "$tmpProvidedValOperAddr"
echo "[]" > "$tmpProvidedValConsAddr"

for dataGenesisPath in $WORKING_DATA_GENESIS_DIR/*; do
    [ -e "$dataGenesisPath" ] || continue
    
    setAllValAddrFromGen "$dataGenesisPath"

    #check if address exists in staking.json
    echo "$tempValStakeAddrArray" | jq -c ". - $stakeValidatorsAddr" > "$tmpExportedAddressespath"

    givenValNotInStake=$(jq length "$tmpExportedAddressespath")

    if [ "$givenValNotInStake" == "0" ]; then
        getValAddr "consPubKey" $dataGenesisPath > "$tmpExportedAddressespath"
        jq -s ". = .[0] + .[1]" "$tmpProvidedValConsensusPubkeys" "$tmpExportedAddressespath" > "$tmpTempAddrs"
        cat "$tmpTempAddrs" > "$tmpProvidedValConsensusPubkeys"
    
        getValAddr "oper" $dataGenesisPath > "$tmpExportedAddressespath"
        jq -s ". = .[0] + .[1]" "$tmpProvidedValOperAddr" "$tmpExportedAddressespath" > "$tmpTempAddrs"
        cat "$tmpTempAddrs" > "$tmpProvidedValOperAddr"

        getValAddr "cons" $dataGenesisPath > "$tmpExportedAddressespath"
        jq -s ". = .[0] + .[1]" "$tmpProvidedValConsAddr" "$tmpExportedAddressespath" > "$tmpTempAddrs"
        cat "$tmpTempAddrs" > "$tmpProvidedValConsAddr"
    fi
done

providedValConsensusPubkeys=$(cat "$tmpProvidedValConsensusPubkeys")
providedValOperAddr=$(cat "$tmpProvidedValOperAddr")
providedValConsAddr=$(cat "$tmpProvidedValConsAddr")

#GET exported delegators addresses
##GET staking.delegations
jq "[.app_state.staking.delegations[]]" "$EXPORTED_GENESIS" > "$tmpExportedAddressespath"
exportedDelegations=$(cat "$tmpExportedAddressespath")

jq "[.app_state.staking.delegations[].delegator_address]" "$EXPORTED_GENESIS" > "$tmpExportedAddressespath"
exportedDelegationsAddr=$(cat "$tmpExportedAddressespath")

##GET distribution.delegator_starting_infos
jq "[.app_state.distribution.delegator_starting_infos[].delegator_address]" "$EXPORTED_GENESIS" > "$tmpExportedAddressespath"
exportedDelStartInfosAddr=$(cat "$tmpExportedAddressespath")
