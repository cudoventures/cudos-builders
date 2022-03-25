
echo "Testing exported genesis counts match:";

EXPORTED_GENESIS="$WORKING_DIR/exports/genesis.json"
BASE_GENESIS="$WORKING_DIR/tests/config/genesis.root.json"
STAKING_JSON="$WORKING_DIR/tests/config/staking.json"

######################################################
# TEST auth.accounts all addresses exist in exported #
######################################################
echo -ne "  -all auth.accounts addresses exist in exported...";
tmpExportedAddressespath="/tmp/tmpExportedAddresses.json"

#get exported auth addresses
jq ".app_state.auth.accounts | map(select(.address != null) | .address)" "$EXPORTED_GENESIS" > "$tmpExportedAddressespath"
exportedAuthAddresses=$(cat "$tmpExportedAddressespath")

#get exported bank.balances addresses
jq ".app_state.bank.balances | map(select(.address != null) | .address)" "$EXPORTED_GENESIS" > "$tmpExportedAddressespath"
exportedBankBalAddresses=$(cat "$tmpExportedAddressespath")

#get root auth addresses
jq ".app_state.auth.accounts | map(select(.address != null) | .address)" "$rootGenesisPath" > "$tmpExportedAddressespath"
rootAuthAddresses=$(cat "$tmpExportedAddressespath")

#get root bank balances
jq ".app_state.bank.balances | map(select(.address != null) | .address)" "$rootGenesisPath" > "$tmpExportedAddressespath"
rootBankBalAddresses=$(cat "$tmpExportedAddressespath")

#get staking balances addresses
jq ".balances | map(select(.address != null) | .address)" "$STAKING_JSON" > "$tmpExportedAddressespath"
stakeBalances=$(cat "$tmpExportedAddressespath")

#get staking admin addresses
jq ".admins | map(select(.address != null) | .address)" "$STAKING_JSON" > "$tmpExportedAddressespath"
stakeAdmins=$(cat "$tmpExportedAddressespath")

#get staking validator addresses
jq ".stake | map(. .address)" "$STAKING_JSON" > "$tmpExportedAddressespath"
stakeValidators=$(cat "$tmpExportedAddressespath")

#get staking delegator addresses
jq ".stake | map(select(.delegation != null) | .delegation) | flatten | map(. .delegatorAddress)" "$STAKING_JSON" > "$tmpExportedAddressespath"
stakeDelegators=$(cat "$tmpExportedAddressespath")

#get staking validators with rewards addresses
jq ".bank | map(select(.address as \$in | $stakeValidators | index(\$in)) | .address)" "$STAKING_JSON" > "$tmpExportedAddressespath"
stakeValidatorsWithRewards=$(cat "$tmpExportedAddressespath")

#get staking delegators with rewards addresses
jq ".bank | map(select(.address as \$in | $stakeDelegators | index(\$in)) | .address)" "$STAKING_JSON" > "$tmpExportedAddressespath"
stakeDelegatorsWithRewards=$(cat "$tmpExportedAddressespath")

#get all validator addresses

## get all validators consesnsus pubkeys

### get exported validators consensus pubkeys
jq "[.app_state.staking.validators[].consensus_pubkey.key]" "$EXPORTED_GENESIS" > "$tmpExportedAddressespath"
exportedValidatorsConsensusPubkey=$(cat "$tmpExportedAddressespath")

### get root validators consensus pubkeys
jq "[.app_state.staking.validators[].consensus_pubkey.key]" "$rootGenesisPath" > "$tmpExportedAddressespath"
rootValidatorsConsensusPubkey=$(cat "$tmpExportedAddressespath")


## get all validators operator addresses

#Test all root accounts addresses present
echo "$rootAuthAddresses" | jq -c ". - $exportedAuthAddresses" > "$tmpExportedAddressespath"
rootAddrNotPresentCount=$(jq length "$tmpExportedAddressespath")
if [ "$rootAddrNotPresentCount" != 0 ]; then
    echo -ne "\n${STYLE_RED}Error:${STYLE_DEFAULT} some root addresses not present in exported gen auth.accounts: ";
    cat "$tmpExportedAddressespath";
    exit 1  
fi

#Test all stake BALANCE addresses present
echo "$stakeBalances" | jq -c ". - $exportedAuthAddresses" > "$tmpExportedAddressespath"
stakeBalanceAddrNotPresentCount=$(jq length "$tmpExportedAddressespath")
if [ "$stakeBalanceAddrNotPresentCount" != 0 ]; then
    echo -ne "\n${STYLE_RED}Error:${STYLE_DEFAULT} some staking.json BALANCES not present in exported gen auth.accounts: ";
    cat "$tmpExportedAddressespath";
    exit 1  
fi

#Test all stake ADMIN addresses present
echo "$stakeAdmins" | jq -c ". - $exportedAuthAddresses" > "$tmpExportedAddressespath"
stakeAdminAddrNotPresentCount=$(jq length "$tmpExportedAddressespath")
if [ "$stakeAdminAddrNotPresentCount" != 0 ]; then
    echo -ne "\n${STYLE_RED}Error:${STYLE_DEFAULT} some staking.json ADMINS not present in exported gen auth.accounts: ";
    cat "$tmpExportedAddressespath";
    exit 1  
fi

#Test all stake validators addresses present
echo "$stakeValidators" | jq -c ". - $exportedAuthAddresses" > "$tmpExportedAddressespath"
stakeValAddrNotPresentCount=$(jq length "$tmpExportedAddressespath")
if [ "$stakeValAddrNotPresentCount" != 0 ]; then
    echo -ne "\n${STYLE_RED}Error:${STYLE_DEFAULT} some staking.json VALIDATORS not present in exported gen auth.accounts: ";
    cat "$tmpExportedAddressespath";
    exit 1  
fi

#Test all stake DELEGATORS addresses present
echo "$stakeDelegators" | jq -c ". - $exportedAuthAddresses" > "$tmpExportedAddressespath"
stakeDelAddrNotPresentCount=$(jq length "$tmpExportedAddressespath")
if [ "$stakeDelAddrNotPresentCount" != 0 ]; then
    echo -ne "\n${STYLE_RED}Error:${STYLE_DEFAULT} some staking.json DELEGATORS not present in exported gen auth.accounts: ";
    cat "$tmpExportedAddressespath";
    exit 1  
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

######################################################
# TEST bank.balances all addresses exist in exported #
######################################################
echo -ne "  -all bank.balances addresses exist in exported...";

#Test all root bank.balances addresses present
echo "$rootBankBalAddresses" | jq -c ". - $exportedBankBalAddresses" > "$tmpExportedAddressespath"
rootAddrNotPresentCount=$(jq length "$tmpExportedAddressespath")
if [ "$rootAddrNotPresentCount" != 0 ]; then
    echo -ne "\n${STYLE_RED}Error:${STYLE_DEFAULT} some root bank.balances addresses not present in exported gen bank.balances: ";
    cat "$tmpExportedAddressespath";
    exit 1  
fi

#Test all stake BALANCE addresses present
echo "$stakeBalances" | jq -c ". - $exportedBankBalAddresses" > "$tmpExportedAddressespath"
stakeBalancseAddrNotPresentCount=$(jq length "$tmpExportedAddressespath")
if [ "$stakeBalancseAddrNotPresentCount" != 0 ]; then
    echo -ne "\n${STYLE_RED}Error:${STYLE_DEFAULT} some staking.json BALANCES not present in exported gen bank.balances: ";
    cat "$tmpExportedAddressespath";
    exit 1  
fi

#Test all stake ADMIN addresses present
echo "$stakeAdmins" | jq -c ". - $exportedBankBalAddresses" > "$tmpExportedAddressespath"
stakeAdminsAddrNotPresentCount=$(jq length "$tmpExportedAddressespath")
if [ "$stakeAdminsAddrNotPresentCount" != 0 ]; then
    echo -ne "\n${STYLE_RED}Error:${STYLE_DEFAULT} some staking.json ADMINS not present in exported gen bank.balances: ";
    cat "$tmpExportedAddressespath";
    exit 1  
fi

#Test all stake validators addresses present
echo "$stakeValidatorsWithRewards" | jq -c ". - $exportedBankBalAddresses" > "$tmpExportedAddressespath"
stakeValidatorsAddrNotPresentCount=$(jq length "$tmpExportedAddressespath")
if [ "$stakeValidatorsAddrNotPresentCount" != 0 ]; then
    echo -ne "\n${STYLE_RED}Error:${STYLE_DEFAULT} some staking.json VALIDATORS with balances not present in exported gen bank.balances: ";
    cat "$tmpExportedAddressespath";
    exit 1  
fi

#Test all stake DELEGATORS addresses present
echo "$stakeDelegatorsWithRewards" | jq -c ". - $exportedBankBalAddresses" > "$tmpExportedAddressespath"
stakeDelegatorsAddrNotPresentCount=$(jq length "$tmpExportedAddressespath")
if [ "$stakeDelegatorsAddrNotPresentCount" != 0 ]; then
    echo -ne "\n${STYLE_RED}Error:${STYLE_DEFAULT} some staking.json DELEGATORS with balances not present in exported gen bank.balances: ";
    cat "$tmpExportedAddressespath";
    exit 1  
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
######################################################
# TEST bank.balances all addresses exist in exported #
######################################################
echo -ne "  -all validators addresses exist in exported...";

#Test root validator present


echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";