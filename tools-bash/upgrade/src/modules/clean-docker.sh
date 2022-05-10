#!/bin/bash -i

echo -ne "Stopping the container...";
docker stop "$START_CONTAINER_NAME" &> /dev/null
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

if [ "$HAS_ORCHESTRATOR" = "true" ]; then
    echo -ne "Stopping the orchestrator...";

    args=$(cat "$ORCHESTRATOR_ARG_PATH")
    orchestratorContainerName=$(readEnvFromString "$args" "CONTAINER_NAME")
    unset args

    docker stop "$orchestratorContainerName" &> /dev/null
    
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
fi

echo -ne "Cleaning the docker...";
dockerResult=$(docker system prune -a -f 2>&1)
dockerResult=$(docker container prune -f 2>&1)
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
