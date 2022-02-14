#!/bin/bash -i

function readEnvFromString {
    envAsString="$1"
    envName="$2"
    tmpFilePath="/tmp/cudos-constructor-string.env"

    echo "$1" > "$tmpFilePath"
    eval $(source "$tmpFilePath"; echo tmpEnv="\"${!envName}\"")
    echo "$tmpEnv"
    unset tmpEnv
    rm -f "$tmpFilePath"
}
