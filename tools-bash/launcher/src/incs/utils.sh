#!/bin/bash -i

function readEnvFromString {
    envAsString="$1"
    envName="$2"
    tmpFilePath="/tmp/cudos-launcher-string.env"

    echo "$1" > "$tmpFilePath"
    eval $(source "$tmpFilePath"; echo tmpEnv="${!envName}")
    echo "$tmpEnv"
    unset tmpEnv
}

function execSsh {
    ssh -o "StrictHostKeyChecking no" ${1}@${2} -p ${3} "$4"
}