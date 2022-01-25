# TO DO: Process topology
# TO DO: Validate topology
# function a () {
#     echo '{"hostname":"test","domainname":"example.com"}' | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["hostname"]'
# }

topology=$(cat $LAUNCHER_DIR/config/topology.json)

# computers

function getComputersSize {
    echo $topology | python3 -c 'import json, sys; obj = json.load(sys.stdin); print(len(obj["computers"]))'
}

function getComputerIp {
    echo $topology
}

function getComputerPort {
    echo $topology   
}

function getComputerUser {
    echo $topology
}

function getComputerSshKeyPath {
    echo $topology
}

function getComputerPass {
    echo $topology
}

# validators

function getValidatorsSize {
    echo $topology
}

function getValidatorComputerId {
    echo $topology
}

function getValidatorOrchEthAddress {
    echo $topology
}

function getValidatorOrchEthPrivKey {
    echo $topology
}

# seeds

function getSeedsSize {
    echo $topology
}

function getSeedValidatorId {
    echo $topology
}

function getSeedComputerId {
    echo $topology
}

# sentries

function getSentriesSize {
    echo $topology
}

function getSentryValidatorId {
    echo $topology
}

function getSentryComputerId {
    echo $topology
}

RES=$(getComputersSize)
echo $RES