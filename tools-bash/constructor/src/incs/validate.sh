#!/bin/bash -i

echo -ne "Validating...";

if [ ! -x "$(command -v jq)" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The host does not have jq installed";
    exit 1;
fi

if [ ! -x "$(command -v python3)" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The host does not have python3 installed";
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

if [ "$STARTING" = "true" ]; then
    
    if [ "$IS_CLUSTERED_VALIDATOR" = "true" ]; then
        
        if [ "$PARAM_PERSISTENT_PEERS" = "" ]; then
            echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_PERSISTENT_PEERS must not be empty";
            exit 1;
        fi;
        
    fi;
    
    if [ "$IS_CLUSTERED_VALIDATOR" = "false" ]; then
        
        if [ "$PARAM_SEED" = "" ] && [ "$PARAM_PERSISTENT_PEERS" = "" ]; then
            echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_SEED or PARAM_PERSISTENT_PEERS must not be empty";
            exit 1;
        fi;
        
        if [ "$PARAM_PRIVATE_PEER_IDS" = "" ]; then
            echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_PRIVATE_PEER_IDS must not be empty";
            exit 1;
        fi;
        
        if [ "$PARAM_EXPOSE_IP" = "" ]; then
            echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_EXPOSE_IP must not be empty";
            exit 1;
        fi;
        
    fi;
    
fi

if [ "$INITIALIZING" = "true" ]; then
    if [ "$(ls -A $PARAM_SOURCE_DIR)" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The folder $PARAM_SOURCE_DIR is not empty";
        exit 1;
    fi;
fi

if [ "$STARTING" = "true" ]; then
    if [ ! -d "$PARAM_SOURCE_DIR/CudosBuilders" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The folder $PARAM_SOURCE_DIR/CudosBuilders does not exists";
        exit 1;
    fi;
    
    if [ ! -d "$PARAM_SOURCE_DIR/CudosData" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The folder $PARAM_SOURCE_DIR/CudosData does not exists";
        exit 1;
    fi;
    
    if [ ! -d "$PARAM_SOURCE_DIR/CudosGravityBridge" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The folder $PARAM_SOURCE_DIR/CudosGravityBridge does not exists";
        exit 1;
    fi;
    
    if [ ! -d "$PARAM_SOURCE_DIR/CudosNode" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The folder $PARAM_SOURCE_DIR/CudosNode does not exists";
        exit 1;
    fi;
fi

if [ "$IS_VALIDATOR" = "true" ]; then
    
    if [ "$PARAM_VALIDATOR_MNEMONIC" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_VALIDATOR_MNEMONIC must not be empty";
        exit 1;
    fi
    
    numberOfWords=$(echo "$PARAM_VALIDATOR_MNEMONIC" | wc -w)
    if ([ "$numberOfWords" != "12" ] && [ "$numberOfWords" != "24" ]); then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_VALIDATOR_MNEMONIC must be 12 or 24 words phrase";
        exit 1;
    fi;
    
    if [ "$PARAM_KEYRING_OS_PASS" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_KEYRING_OS_PASS must not be empty";
        exit 1;
    fi
    
    if [ ${#PARAM_KEYRING_OS_PASS} -lt 8 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_KEYRING_OS_PASS must be at least 8 characters";
        exit 1;
    fi

    if [ "$PARAM_COMMISSION_MAX_RATE" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_COMMISSION_MAX_RATE must not be empty";
        exit 1;
    fi
        if [ "$PARAM_COMMISION_RATE" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_COMMISION_RATE must not be empty";
        exit 1;
    fi
        if [ "$PARAM_COMMISSION_MAX_CHANGE_RATE" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_COMMISSION_MAX_CHANGE_RATE must not be empty";
        exit 1;
    fi

fi

if [ "$SHOULD_START_ORCHESTRATOR" = "true" ]; then
    
    if [ "$PARAM_ORCHESTRATOR_ENV_PATH" != "" ] && [ ! -f "$PARAM_ORCHESTRATOR_ENV_PATH" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Cannot find \"$PARAM_ORCHESTRATOR_ENV_PATH\" (Orchestrator's .env file)";
        exit 1;
    fi;
    
    if [ "$PARAM_ORCH_ETH_ADDRESS" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_ORCH_ETH_ADDRESS must not be empty";
        exit 1;
    fi;
    
    if [[ ! "$PARAM_ORCH_ETH_ADDRESS" =~ (^0x[0-9a-fA-F]{40}$) ]]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Orch ethereum address is invalid $PARAM_ORCH_ETH_ADDRESS";
        exit 1;
    fi
    
fi;


if [ ! -x "$(command -v docker)" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} You must install docker";
    exit 1;
fi

if [ ! -x "$(command -v docker-compose)" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} You must install docker-compose";
    exit 1;
fi

freeSpaceInKiB=$(df -P . | tail -1 | awk '{print $4}')
freeSpaceRequirementInKiB=500000000
if (( freeSpaceInKiB < freeSpaceRequirementInKiB )); then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Free space is less than $freeSpaceRequirementInKiB KiB (Available = $freeSpaceInKiB KiB)";
    exit 1;
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
