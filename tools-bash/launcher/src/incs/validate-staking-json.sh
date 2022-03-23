#!/bin/bash -i

echo -ne "Validating staking.json...";

result=$(jq ".root" "$STAKING_JSON")
if [ "$result" = "null" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} .root is missing from staking.json";
    exit 1;
fi

result=$(jq ".admins" "$STAKING_JSON")
if [ "$result" = "null" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} .admins is missing from staking.json";
    exit 1;
fi

result=$(jq ".balances" "$STAKING_JSON")
if [ "$result" = "null" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} .balances is missing from staking.json";
    exit 1;
fi

result=$(jq ".bank" "$STAKING_JSON")
if [ "$result" = "null" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} .bank is missing from staking.json";
    exit 1;
fi

result=$(jq ".stake" "$STAKING_JSON")
if [ "$result" = "null" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} .stake is missing from staking.json";
    exit 1;
fi

size=$(jq ".admins | length" "$STAKING_JSON")
uniqueSize=$(jq ".admins | unique_by(.address) | length" "$STAKING_JSON")
if [ "$size" != "$uniqueSize" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There is duplicate address in .admins";
    exit 1;
fi

size=$(jq ".balances | length" "$STAKING_JSON")
uniqueSize=$(jq ".balances | unique_by(.address) | length" "$STAKING_JSON")
if [ "$size" != "$uniqueSize" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There is duplicate address in .balances";
    exit 1;
fi

size=$(jq ".bank | length" "$STAKING_JSON")
uniqueSize=$(jq ".bank | unique_by(.address) | length" "$STAKING_JSON")
if [ "$size" != "$uniqueSize" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There is duplicate address in .bank";
    exit 1;
fi

size=$(jq ".stake | length" "$STAKING_JSON")
uniqueSize=$(jq ".stake | to_entries | map(.value.address) | unique | length" "$STAKING_JSON")
if [ "$size" != "$uniqueSize" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There is duplicate validator address";
    exit 1;
fi

stakeSize=$(jq ".stake | length" "$STAKING_JSON")
for i in $(seq 0 $(($stakeSize-1))); do
    delegation=$(jq ".stake | to_entries | .[$i] | .value.delegation" "$STAKING_JSON")
    if [ "$delegation" != "null" ]; then
        size=$(jq ".stake | to_entries | .[$i] | .value.delegation | length" "$STAKING_JSON")
        uniqueSize=$(jq ".stake | to_entries | .[$i] | .value.delegation | unique_by(.delegatorAddress) | length" "$STAKING_JSON")
        if [ "$size" != "$uniqueSize" ]; then
            validatorAddress=$(jq ".stake | to_entries | .[$i] | .value.address" "$STAKING_JSON")
            echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There is duplicate address in .delegations for validator with address $validatorAddress";
            exit 1;
        fi
    fi
done


echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
