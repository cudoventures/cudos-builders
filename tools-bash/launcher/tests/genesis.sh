DEBUG_GENESIS="true"

source "./src/incs/var.sh"
WORKING_DATA_GENESIS_DIR="$WORKING_DIR/tests/genesises"
STAKING_JSON="$WORKING_DIR/tests/config/staking.json"

source "$WORKING_SRC_DIR/incs/utils.sh"

source "$WORKING_SRC_DIR/incs/utils-genesis.sh"

source "$WORKING_SRC_DIR/modules/merge-genesis.sh" "$WORKING_DIR/tests/config/genesis.root.json"

source "$WORKING_DIR/tests/test-exported-genesis.sh"