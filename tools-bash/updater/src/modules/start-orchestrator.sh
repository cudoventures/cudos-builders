#!/bin/bash -i

if [ "$ORCHESTRATOR_ENV_PATH" != "" ]; then
    echo -ne "Starting the orchestrator...";

    args=$(cat "$ORCHESTRATOR_ARG_PATH")
    orchestratorContainerName=$(readEnvFromString "$args" "CONTAINER_NAME")
    unset args

    cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator"
    dockerResult=$(docker-compose --env-file $ORCHESTRATOR_ARG_PATH -f ./orchestrator.release.yml -p $orchestratorContainerName up --build -d 2> /dev/null);
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error starting the orchestrator $?: ${dockerResult}";
        exit 1;
    fi
    
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
fi
