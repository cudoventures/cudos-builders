#!/bin/bash -i

# if [ ! -d "$WORKING_DIR/CudosData/$DATA_FOLDER" ]; then
#     echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Data folder is missing - $WORKING_DIR/CudosData/$DATA_FOLDER does not exists";
#     exit 1;
# fi

if [ ! -d "$WORKING_DIR/CudosNode" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} CudosNode older is missing - $WORKING_DIR/CudosNode does not exists";
    exit 1;
fi

if [ ! -d "$WORKING_DIR/CudosGravityBridge" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} CudosGravityBridge folder is missing - $WORKING_DIR/CudosGravityBridge does not exists";
    exit 1;
fi

if [ ! -d "$WORKING_DIR/CudosBuilders" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} CudosBuilders folder is missing - $WORKING_DIR/CudosBuilders does not exists";
    exit 1;
fi
