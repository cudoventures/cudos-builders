if [ "$PARAM_ETH_RPC" = "" ]; then
    echo -e "${COLOR_RED}Error:${COLOR_DEFAULT} The param PARAM_ETH_RPC must not be empty";
    exit 1
fi

# TO DO: Try to connect and check if it is synced

if [ "$PARAM_CONTRACT_DEPLOYER_ETH_PRIV_KEY" = "" ]; then
    echo -e "${COLOR_RED}Error:${COLOR_DEFAULT} The param PARAM_CONTRACT_DEPLOYER_ETH_PRIV_KEY must not be empty";
    exit 1
fi

# TO DO: Check wallet balance

if [ ! -f "$WORKING_DIR/config/topology.json" ]; then
    echo -e "${COLOR_RED}Error:${COLOR_DEFAULT} The $WORKING_DIR/config/topology.json file is missing";
    exit 1
fi