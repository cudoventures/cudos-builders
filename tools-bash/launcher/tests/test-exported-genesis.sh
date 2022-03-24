EXPORTED_GENESIS="$WORKING_DIR/exports/genesis.json"
BASE_GENESIS="$WORKING_DIR/tests/config/genesis.root.json"
STAKING_JSON="$WORKING_DIR/tests/config/staking.json"

# CHECK number of validators exported = number of validators in all given genesises
jq .app_state.auth.accounts "$EXPORTED_GENESIS" | jq "map(select(.\"@type\" == \"/cosmos.auth.v1beta1.BaseAccount\") | .)" > "$accountDataGenesisPath"

exportedValAddrCount=$(jq length "$accountDataGenesisPath")
givenValAddrCount=0

for dataGenesisPath in "$WORKING_DATA_GENESIS_DIR"/*; do
    [ -e "$dataGenesisPath" ] || continue

    # validator address
    jq .app_state.auth.accounts "$dataGenesisPath" | jq "map(select(.\"@type\" == \"/cosmos.auth.v1beta1.BaseAccount\") | .)" > "$accountDataGenesisPath"
    validatorsSize=$(jq length "$accountDataGenesisPath")
    if [ "$validatorsSize" != "1" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There are several accounts in $WORKING_DATA_GENESIS_DIR/$dataGenesisPath";
        exit 1;
    fi

    givenValAddrCount=$(($givenValAddrCount + $validatorsSize))

    # result=$(jq ".[0].sequence = \"1\"" "$accountDataGenesisPath")
    # validatorAddress=$(jq .[0].address "$accountDataGenesisPath")
    # validatorAddress=${validatorAddress//\"/}
done

# validator address
jq .app_state.auth.accounts "$BASE_GENESIS" | jq "map(select(.\"@type\" == \"/cosmos.auth.v1beta1.BaseAccount\") | .)" > "$accountDataGenesisPath"
validatorsSize=$(jq length "$accountDataGenesisPath")

givenValAddrCount=$(($givenValAddrCount + $validatorsSize))


echo "$exportedValAddrCount"
echo "$givenValAddrCount"
echo
if [ "$exportedValAddrCount" != "$givenValAddrCount" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} validator type address count doesn't match";
fi