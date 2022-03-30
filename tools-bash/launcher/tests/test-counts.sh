echo "Checking if exported genesis counts match:";

EXPORTED_GENESIS="$WORKING_DIR/exports/genesis.json"
BASE_GENESIS="$WORKING_DIR/tests/config/genesis.root.json"
STAKING_JSON="$WORKING_DIR/tests/config/staking.json"

######################################
# CHECK number of validators equals  #
######################################
echo -ne "  -number of validators exported equals expected...";

givenValCount=$(ls "$WORKING_DATA_GENESIS_DIR"/* | wc -l)
givenValCount=$(($givenValCount + 1))

#staking.validatdrs count check
jq .app_state.staking.validators "$EXPORTED_GENESIS" > "$accountDataGenesisPath"
tempCount=$(jq length "$accountDataGenesisPath")
if [ "$tempCount" != "$givenValCount" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} staking validators count doesn't match";
    exit 1
fi

#staking.last_validator_powers check
jq .app_state.staking.last_validator_powers "$EXPORTED_GENESIS" > "$accountDataGenesisPath"
tempCount=$(jq length "$accountDataGenesisPath")
if [ "$tempCount" != "$givenValCount" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} staking last validator powers count doesn't match";
    exit 1
fi

#distribution.validator_current_rewards check
jq .app_state.distribution.validator_current_rewards "$EXPORTED_GENESIS" > "$accountDataGenesisPath"
tempCount=$(jq length "$accountDataGenesisPath")
if [ "$tempCount" != "$givenValCount" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} staking validator_current_rewards count doesn't match";
    exit 1
fi

#distribution.validator_historical_rewards check
jq .app_state.distribution.validator_historical_rewards "$EXPORTED_GENESIS" > "$accountDataGenesisPath"
tempCount=$(jq length "$accountDataGenesisPath")
if [ "$tempCount" != "$givenValCount" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} staking validator_historical_rewards count doesn't match";
    exit 1
fi

#distribution.validator_accumulated_commissions check
jq .app_state.distribution.validator_accumulated_commissions "$EXPORTED_GENESIS" > "$accountDataGenesisPath"
tempCount=$(jq length "$accountDataGenesisPath")
if [ "$tempCount" != "$givenValCount" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} staking validator_accumulated_commissions count doesn't match";
    exit 1
fi
#slashing.signing_infos check
jq .app_state.slashing.signing_infos "$EXPORTED_GENESIS" > "$accountDataGenesisPath"
tempCount=$(jq length "$accountDataGenesisPath")
if [ "$tempCount" != "$givenValCount" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} slashing signing_infos count doesn't match";
    exit 1
fi


echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

####################################################
# CHECK number of delegations per validator equal  #
####################################################
echo -ne "  -number of delegations per validator equals expected...";

# check root validator delegations
rootValOperAddress=$(jq .app_state.staking.delegations[0].validator_address "$rootGenesisPath")
rootValOperAddress=${rootValOperAddress//\"/}

jq ".root.delegation" "$STAKING_JSON" > "$tmpGenesisPath"
stakingRootDelegations=$(jq length "$tmpGenesisPath")

jq ".app_state.staking.delegations | map(select(.validator_address == \"$rootValOperAddress\") | .validator_address)" "$rootGenesisPath" > "$tmpGenesisPath"
rootGenRootDelegations=$(jq length "$tmpGenesisPath")

givenRootDelegations=$(($stakingRootDelegations+$rootGenRootDelegations))

## check root validator staking.delegations
jq ".app_state.staking.delegations | map(select(.validator_address == \"$rootValOperAddress\"))" "$RESULT_GENESIS_PATH" > "$tmpGenesisPath"
tempCount=$(jq length "$tmpGenesisPath")
if [ "$tempCount" != "$givenRootDelegations" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} root validator delegations count don't match";
    exit 1
fi

## check root validator distribution.delegator_starting_infos
jq ".app_state.distribution.delegator_starting_infos | map(select(.validator_address == \"$rootValOperAddress\"))" "$RESULT_GENESIS_PATH" > "$tmpGenesisPath"
tempCount=$(jq length "$tmpGenesisPath")
if [ "$tempCount" != "$givenRootDelegations" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} root validator distribution.delegator_starting_infos count don't match";
    exit 1
fi


totalClientDelegations=0
# check for client validators delegations
for dataGenesisPath in ./*; do
    [ -e "$dataGenesisPath" ] || continue

    jq .app_state.auth.accounts "$dataGenesisPath" | jq "map(select(.\"@type\" == \"/cosmos.auth.v1beta1.BaseAccount\") | .)" > "$accountDataGenesisPath"
    validatorAddress=$(jq .[0].address "$accountDataGenesisPath")
    validatorAddress=${validatorAddress//\"/}

    clientValOperAddress=$(jq ".app_state.staking.validators[0].operator_address" "$dataGenesisPath");
    clientValOperAddress=${clientValOperAddress//\"/}

    
    jq ".stake | map(select(.address == \"$validatorAddress\") .delegation) | .[0]" "$STAKING_JSON" > "$tmpGenesisPath"
    stakingDelegations=$(jq length "$tmpGenesisPath")

    givenClientDelegations=$(($stakingDelegations+1))
    totalClientDelegations=$(($totalClientDelegations+$givenClientDelegations))

    ## check client validators staking.delegations
    jq ".app_state.staking.delegations | map(select(.validator_address == \"$clientValOperAddress\"))" "$RESULT_GENESIS_PATH" > "$tmpGenesisPath"
    tempCount=$(jq length "$tmpGenesisPath")
    if [ "$tempCount" != "$givenClientDelegations" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} client validator ${validatorAddress} delegations count don't match";
        exit 1
    fi

    ## check client validators distribution.delegator_starting_infos
    jq ".app_state.distribution.delegator_starting_infos | map(select(.validator_address == \"$clientValOperAddress\"))" "$RESULT_GENESIS_PATH" > "$tmpGenesisPath"
    tempCount=$(jq length "$tmpGenesisPath")
    if [ "$tempCount" != "$givenClientDelegations" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} client validator ${validatorAddress} distribution.delegator_starting_infos count don't match";
        exit 1
    fi

done

#check for total number of delegations

totalDelegationsExpected=$(($givenRootDelegations+$totalClientDelegations))

jq ".app_state.staking.delegations" "$RESULT_GENESIS_PATH" > "$tmpGenesisPath"
tempCount=$(jq length "$tmpGenesisPath")

## check client validators staking.delegations
if [ "$tempCount" != "$totalDelegationsExpected" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} total delegations count don't match";
        exit 1
fi

## check client validators distribution.delegator_starting_infos
jq ".app_state.distribution.delegator_starting_infos" "$RESULT_GENESIS_PATH" > "$tmpGenesisPath"
tempCount=$(jq length "$tmpGenesisPath")
if [ "$tempCount" != "$totalDelegationsExpected" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} total distribution.delegator_starting_infos count don't match";
    exit 1
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

###################################
# CHECK number of auth accounts   #
###################################
echo -ne "  -number of auth accounts equals expected...";

jq .app_state.auth.accounts "$EXPORTED_GENESIS" > "$accountDataGenesisPath"
exportedTotalAccounts=$(jq length "$accountDataGenesisPath")

jq .app_state.auth.accounts "$EXPORTED_GENESIS" | jq "map(select(.\"@type\" == \"/cosmos.auth.v1beta1.BaseAccount\") | .)" > "$accountDataGenesisPath"
exportedBaseAccounts=$(jq length "$accountDataGenesisPath")

jq .app_state.auth.accounts "$EXPORTED_GENESIS" | jq "map(select(.\"@type\" == \"/cosmos.auth.v1beta1.ModuleAccount\") | .)" > "$accountDataGenesisPath"
exportedModuleAccounts=$(jq length "$accountDataGenesisPath")

#check module accounts count
jq .app_state.auth.accounts "$rootGenesisPath" | jq "map(select(.\"@type\" == \"/cosmos.auth.v1beta1.ModuleAccount\") | .)" > "$accountDataGenesisPath"
rootModuleAccounts=$(jq length "$accountDataGenesisPath")
if [ "$rootModuleAccounts" != "$exportedModuleAccounts" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} auth module type accounts count don't match";
    exit 1
fi

#check auth base accounts count
tmpStakingBankAddrPath="/tmp/stakingBankAddr.json"
tmpStakingValAddrPath="/tmp/stakingValAddr.json"
tmpStakingAdminAddrPath="/tmp/stakingAdminAddr.json"
tmpStakingBalancesAddrPath="/tmp/stakingBalancesAddr.json"
tmpStakingDelAddrPath="/tmp/stakingDelAddr.json"
tmpStakingRootDelAddrPath="/tmp/stakingRootDelAddr.json"
tmpStakingRootAddrPath="/tmp/stakingRootAddr.json"

jq .app_state.auth.accounts "$rootGenesisPath" | jq "map(select(.\"@type\" == \"/cosmos.auth.v1beta1.BaseAccount\") | .address)" > "$accountDataGenesisPath"

jq ".stake | map(. .address)" "$STAKING_JSON" > "$tmpStakingValAddrPath"
jq ".stake | map(select(.delegation != null) | .delegation) | flatten | map(. .delegatorAddress)" "$STAKING_JSON" > "$tmpStakingDelAddrPath"
jq "[.root.delegation[].delegatorAddress]" "$STAKING_JSON" > "$tmpStakingRootDelAddrPath"
jq ".admins | map(. .address)" "$STAKING_JSON" > "$tmpStakingAdminAddrPath"
jq ".balances | map(. .address)" "$STAKING_JSON" > "$tmpStakingBalancesAddrPath"
jq -s ". = .[0] + .[1] + .[2] + .[3] + .[4] + .[5] " "$accountDataGenesisPath" "$tmpStakingValAddrPath" "$tmpStakingAdminAddrPath" "$tmpStakingBalancesAddrPath" "$tmpStakingDelAddrPath" "$tmpStakingRootDelAddrPath" | jq "unique" > "$tmpGenesisPath"

totalbaseAddr=$(jq length "$tmpGenesisPath")

if [ "$totalbaseAddr" != "$exportedBaseAccounts" ]; then 
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} auth base type accounts count don't match";
    exit 1
fi

#check auth total accounts match
totalAddExpected=$(($totalbaseAddr+$rootModuleAccounts))
if [ "$exportedTotalAccounts" != "$totalAddExpected" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} auth total accounts count don't match";
    exit 1
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

###################################
# CHECK number of bank balances   #
###################################
echo -ne "  -number of bank balances equals expected...";

#get exported total balances
jq "".app_state.bank.balances "$EXPORTED_GENESIS" > "$accountDataGenesisPath"
exportedTotalBalances=$(jq length "$accountDataGenesisPath")

#get exported acudos nonzero balances
tmpModuleAccountAddr="/tmp/moduleAccounts.json"
jq .app_state.auth.accounts "$EXPORTED_GENESIS" | jq "map(select(.\"@type\" == \"/cosmos.auth.v1beta1.ModuleAccount\") | .base_account.address)" > "$tmpModuleAccountAddr"
moduleAddrArray=$(cat $tmpModuleAccountAddr)

jq ".app_state.bank.balances | map(select(.address as \$in | $moduleAddrArray | index(\$in) | not) | .coins) | flatten | map(select(.denom == \"acudos\" and .amount != \"0\") | .amount)" "$EXPORTED_GENESIS" > "$accountDataGenesisPath"
exportedNonZeroAcudosBalances=$(jq length "$accountDataGenesisPath")

#get exported module balances
jq ".app_state.bank.balances | map(select(.address as \$in | $moduleAddrArray | index(\$in)) | .coins) | flatten | map(select(.denom == \"acudos\" and .amount != \"0\") | .amount)" "$EXPORTED_GENESIS" > "$accountDataGenesisPath"
exportedModuleBalances=$(jq length "$accountDataGenesisPath")

#get exported cudosAdmin nonzero balances
jq ".app_state.bank.balances | map(.coins) | flatten | map(select(.denom == \"cudosAdmin\" and .amount != \"0\") | .amount)" "$EXPORTED_GENESIS"  > "$accountDataGenesisPath"
exportedAdminBalances=$(jq length "$accountDataGenesisPath")


#check acudos balances
tmpStakingBankBalPath="/tmp/stakingBankBal.json"
tmpStakingBalBalPath="/tmp/stakingBalBal.json"

##get taking all nonrepeating balances count
jq "[.bank[]] | map(select(.balance != \"0\") | .address)" "$STAKING_JSON" > "$tmpStakingBankBalPath"
jq "[.balances[]] | map(select(.balance != \"0\") | .address)" "$STAKING_JSON" > "$tmpStakingBalBalPath"
jq -s ". = .[0] + .[1]" "$tmpStakingBankBalPath" "$tmpStakingBalBalPath" | jq "unique" > "$accountDataGenesisPath"
stakingBalances=$(jq length "$accountDataGenesisPath")

##get root genesis all nonmodule account balances count
jq .app_state.auth.accounts "$rootGenesisPath" | jq "map(select(.\"@type\" == \"/cosmos.auth.v1beta1.ModuleAccount\") | .base_account.address)" > "$tmpModuleAccountAddr"
moduleAddrArray=$(cat $tmpModuleAccountAddr)

jq [.app_state.bank.balances[].address] "$EXPORTED_GENESIS" | jq -c ". - $moduleAddrArray" > "$tmpModuleAccountAddr"
baseAccountArray=$(cat $tmpModuleAccountAddr)

jq ".app_state.bank.balances | map(select(.address as \$in | $baseAccountArray | index(\$in)) | .coins) | flatten | map(select(.denom == \"acudos\" and .amount != \"0\") | .amount)" "$rootGenesisPath" > "$accountDataGenesisPath"
rootBankBalances=$(jq length "$accountDataGenesisPath")

expectedBalances=$(("$stakingBalances"+"$rootBankBalances"))
if [ "$exportedNonZeroAcudosBalances" != "$expectedBalances" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} acudos nonzero balances count don't match";
    exit 1   
fi

#check cudosAdmin balances

##get root cudosAdmin balances (should be empty)
jq ".app_state.bank.balances | map(select(.address as \$in | $baseAccountArray | index(\$in)) | .coins) | flatten | map(select(.denom == \"cudosAdmin\" and .amount != \"0\") | .amount)" "$rootGenesisPath" > "$accountDataGenesisPath"
rootAdminBalances=$(jq length "$accountDataGenesisPath")

##get taking all nonrepeating balances count
jq "[.admins[]] | map(select(.balance != \"0\") | .address)" "$STAKING_JSON" > "$tmpStakingBankBalPath"
stakingBalances=$(jq length "$tmpStakingBankBalPath")

expectedBalances=$(("$stakingBalances"+"$rootAdminBalances"))
if [ "$exportedAdminBalances" != "$expectedBalances" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} cudosAdmin nonzero balances count don't match";
    exit 1   
fi

#check total count of module accounts

##get root module balances 
jq .app_state.auth.accounts "$EXPORTED_GENESIS" | jq "map(select(.\"@type\" == \"/cosmos.auth.v1beta1.ModuleAccount\") | .base_account.address)" > "$tmpModuleAccountAddr"
moduleAddrArray=$(cat $tmpModuleAccountAddr)

jq ".app_state.bank.balances | map(select(.address as \$in | $moduleAddrArray | index(\$in)) | .coins) | flatten | map(select(.denom == \"acudos\" and .amount != \"0\") | .amount)" "$rootGenesisPath" > "$accountDataGenesisPath"
rootModuleBalances=$(jq length "$accountDataGenesisPath")

if [ "$exportedModuleBalances" != "$rootModuleBalances" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} module type account balances count don't match";
    exit 1   
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
