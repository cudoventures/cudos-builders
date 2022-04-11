#!/bin/bash -i

echo -ne "Validating backup...";

if [ "$1" = "create" ] || [ "$1" = "clean" ]; then

    if [ -f "$LOCK_BACKUP_RESTORE" ] || [ -f "$LOCK_UPGRADE_PATH" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The source files are imcomplete and you cannot create a backup from them";
        exit 1;
    fi

    # if [ ! -d "$PARAM_SOURCE_DIR/CudosData" ]; then
    #     echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Folder $PARAM_SOURCE_DIR/CudosData does not exists";
    #     exit 1;
    # fi

    if [ ! -d "$PARAM_SOURCE_DIR/CudosNode" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Folder $PARAM_SOURCE_DIR/CudosNode does not exists";
        exit 1;
    fi

    if [ ! -d "$PARAM_SOURCE_DIR/CudosGravityBridge" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Folder $PARAM_SOURCE_DIR/CudosGravityBridge does not exists";
        exit 1;
    fi

    if [ ! -d "$PARAM_SOURCE_DIR/CudosBuilders" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Folder $PARAM_SOURCE_DIR/CudosBuilders does not exists";
        exit 1;
    fi

fi

if [ "$1" = "restore" ] || [ "$1" = "validate" ]; then

    if [ -f "$LOCK_BACKUP_CREATE" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The backup is incomplete and you cannot restore from it";
        exit 1;
    fi

    # if [ ! -d "$PARAM_SOURCE_DIR/CudosData-backup" ]; then
    #     echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Folder $PARAM_SOURCE_DIR/CudosData-backup does not exists";
    #     exit 1;
    # fi

    if [ ! -d "$PARAM_SOURCE_DIR/CudosNode-backup" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Folder $PARAM_SOURCE_DIR/CudosNode-backup does not exists";
        exit 1;
    fi

    if [ ! -d "$PARAM_SOURCE_DIR/CudosGravityBridge-backup" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Folder $PARAM_SOURCE_DIR/CudosGravityBridge-backup does not exists";
        exit 1;
    fi

    if [ ! -d "$PARAM_SOURCE_DIR/CudosBuilders-backup" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Folder $PARAM_SOURCE_DIR/CudosBuilders-backup does not exists";
        exit 1;
    fi

fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
