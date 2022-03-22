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

if [ "$PARAM_INIT" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_SOURCE_DIR must not be empty";
    exit 1;
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
