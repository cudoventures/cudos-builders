#!/bin/bash -i

echo -ne "Processing arguments...";

if ([ $# != 1 ]) || ([ "$1" != "full-node" ] && [ "$1" != 'seed-node' ] && [ "$1" != 'sentry-node' ] && [ "$1" != 'clustered-validator-node' ] && [ "$1" != 'standalone-validator-node' ]); then
    echo "Usage: $0 [node-name]";
    echo '[node-name] = full-node|seed-node|sentry-node|clustered-validator-node|standalone-validator-node';
    exit 1
fi

NODE_NAME="$1"
IS_VALIDATOR="false"
IS_CLUSTERED_VALIDATOR="false"
IS_STANDALONE_VALIDATOR="false"
SHOULD_START_ORCHESTRATOR="false"
if [ "$NODE_NAME" = "clustered-validator-node" ]; then
    NODE_NAME="full-node";
    IS_VALIDATOR="true"
    IS_CLUSTERED_VALIDATOR="true"
    IS_STANDALONE_VALIDATOR="false"
fi
if [ "$NODE_NAME" = "standalone-validator-node" ]; then
    NODE_NAME="full-node";
    IS_VALIDATOR="true"
    IS_CLUSTERED_VALIDATOR="false"
    IS_STANDALONE_VALIDATOR="true"
fi

echo -e "\033[1;32mOK\033[m";