
echo "Checking if provided addresses exist in exported:";

######################################################
# TEST auth.accounts all addresses exist in exported #
######################################################
echo -ne "  -all auth.accounts addresses exist in exported...";

#Test all root accounts addresses present
checkAddrExists "$rootAuthAddresses" "$exportedAuthAddresses" "some root addresses not present in exported gen auth.accounts"

#Test all stake BALANCE addresses present
checkAddrExists "$stakeBalancesAddr" "$exportedAuthAddresses" "some staking.json BALANCES not present in exported gen auth.accounts"

#Test all stake ADMIN addresses present
checkAddrExists "$stakeAdminsAddr" "$exportedAuthAddresses" "some staking.json ADMINS not present in exported gen auth.accounts"

#Test all stake validators addresses present
checkAddrExists "$stakeValidatorsAddr" "$exportedAuthAddresses" "some staking.json VALIDATORS not present in exported gen auth.accounts"

#Test all stake DELEGATORS addresses present
checkAddrExists "$stakeDelegatorsAddr" "$exportedAuthAddresses" "some staking.json DELEGATORS not present in exported gen auth.accounts"

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

######################################################
# TEST bank.balances all addresses exist in exported #
######################################################
echo -ne "  -all bank.balances addresses exist in exported...";

#Test all root bank.balances addresses present
checkAddrExists "$rootBankBalAddresses" "$exportedBankBalAddresses" "some root bank.balances addresses not present in exported gen bank.balances"

#Test all stake BALANCE addresses present
checkAddrExists "$stakeBalancesAddr" "$exportedBankBalAddresses" "some staking.json BApubkeyLANCES not present in exported gen bank.balances"

#Test all stake ADMIN addresses present
checkAddrExists "$stakeAdminsAddr" "$exportedBankBalAddresses" "some staking.json ADMINS not present in exported gen bank.balances"

#Test all stake validators addresses present
checkAddrExists "$stakeValidatorsWithRewards" "$exportedBankBalAddresses" "some staking.json VALIDATORS with balances not present in exported gen bank.balances"

#Test all stake DELEGATORS addresses present
checkAddrExists "$stakeDelegatorsWithRewards" "$exportedBankBalAddresses" "some staking.json DELEGATORS with balances not present in exported gen bank.balances"

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
######################################################
# TEST validators all addresses exist in exported #
######################################################
echo -ne "  -all validators addresses exist in exported...";

#Test root validator exists in exported
##Test staking.validators
###Test pubkey 
checkAddrExists "$rootValidatorsConsensusPubkey" "$exportedValidatorsConsensusPubkey" "root valdiator pubkey not present in exported staking.validators"

###Test operator address 
checkAddrExists "$rootValidatorsOperAddr" "$exportedValidatorsOperAddr" "root valdiator operator address not present in exported staking.validators"

##Test staking.last_validator_powers
checkAddrExists "$rootValidatorsOperAddr" "$exportedValLastPowAddr" "root validator operator address not present in exported staking.last_validator_powers"

##Test distribution.validator_current_rewards
checkAddrExists "$rootValidatorsOperAddr" "$exportedValCurRewAddr" "root validator operator address not present in exported distribution.current_validator_powers"

##Test distribution.validator_historical_rewards
checkAddrExists "$rootValidatorsOperAddr" "$exportedValHistRewAddr" "root validator operator address not present in exported distribution.validator_historical_rewards"

##Test distribution.validator_accumulated_commissions
checkAddrExists "$rootValidatorsOperAddr" "$exportedValAccumCommAddr" "root validator operator address not present in exported distribution.validator_accumulated_commissions"

##Test slashing.signing_infos
checkAddrExists "$rootValSignInfoConsAddr" "$exportedValSignInfoConsAddr" "root validator cons address not present in exported slashing.signing_infos"

#Test provided validators exist in exported
##Test staking.validators
###Test pubkey 
checkAddrExists "$providedValConsensusPubkeys" "$exportedValidatorsConsensusPubkey" "root valdiator pubkey not present in exported staking.validators"

###Test operator address 
checkAddrExists "$providedValOperAddr" "$exportedValidatorsOperAddr" "root valdiator operator address not present in exported staking.validators"

##Test staking.last_validator_powers
checkAddrExists "$providedValOperAddr" "$exportedValLastPowAddr" "provided validators operator address not present in exported staking.last_validator_powers"

##Test distribution.validator_current_rewards
checkAddrExists "$providedValOperAddr" "$exportedValCurRewAddr" "provided validators operator address not present in exported distribution.current_validator_powers"

##Test distribution.validator_historical_rewards
checkAddrExists "$providedValOperAddr" "$exportedValHistRewAddr" "provided validators operator address not present in exported distribution.validator_historical_rewards"

##Test distribution.validator_accumulated_commissions
checkAddrExists "$providedValOperAddr" "$exportedValAccumCommAddr" "provided validators operator address not present in exported distribution.validator_accumulated_commissions"

##Test slashing.signing_infos
checkAddrExists "$providedValConsAddr" "$exportedValSignInfoConsAddr" "provided validators cons address not present in exported slashing.signing_infos"

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
######################################################
# TEST delegators all addresses exist in exported #
######################################################
echo -ne "  -all delegator addresses exist in exported...";

#Test all delegator addresses exist in exported
##staking.delegations
checkAddrExists "$stakeDelegatorsAddr" "$exportedDelegationsAddr" "staking.json delegators not present in staking slashing.delegations"

##distribution.delegator_starting_infos
checkAddrExists "$stakeDelegatorsAddr" "$exportedDelStartInfosAddr" "staking.json delegators not present in exported distribution.delegator_starting_infos"

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
