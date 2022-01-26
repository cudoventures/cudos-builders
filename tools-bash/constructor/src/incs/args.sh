#!/bin/bash -i

echo -ne "Processing arguments...";

if ([ $# != 1 ]) || ([ $1 != "full-node" ] && [ $1 != 'seed-node' ] && [ $1 != 'sentry-node' ]); then
    echo "Usage: $0 [node-name]";
    echo '[node-name] = full-node|seed-node|sentry-node';
    exit 1
fi

NODE_NAME="$1"

echo -e "\033[1;32mOK\033[m";