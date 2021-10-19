const PathHelper = require('./PathHelper');

class NodesHelper {

    static getUserEnv() {
        return [
            `export USER_NAME=$(id -u -n)`,
            `export USER_ID=$(id -u)`,
            `export GROUP_NAME=$(id -g -n)`,
            `export GROUP_ID=$(id -g)`,
        ]
    }

    static getUserOverrideYml(nodeName) {
        return [
            `cp ./users-${nodeName}.override.yml.example ./users-${nodeName}.override.yml`,
            `sed -i "s/USER_ID: '0'/USER_ID: '$USER_ID'/g" ./users-${nodeName}.override.yml`,
            `sed -i "s/USER_NAME: 'root'/USER_NAME: '$USER_NAME'/g" ./users-${nodeName}.override.yml`,
            `sed -i "s/GROUP_ID: '0'/GROUP_ID: '$GROUP_ID'/g" ./users-${nodeName}.override.yml`,
            `sed -i "s/GROUP_NAME: 'root'/GROUP_NAME: '$GROUP_NAME'/g" ./users-${nodeName}.override.yml`,
        ]
    }

    static getDockerConfig(genesisJson) {
        return [
            `echo \'${genesisJson.replace(/(\r\n|\n|\r)/gm, "")}\' > ${PathHelper.WORKING_DIR}/CudosBuilders/docker/config/genesis.local.json`,
            `echo "" > ${PathHelper.WORKING_DIR}/CudosBuilders/docker/config/persistent-peers.local.config`,
            `echo "" > ${PathHelper.WORKING_DIR}/CudosBuilders/docker/config/seeds.local.config`,
        ]
    }

    static getDockerExtraHosts(ymlName) {
        return [
            `echo '\r\n    extra_hosts:' >> ./${ymlName}.yml`,
            `echo '      - "host.docker.internal:host-gateway"' >> ./${ymlName}.yml`,
        ]
    }

}

module.exports = NodesHelper;