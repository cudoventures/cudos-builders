#!/bin/bash -i

topology=$(cat $WORKING_DIR/config/topology.json)

# computers
function getComputersSize {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(len(obj['computers']))"
}

function getComputerId {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(obj['computers'][$1]['id'])"
}

function getComputerIp {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(obj['computers'][$1]['ip'])"
}

function getComputerPort {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(obj['computers'][$1]['port'])"
}

function getComputerUser {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(obj['computers'][$1]['user'])"
}

function getComputerSshKeyPath {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(obj['computers'][$1]['sshKeyPath'])"
}

function getComputerPass {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(obj['computers'][$1]['pass'])"
}

# root-validator
function getValidatorComputerId {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(obj['nodes']['primary-validator']['computerId'])"
}

function getValidatorId {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(obj['nodes']['primary-validator']['validatorId'])"
}

function getValidatorEnvPath {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(obj['nodes']['primary-validator']['envPath'])"
}

function getValidatorOrchEthAddress {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(obj['nodes']['primary-validator']['orchEthAddress'])"
}

function getValidatorOrchEthPrivKey {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(obj['nodes']['primary-validator']['ethPrivKey'])"
}

# seeds
function getSeedsSize {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(len(obj['nodes']['seeds']))"
}

function getSeedValidatorId {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(obj['nodes']['seeds'][$1]['validatorId'])"
}

function getSeedComputerId {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(obj['nodes']['seeds'][$1]['computerId'])"
}

function getSeedEnvPath {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(obj['nodes']['seeds'][$1]['envPath'])"
}

# sentries
function getSentriesSize {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(len(obj['nodes']['sentries']))"
}

function getSentryValidatorId {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(obj['nodes']['sentries'][$1]['validatorId'])"
}

function getSentryComputerId {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(obj['nodes']['sentries'][$1]['computerId'])"
}

function getSentryEnvPath {
    echo $topology | python3 -c "import json, sys; obj = json.load(sys.stdin); print(obj['nodes']['sentries'][$1]['envPath'])"
}