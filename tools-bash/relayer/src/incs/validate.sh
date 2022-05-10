#!/bin/bash -i

echo -ne "Validating...";

if [ ! -x "$(command -v git)" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The host does not have git installed";
    exit 1;
fi

if [ ! -x "$(command -v docker)" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} You must install docker";
    exit 1;
fi

if [ ! -x "$(command -v docker-compose)" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} You must install docker-compose";
    exit 1;
fi

if [ ! -x "$(command -v curl)" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} You must install curl";
    exit 1;
fi

if [ "$PARAM_SOURCE_DIR" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_SOURCE_DIR must not be empty";
    exit 1;
fi

if [ ! -d "$PARAM_SOURCE_DIR" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The folder $PARAM_SOURCE_DIR does not exists";
    exit 1;
fi

if [ ! -w "$PARAM_SOURCE_DIR" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Permission denied while accessing folder $PARAM_SOURCE_DIR";
    exit 1;
fi

if [ "$(ls -A $PARAM_SOURCE_DIR)" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The folder $PARAM_SOURCE_DIR is not empty";
    exit 1;
fi;

# Validating the params in relayer.env
envFile=$(cat "$WORKING_DIR/config/relayer.env")
paramNames=("REST_ENABLED" "REST_HOST" "REST_PORT" "TELEMETRY_ENABLED" "TELEMETRY_HOST" "TELEMETRY_PORT" "CHAIN_ID_0" "RPC_ADDR_0" "GRPC_ADDR_0" "WEBSOCKET_ADDR_0" "ACCOUNT_PREFIX_0" "GAS_PRICE_0" "GAS_DENOM_0" "MNEMONIC_0"  "CHAIN_ID_1" "RPC_ADDR_1" "GRPC_ADDR_1" "WEBSOCKET_ADDR_1" "ACCOUNT_PREFIX_1" "GAS_PRICE_1" "GAS_DENOM_1" "MNEMONIC_1" )

for i in ${!paramNames[@]}; do
    paramName=${paramNames[i]}
    param=$(readEnvFromString "$envFile" "$paramName")
    if [ "$param" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param $paramName can't be empty"
        exit 1
    fi
    unset param
    unset paramName
done

endpointNames=("RPC_ADDR_0" "GRPC_ADDR_0" "RPC_ADDR_1" "GRPC_ADDR_1")
for i in ${!endpointNames[@]}; do
    paramName=${endpointNames[i]}
    param=$(readEnvFromString "$envFile" "$paramName")
    param=${param//\\/}
    curlResult=$(curl "$param" 2>&1)
    if [[ "$curlResult" =~ .*"Failed".* ]]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Unable to connect to $param";
        exit 1;
    fi
    unset param
    unset paramName
done

unset paramNames
unset envFile

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
