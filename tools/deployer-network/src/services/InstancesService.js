const path = require('path');
const BashHelper = require('../utilities/BashHelper');
const Log = require('../utilities/LogHelper');
const SoftwareHelper = require('../utilities/SoftwareHelper');
const SshHelper = require('../utilities/SshHelper');

class InstancesService {

    constructor(topologyHelper) {
        this.topologyHelper = topologyHelper;
        this.createdInstancesMap = new Map();
        this.sshHelpersMap = new Map();
    }

    async createMissingInstances() {
        Log.main('Create missing instances');

        const bashHelper = new BashHelper();

        for (let i = 0;  i < this.topologyHelper.computers.length;  ++i) {
            const computer = this.topologyHelper.computers[i];
            if (computer.isLocalDocker === false) {
                continue;
            }

            const containerName = `cudos-deployer-network-node-${i + 1}`;
            const projectName = containerName;
            const sshPort = 65000 + i;

            Log.main(`Create ${containerName} for ${computer.id}`);
            await bashHelper.execute([
                `export CONTAINER_NAME="${containerName}"`,
                `export SSH_PORT="${sshPort}"`,
                `export DOCKER_GROUP_ID=$(getent group docker | awk -F: '{printf "%d", $3}')`,
                `cd ${path.join(__dirname, '..', '..', 'config')}`,
                `docker-compose -f ./node.yml -p ${projectName} up --build -d`
            ]);

            this.createdInstancesMap.set(computer.id, containerName);
            computer.user = 'cudos';
            computer.pass = 'cudos';
            computer.ip = 'host.docker.internal'
            computer.port = sshPort;
        }
    }

    async connectToInstances() {
        for (let i = 0;  i < this.topologyHelper.computers.length;  ++i) {
            const computer = this.topologyHelper.computers[i];
            const sshHelper = new SshHelper(computer);
            this.sshHelpersMap.set(computer.id, sshHelper);
            await sshHelper.connect();
        }
    }

    async validateSoftwareRequirements() {
        for (let i = 0;  i < this.topologyHelper.computers.length;  ++i) {
            const computer = this.topologyHelper.computers[i];
            const sshHelper = this.sshHelpersMap.get(computer.id);
            const softwareHelper = new SoftwareHelper(sshHelper);
            await softwareHelper.validateSoftwareRequirements();
        }
    }

    onExit = async () => {
        await this.disconnectFromInstances();
        await this.stopCreatedInstances();
    }

    async stopCreatedInstances() {
        Log.main('Stop created instances');

        const bashHelper = new BashHelper(false);

        for (let i = 0;  i < this.topologyHelper.computers.length;  ++i) {
            const computer = this.topologyHelper.computers[i];
            const containerName = this.createdInstancesMap.get(computer.id);
            if (containerName === undefined) {
                continue;
            }

            Log.main(`Stop ${containerName} for ${computer.id}`);
            await bashHelper.execute([
                `docker stop ${containerName}`
            ]); 
        }
    }

    async disconnectFromInstances() {
        Log.main('Disconnect SSH');
        for (let i = 0;  i < this.topologyHelper.computers.length;  ++i) {
            const computer = this.topologyHelper.computers[i];
            const sshHelper = this.sshHelpersMap.get(computer.id);
            try {
                await sshHelper.disconnect();
            } catch (ex) {
            }
        }
    }

    getSshHelper(computerId) {
        const sshHelper = this.sshHelpersMap.get(computerId);
        if (sshHelper === undefined) {
            throw new Error(`Computer id (${computerId}) not found`);
        }
        return sshHelper;
    }

}

module.exports = InstancesService;