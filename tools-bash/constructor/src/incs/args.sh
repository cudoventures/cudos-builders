#!/bin/bash -i

echo -ne "Processing arguments...";

if ([ $# != 1 ]) || ([ $1 != "full-node" ] && [ $1 != 'seed-node' ] && [ $1 != 'sentry-node' ] && [ $1 != 'validator-node' ]); then
    echo "Usage: $0 [node-name]";
    echo '[node-name] = full-node|seed-node|sentry-node|validator-node';
    exit 1
fi

NODE_NAME="$1"
IS_VALIDATOR="false"
if [ "$NODE_NAME" = "validator-node" ]; then
    NODE_NAME="full-node";
    IS_VALIDATOR="true"
fi

echo -e "\033[1;32mOK\033[m";