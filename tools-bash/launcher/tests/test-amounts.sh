echo "Checking if all amounts are calculated correctly in exported:";

function checkIfInExportedDelegation(){
    exportedAddrSharesArray=$(echo "$exportedDelegations" | jq "map(select(.delegator_address == \"${1}\" and .validator_address == \"${3}\") | .shares)")
    exportedAddrSharesCount=$(echo "$exportedAddrSharesArray" | jq length)

    if [ "$exportedAddrSharesCount" != "1" ]; then
        echo -e "\n${STYLE_RED}Error:${STYLE_DEFAULT} More than one entry in staking to validator ${3}. for address: ${1}";
        exit 1
    fi
    
    exportedAddrShares=$(echo "$exportedAddrSharesArray" | jq ".[0]")

    if [ "$2" != "$exportedAddrShares" ]; then 
        echo -e "\n${STYLE_RED}Error:${STYLE_DEFAULT} Expected ${2} shares, but exported ${exportedAddrShares} shares for address: ${1}";
        exit 1  
    fi


    #check the same as above but in distribution
    exportedAddrSharesArray=$(jq ".app_state.distribution.delegator_starting_infos | map(select(.delegator_address == \"${1}\" and .validator_address == \"${3}\") | .starting_info.stake)" "$EXPORTED_GENESIS")
    exportedAddrSharesCount=$(echo "$exportedAddrSharesArray" | jq length)

    if [ "$exportedAddrSharesCount" != "1" ]; then
        echo -e "\n${STYLE_RED}Error:${STYLE_DEFAULT} More than one entry in staking to validator ${3}. for address: ${1}";
        exit 1  
    fi
    
    exportedAddrShares=$(echo "$exportedAddrSharesArray" | jq ".[0]")
    if [ "$2" != "$exportedAddrShares" ]; then 
        echo -e "\n${STYLE_RED}Error:${STYLE_DEFAULT} Expected ${2} shares in distribution, but exported ${exportedAddrShares} shares for address: ${1}";
        exit 1  
    fi

}


##################
# SETUP          #
##################
source "$WORKING_DIR/tests/varGetters.sh"

addrStakeAcudosPath="/tmp/addrStakeAcudosPath.json"
addrRootAcudosBalancesPath="/tmp/addrRootAcudosBalancesPath.json"
addrStakeBankPath="/tmp/addrStakeBankPath.json"
addrExportedAcudosBalancePath="/tmp/addrExportedAcudosBalancePath.json"
addrRootAdminBalancePath="/tmp/addrRootAdminBalance.json"
addrExportedAdminBalancePath="/tmp/addrExportedAdminBalance.json"
addrStakeAdminPath="/tmp/addrStakeAdmins.json"

#get staking balances
jq ".bank | map(select(.address != null) | .)" "$STAKING_JSON" > "$tmpExportedAddressespath"
stakeBank=$(cat "$tmpExportedAddressespath")

jq .app_state.auth.accounts "$rootGenesisPath" | jq "map(select(.\"@type\" == \"/cosmos.auth.v1beta1.ModuleAccount\") | .base_account.address)" > "$tmpExportedAddressespath"
moduleAddresses=$(cat "$tmpExportedAddressespath")

############################################
# TEST all bank.balances are correct       #
############################################
echo -ne "  -all bank.balances are correct in exported...";

echo "$exportedBankBalAddresses" | jq "map(select(. as \$in | $moduleAddresses | index(\$in) | not) | .)" > "$tmpExportedAddressespath"
exportedBankBalAddresses=$(cat "$tmpExportedAddressespath")

rootStakeAddr=$(jq .root.address $STAKING_JSON) 
rootValAddr=$(jq .app_state.staking.delegations[0].delegator_address "$rootGenesisPath")
rootValAddr=${rootValAddr//\"/}

for addr in $(echo "${exportedBankBalAddresses}" | jq -r '.[]'); do
    #get all balances
    echo "$exportedBankBalances" | jq ". | map(select(.address == \"${addr}\") | .coins) | flatten" > "$tmpExportedAddressespath"
    addrExportedBalances=$(cat "$tmpExportedAddressespath")

    echo "$rootBankBalances" | jq ". | map(select(.address == \"${addr}\") | .coins) | flatten" > "$tmpExportedAddressespath"
    addrRootBalances=$(cat "$tmpExportedAddressespath")

    echo "$stakeBalances" | jq ". | map(select(.address == \"${addr}\") | .balance) | flatten" > "$addrStakeAcudosPath"

    echo "$stakeAdmins" | jq ". | map(select(.address == \"${addr}\") | .balance) | flatten" > "$addrStakeAdminPath"

    echo "$stakeBank" | jq ". | map(select(.address == \"${addr}\" and .address as \$in | $allGivenAddrInStake | index(\$in)) | .balance) | flatten" > "$addrStakeBankPath"

    #get amounts for acudos
    echo "$addrExportedBalances" | jq ". | map(select(.denom == \"acudos\") | .amount) | flatten" > "$addrExportedAcudosBalancePath"

    echo "$addrRootBalances" | jq ". | map(select(.denom == \"acudos\") | .amount) | flatten" > "$addrRootAcudosBalancesPath"

    #get amounts for admin tokens
    echo "$addrExportedBalances" | jq ". | map(select(.denom == \"cudosAdmin\") | .amount) | flatten" > "$addrExportedAdminBalancePath"
    
    echo "$addrRootBalances" | jq ". | map(select(.denom == \"cudosAdmin\") | .amount) | flatten" > "$addrRootAdminBalancePath"

    jq -s ". = .[0] + .[1] + .[2]" "$addrRootAcudosBalancesPath" "$addrStakeAcudosPath" "$addrStakeBankPath" > "$tmpExportedAddressespath"
    allBalancesInOneArray=$(cat "$tmpExportedAddressespath")

    if [ "$rootValAddr" == "$addr" ]; then
        echo "$stakeBank" | jq "map(select(.address == ${rootStakeAddr}) .balance) | flatten" > "$addrStakeBankPath"
        echo "$allBalancesInOneArray" > "$addrStakeAcudosPath"
        jq -s ". = .[0] + .[1]" "$addrStakeAcudosPath" "$addrStakeBankPath" > "$tmpExportedAddressespath"
        allBalancesInOneArray=$(cat "$tmpExportedAddressespath")
    fi

    #check if amounts are correct
    addrAcudosTotalGiven=$(sum $tmpExportedAddressespath)
    addrExportedAcudosBalance=$(sum $addrExportedAcudosBalancePath)
    if [ "$addrAcudosTotalGiven" != "$addrExportedAcudosBalance" ]; then
        echo -e "\n${STYLE_RED}Error:${STYLE_DEFAULT} Expected ${addrAcudosTotalGiven}acudos, but exported ${addrExportedAcudosBalance}acudos for address: ${addr}";
        exit 1  
    fi


    jq -s ". = .[0] + .[1]" "$addrRootAdminBalancePath" "$addrStakeAdminPath" > "$tmpExportedAddressespath"

    #check if amounts are correct
    addrAdminTotalGiven=$(sum $tmpExportedAddressespath)
    addrExportedAdminBalance=$(sum $addrExportedAdminBalancePath)
    if [ "$addrAdminTotalGiven" != "$addrExportedAdminBalance" ]; then
        echo -e "\n${STYLE_RED}Error:${STYLE_DEFAULT} Expected ${addrAdminTotalGiven}adminTokens, but exported ${addrExportedAdminBalance}adminTokens for address: ${addr}";
        exit 1  
    fi
done

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
############################################
# TEST all delegators stuff                #
############################################
echo -ne "  -all delegations and validator powers are correct in exported...";

#check root delegations
rootValidatorsOperAddr=$(echo "$rootValidatorsOperAddr" | jq .[0])
rootValidatorsOperAddr=${rootValidatorsOperAddr//\"/}

for addr in $(echo "${rootDelegationsAddr}" | jq -r '.[]'); do
    rootAddrShares=$(echo "$rootDelegations" | jq "map(select(.delegator_address == \"${addr}\") | .shares) | .[0]")
    checkIfInExportedDelegation "$addr" "$rootAddrShares" "$rootValidatorsOperAddr"
done

#check root stake delegations
rootStakeDelArray=$(jq ".root.delegation | map(select(.delegation != null) | .) | flatten" "$STAKING_JSON")
rootStakeDelAddrArray=$(jq ".root.delegation | map(select(.delegation != null) | .delegatorAddress) | flatten" "$STAKING_JSON")

rootDelTokensTotalPath="/tmp/rootDelTokensTotalPath.json"
tmpDelegationCoinsPath="/tmp/tmpDelegationCoinsPath.json"
echo "[]" > "$rootDelTokensTotalPath"

for addr in $(echo "${rootStakeDelAddrArray}" | jq -r '.[]'); do
    rootDelTokensArray=$(echo "$rootStakeDelArray" | jq "map(select(.delegatorAddress == \"${addr}\")) | map(select(.delegation != null) | .delegation)")
    rootDelTokens=$(echo "$rootDelTokensArray" | jq .[0])
    rootDelTokens=${rootDelTokens//\"/}
    rootDelPow="[${rootDelTokens::-18}]"
    rootDelShares="\"${rootDelTokens}.000000000000000000\""
    checkIfInExportedDelegation "$addr" "$rootDelShares" "$rootValidatorsOperAddr"

    echo "$rootDelPow" > "$tmpDelegationCoinsPath"
    jq -s ". = .[0] + .[1]" "$rootDelTokensTotalPath" "$tmpDelegationCoinsPath" > "$tmpTempAddrs"
    cat "$tmpTempAddrs" > "$rootDelTokensTotalPath"
done

if [ "$valExportedLastPower" != "$valPower" ]; then
    echo -e "\n${STYLE_RED}Error:${STYLE_DEFAULT} Expected ${valPower} but exported ${valExportedPower} delegator last_validator_powers for validator: ${tempValOperAddr}";
    exit 1     
fi

#check everything for each validator from given genesis
valPowerAllArrayPath="/tmp/valPowerAllArrayPath.json"
echo "[]" > "$valPowerAllArrayPath"

for dataGenesisPath in $WORKING_DATA_GENESIS_DIR/*; do
    [ -e "$dataGenesisPath" ] || continue

    setAllValAddrFromGen "$dataGenesisPath"

    valDelegations=$(jq ".stake | map(select(.address == \"${tempValStakeAddr}\") | .delegation) | flatten | map(select(. != null) | .)" "$STAKING_JSON")
    
    delegationCoinsPath="/tmp/delegationCoinsPath.json"
    tmpDelegationCoinsPath="/tmp/tmpDelegationCoinsPath.json"
    echo "[]" > "$delegationCoinsPath"
    if [ $(echo "$valDelegations" | jq length) != "0" ]; then
        valDelegationsAddr=$(echo "$valDelegations" | jq "[.[].delegatorAddress]")
        for delegationAddr in $(echo "${valDelegationsAddr}" | jq -r '.[]'); do
            delCoinsArray=$(echo "$valDelegations" | jq "map(select(.delegatorAddress == \"${delegationAddr}\") | .delegation)")
            if [ $(echo "$valDelegations" | jq length) == "0" ]; then
                echo -e "\n${STYLE_RED}Error:${STYLE_DEFAULT} More than one delegation from ${delegationAddr} to ${valAddr} in staking.json";
                exit 1 
            fi
            delCoins=$(echo "$delCoinsArray" | jq .[0])
            delCoins=${delCoins//\"/}
            addrShares="\"${delCoins}.000000000000000000\""
            checkIfInExportedDelegation "$delegationAddr" "$addrShares" "$tempValOperAddr"

            echo "$delCoinsArray" > "$tmpDelegationCoinsPath"
            jq -s ". = .[0] + .[1]" "$delegationCoinsPath" "$tmpDelegationCoinsPath" > "$tmpTempAddrs"
            cat "$tmpTempAddrs" > "$delegationCoinsPath"
        done
    fi
    valSelfDelegation=$(jq ".stake | map(select(.address == \"${tempValStakeAddr}\") | .tokens)" "$STAKING_JSON")
    echo "$valSelfDelegation" > "$tmpDelegationCoinsPath"
    jq -s ". = .[0] + .[1]" "$delegationCoinsPath" "$tmpDelegationCoinsPath" > "$tmpTempAddrs"
    cat "$tmpTempAddrs" > "$delegationCoinsPath"

    valTokensSum=$(sum "$delegationCoinsPath")
    valShares="${valTokensSum}.000000000000000000"

    #TEST validator tokens
    valExportedTokensArray=$(jq ".app_state.staking.validators | map(select(.operator_address == \"${tempValOperAddr}\") | .tokens)" "$EXPORTED_GENESIS")
    valExportedTokens=$(echo "$valExportedTokensArray" | jq .[0])
    valExportedTokens=${valExportedTokens//\"/}

    if [ "$valExportedTokens" != "$valTokensSum" ]; then 
        echo -e "\n${STYLE_RED}Error:${STYLE_DEFAULT} Expected ${valTokensSum} but exported ${valExportedTokens} tokens for validator: ${tempValOperAddr}";
        exit 1 
    fi

    #TEST validator delegator_shares
    valExportedSharesArray=$(jq ".app_state.staking.validators | map(select(.operator_address == \"${tempValOperAddr}\") | .delegator_shares)" "$EXPORTED_GENESIS")
    valExportedShares=$(echo "$valExportedSharesArray" | jq .[0])
    valExportedShares=${valExportedShares//\"/}

    if [ "$valExportedShares" != "$valShares" ]; then 
        echo -e "\n${STYLE_RED}Error:${STYLE_DEFAULT} Expected $rootDelTokensTotalPath delegator_shares but exported ${valExportedShares} delegator_shares for validator: ${tempValOperAddr}";
        exit 1 
    fi

    #TEST VALIDATORS power    
    valPubKeyArray=$(getValAddr "consPubKey" "$dataGenesisPath")
    valPubKey=$(echo "$valPubKeyArray" | jq .[0])
    valPubKey=${valPubKey//\"/}

    valExportedPowerArray=$(jq ".validators | map(select(.pub_key.value == \"${valPubKey}\") | .power)" "$EXPORTED_GENESIS")
    valExportedPower=$(echo "$valExportedPowerArray" | jq .[0])
    valExportedPower=${valExportedPower//\"/}

    valPower=${valTokensSum::-18}
    
    if [ "$valExportedPower" != "$valPower" ]; then
        echo -e "\n${STYLE_RED}Error:${STYLE_DEFAULT} Expected ${valPower} but exported ${valExportedPower} delegator power for validator: ${tempValOperAddr}";
        exit 1     
    fi

    #TEST VALIDATORS last_validator_powers
    valExportedLastPowerArray=$(jq ".app_state.staking.last_validator_powers | map(select(.address == \"${tempValOperAddr}\") | .power)" "$EXPORTED_GENESIS")
    valExportedLastPower=$(echo "$valExportedPowerArray" | jq .[0])
    valExportedLastPower=${valExportedPower//\"/}

    if [ "$valExportedLastPower" != "$valPower" ]; then
        echo -e "\n${STYLE_RED}Error:${STYLE_DEFAULT} Expected ${valPower} but exported ${valExportedPower} delegator last_validator_powers for validator: ${tempValOperAddr}";
        exit 1     
    fi

    echo "$valExportedPowerArray" > "$tmpDelegationCoinsPath"
    jq -s ". = .[0] + .[1]" "$valPowerAllArrayPath" "$tmpDelegationCoinsPath" > "$tmpTempAddrs"
    cat "$tmpTempAddrs" > "$valPowerAllArrayPath"
done

#add roots power as well
tempRootValConsPubKey=$(echo "$rootValidatorsConsensusPubkey" | jq .[0])
tempRootValConsPubKey=${tempRootValConsPubKey//\"/}

#TEST ROOT VALIDATOR last_validator_powers
valExportedLastPowerArray=$(jq ".app_state.staking.last_validator_powers | map(select(.address == \"${rootValidatorsOperAddr}\") | .power) | .[0]" "$EXPORTED_GENESIS")
valExportedLastPower=${valExportedLastPowerArray//\"/}
jq ".validators | map(select(.pub_key.value == \"$tempRootValConsPubKey\") | .power)" "$rootGenesisPath" > "$tmpDelegationCoinsPath"
jq -s ". = .[0] + .[1]" "$tmpDelegationCoinsPath" "$rootDelTokensTotalPath"> "$tmpTempAddrs"
cat "$tmpTempAddrs" > "$rootDelTokensTotalPath"

valExportedPower=$(jq ".validators | map(select(.pub_key.value == \"${tempRootValConsPubKey}\") | .power) | .[0]" "$EXPORTED_GENESIS")
valExportedPower=${valExportedPower//\"/}


totalRootValPower=$(sum "$rootDelTokensTotalPath")

if [ "$totalRootValPower" != "$valExportedPower" ]; then
    echo -e "\n${STYLE_RED}Error:${STYLE_DEFAULT} Expected ${totalRootValPower} but exported ${valExportedPower} root validator power";
    exit 1   
fi

if [ "$totalRootValPower" != "$valExportedLastPower" ]; then
    echo -e "\n${STYLE_RED}Error:${STYLE_DEFAULT} Expected ${totalRootValPower} but exported ${valExportedLastPower} root last_validator_powers";
    exit 1   
fi

jq -s ". = .[0] + .[1] + .[2]" "$valPowerAllArrayPath" "$rootDelTokensTotalPath"> "$tmpTempAddrs"
cat "$tmpTempAddrs" > "$valPowerAllArrayPath"

#TEST staking total power
totalPower=$(sum "$valPowerAllArrayPath")

exportedTotalPower=$(jq ".app_state.staking.last_total_power" "$EXPORTED_GENESIS")
if [ "\"$totalPower\"" != "$exportedTotalPower" ]; then
    echo -e "\n${STYLE_RED}Error:${STYLE_DEFAULT} Expected ${totalPower} but exported ${exportedTotalPower} staking total power";
    exit 1   
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
