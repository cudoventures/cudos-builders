if [ "$OPEN_ALL_PORTS" = "true" ]; then
    # port 1317
    # enable
    sed -i "/\[api\]/,/\[/ s/enable = .*/enable = true/" "${CUDOS_HOME}/config/app.toml"
    sed -i "s/enabled-unsafe-cors = \".*\"/enabled-unsafe-cors = true/" "${CUDOS_HOME}/config/app.toml"

    # port 9090
    # enable
    sed -i "/\[grpc\]/,/\[/ s/enable = .*/enable = true/" "${CUDOS_HOME}/config/app.toml"

    # port 26657
    # enable
    sed -i "/\[rpc\]/,/\[/ s/laddr = \".*\"/laddr = \"tcp:\/\/0.0.0.0:26657\"/" "${CUDOS_HOME}/config/config.toml"
    sed -i "/\[rpc\]/,/\[/ s/cors_allowed_origins = \".*\"/cors_allowed_origins = \[\"\*\"\]/" "${CUDOS_HOME}/config/config.toml"

    # port 26660
    sed -i "s/prometheus = \".*\"/prometheus = true/g" "${CUDOS_HOME}/config/config.toml"
fi;

if [ "$ZERO_GAS_PRICE" = "true" ]; then
    # gas price
    sed -i "s/minimum-gas-prices = \".*\"/minimum-gas-prices = \"0acudos\"/" "${CUDOS_HOME}/config/app.toml"
fi;

if [ "$VOTING_PERIOD" != "" ]; then
    genesisJson=$(jq ".app_state.gov.voting_params.voting_period = \"$VOTING_PERIOD\"" "${CUDOS_HOME}/config/genesis.json")
    echo $genesisJson > "${CUDOS_HOME}/config/genesis.json"
fi