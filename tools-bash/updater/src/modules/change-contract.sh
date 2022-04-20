#!/bin/bash -i

echo -ne "Deploying gravity smart contract...";
cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/gravity-contract-deployer"
\cp -f ./gravity-contract-deployer.env.example ./gravity-contract-deployer.env
sed -i "s~COSMOS_NODE=.*~COSMOS_NODE=\"$PARAM_CHAIN_ENDPOINT_26657\"~g" ./gravity-contract-deployer.env
sed -i "s~ETH_NODE=.*~ETH_NODE=\"$PARAM_ETH_RPC\"~g" ./gravity-contract-deployer.env
sed -i "s/ETH_PRIV_KEY_HEX=.*/ETH_PRIV_KEY_HEX=\"$PARAM_CONTRACT_DEPLOYER_ETH_PRIV_KEY\"/g" ./gravity-contract-deployer.env
sed -i "s/CUDOS_ACCESS_CONTROL_ADDRESS=.*/CUDOS_ACCESS_CONTROL_ADDRESS=\"$CUDOS_ACCESS_CONTROL_ADDRESS\"/g" ./gravity-contract-deployer.env

dockerResult=$(docker-compose --env-file ./gravity-contract-deployer.arg -f ./gravity-contract-deployer.yml -p cudos-gravity-contract-deployer down 2>&1);
dockerResult=$(docker-compose --env-file ./gravity-contract-deployer.arg -f ./gravity-contract-deployer.yml -p cudos-gravity-contract-deployer up --build 2>&1);
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error building the sleeping node for export $?: ${dockerResult}";
    exit 1;
fi
if [[ "$dockerResult" =~ (Gravity deployed at Address[ ]*-[ ]*0x[0-9a-fA-F]+) ]]; then
    GRAVITY_CONTRACT_ADDRESS=${BASH_REMATCH[1]//Gravity deployed at Address[ ]*-/}
    GRAVITY_CONTRACT_ADDRESS=$(echo $GRAVITY_CONTRACT_ADDRESS | sed 's/ *$//g')
else
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Cannot find gravity contract address: $dockerResult";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Clean-up after the deployment of the gravity smart contract...";
dockerResult=$(docker-compose --env-file ./gravity-contract-deployer.arg -f ./gravity-contract-deployer.yml -p cudos-gravity-contract-deployer down 2>&1);
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Updating orchestrator env...";
cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator"
sed -i "s/CONTRACT_ADDR=.*/CONTRACT_ADDR=\"$GRAVITY_CONTRACT_ADDRESS\"/g" "$ORCHESTRATOR_ENV_PATH"
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
