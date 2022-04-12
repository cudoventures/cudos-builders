#!/bin/bash -i

if [ "$HAS_ORCHESTRATOR" = "true" ]; then
    echo -ne "Stopping the orchestrator...";

    args=$(cat "$ORCHESTRATOR_ARG_PATH")
    orchestratorContainerName=$(readEnvFromString "$args" "CONTAINER_NAME")
    unset args

    docker stop "$orchestratorContainerName" &> /dev/null
    
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
fi
