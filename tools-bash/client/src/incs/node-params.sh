#!/bin/bash -i

if [ "$NODE_NAME" = "seed-node" ]; then
    NODE_BUILDER_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node"
elif [ "$NODE_NAME" = "sentry-node" ]; then
    NODE_BUILDER_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node"
elif [ "$NODE_NAME" = "full-node" ]; then
    NODE_BUILDER_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node"
fi

INIT_DOCKERFILE="./init-$NODE_NAME.dockerfile"
START_DOCKERFILE="./start-$NODE_NAME.dockerfile"
INIT_YML="./init-$NODE_NAME.yml"
START_YML="./start-$NODE_NAME.yml"
args=$(cat "$NODE_ARG_PATH")
VOLUME_NAME=$(readEnvFromString "$args" "VOLUME_NAME")
VOLUME_PATH="$PARAM_SOURCE_DIR/CudosData/$VOLUME_NAME"
INIT_CONTAINER_NAME=$(readEnvFromString "$args" "INIT_CONTAINER_NAME")
START_CONTAINER_NAME=$(readEnvFromString "$args" "START_CONTAINER_NAME")
unset args
