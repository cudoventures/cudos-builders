#!/bin/bash -i

function readEnvFromString {
    envAsString="$1"
    envName="$2"
    tmpFilePath="/tmp/cudos-launcher-string.env"

    echo "$1" > "$tmpFilePath"
    eval $(source "$tmpFilePath"; echo tmpEnv="\"${!envName}\"")
    echo "$tmpEnv"
    unset tmpEnv
    rm -f "$tmpFilePath"
}

function joinBy {
    local d=${1-} f=${2-}
    if shift 2; then
      printf %s "$f" "${@/#/$d}"
    fi
}

function getNetworkName {
  if [ "$NETWORK_MAINNET" = "true" ]; then
      echo "MAINNET"
  elif [ "$NETWORK_DRESSREHEARSAL" = "true" ]; then
      echo "DRESSREHEARSAL"
  elif [ "$NETWORK_TESTNET_PRIVATE" = "true" ]; then
      echo "TESTNET PRIVATE"
  elif [ "$NETWORK_TESTNET_PUBLIC" = "true" ]; then
      echo "TESTNET PUBLIC"
  else
      echo ""
  fi
}
