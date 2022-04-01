DEBUG_GENESIS="true"

launcherPath=$(basename $(pwd))
if [ "$launcherPath" != "launcher" ]; then
    echo -e "\033[1;31mError:\033[m The script MUST be executed from launcher folder";
    exit 1
fi

source "./src/incs/var.sh"
WORKING_DATA_GENESIS_DIR="$WORKING_DIR/tests/genesises"
STAKING_JSON="$WORKING_DIR/tests/config/staking.json"

source "$WORKING_SRC_DIR/incs/utils.sh"

source "$WORKING_SRC_DIR/incs/utils-genesis.sh"

source "$WORKING_SRC_DIR/modules/merge-genesis.sh" "$WORKING_DIR/tests/config/genesis.root.json"

source "$WORKING_DIR/tests/modules/test-counts.sh"

source "$WORKING_DIR/tests/modules/test-addresses.sh"

source "$WORKING_DIR/tests/modules/test-amounts.sh"

