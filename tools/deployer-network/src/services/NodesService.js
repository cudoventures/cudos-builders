const Log = require('../utilities/LogHelper');

class NodesService {

    constructor(topologyHelper, instancesService) {
        this.topologyHelper = topologyHelper;
        this.instancesService = instancesService;

        this.genPorts = 60000;

        this.nodeIdToNodeInstanceContainerNamesMap = new Map();

        this.genesisJson = '';
        this.faucetAddress = '';
        this.nodeIdTotendermintNodeId = new Map();
    }

    async start() {
        await this.initAndStartRootValidator();
        await this.initAndStartRootValidatorSeedNodes();
        await this.initAndStartRootValidatorSentryNodes();
    }

    async initAndStartRootValidator() {
        Log.main('Init and start root validator');
        
        const validatorNodeModel = this.topologyHelper.rootValidator;
        const validatorComputerModel = this.topologyHelper.getComputerModel(validatorNodeModel.computerId);
        const validatorSshHelper = this.instancesService.getSshHelper(validatorNodeModel.computerId);
        
        const port26656 = validatorComputerModel.isLocalDocker === true ? ++this.genPorts : 26656;

        await validatorSshHelper.cloneRepos();
        await validatorSshHelper.prepareBinaryBuilder();
        await validatorSshHelper.exec([
            'cd /usr/cudos/CudosBuilders/docker/root-node',
            'cp ./root-node.env.example ./root-node.local.env',
            'sed -i "s/MONIKER=/MONIKER=\"deployer-network-root-validagtor\"/g" ./root-node.local.env',
            'sed -i "s/CHAIN_ID=/CHAIN_ID=\"cudos-deployer-network\"/g" ./root-node.local.env',
            `sed -i "s/ORCH_ETH_ADDRESS=/ORCH_ETH_ADDRESS=\"${validatorNodeModel.orchEthAddress}\"/g" ./root-node.local.env`,
            `sed -i "s/PORT26656=60101/PORT26656=\"${port26656}\"/g" ./root-node.local.arg`,
            'cp ./users-root-node.override.yml.example ./users-root-node.override.yml',
            'docker-compose --env-file ./root-node.local.arg -f ./init-root-node.yml -f ./users-root-node.override.yml -p cudos-init-root-node up --build',
            'docker-compose --env-file ./root-node.local.arg -f ./init-root-node.yml -f ./users-root-node.override.yml -p cudos-init-root-node down',
            'docker-compose --env-file ./root-node.local.arg -f ./start-root-node.yml -f ./users-root-node.override.yml -p cudos-start-root-node up --build -d'
        ]);

        const dockerContainerStartName = 'cudos-start-root-node';
        this.nodeIdToNodeInstanceContainerNamesMap.set(validatorNodeModel.nodeId, dockerContainerStartName);

        await validatorSshHelper.awaitForNode(dockerContainerStartName);

        const tendermintNodeId = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded tendermint show-node-id"`, false);
        this.nodeIdTotendermintNodeId.set(validatorNodeModel.nodeId, tendermintNodeId);

        this.faucetAddress = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "echo 123123123 | cudos-noded keys show faucet -a --keyring-backend os"`, false);
        this.genesisJson = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cat /usr/cudos/cudos-data/config/genesis.json"`, false);
    }

    async initAndStartRootValidatorSeedNodes() {
        Log.main('Init and start root validator\'s seeds');

        const validatorNodeModel = this.topologyHelper.rootValidator;
        const seedNodeModels = this.topologyHelper.getSeeds(validatorNodeModel.validatorId);

        const validatorTendermintId = this.nodeIdTotendermintNodeId.get(validatorNodeModel.nodeId);
        const validatorComputerModel = this.topologyHelper.getComputerModel(validatorNodeModel.computerId);
        const validatorHost = validatorComputerModel.isLocalDocker === true ? this.nodeIdToNodeInstanceContainerNamesMap.get(validatorNodeModel.nodeId) : validatorComputerModel.ip;

        for (let i = 0;  i < seedNodeModels.length;  ++i) {
            const seedNodeModel = seedNodeModels[i];
            const seedComputerModel = this.topologyHelper.getComputerModel(seedNodeModel.computerId);
            const seedSshHelper = this.instancesService.getSshHelper(seedNodeModel.computerId);

            const dockerContainerInitName = `cudos-init-seed-node-${validatorNodeModel.validatorId}-${i + 1}`;
            const dockerContainerStartName = `cudos-start-seed-node-${validatorNodeModel.validatorId}-${i + 1}`;
            const port26656 = seedComputerModel.isLocalDocker === true ? ++this.genPorts : 26656;
            const port26657 = seedComputerModel.isLocalDocker === true ? ++this.genPorts : 26657;

            await seedSshHelper.cloneRepos();
            await seedSshHelper.prepareBinaryBuilder();
            await seedSshHelper.exec([
                'cd /usr/cudos/CudosBuilders/docker/seed-node',
                'cp ./seed-node.env.example ./seed-node.local01.env',
                `sed -i "s/MONIKER=<TYPE DOWN NODE NAME>/MONIKER=\"deployer-network-seed-node-${i + 1}\"/g" ./seed-node.local01.env`,
                `sed -i "s/PERSISTENT_PEERS=/PERSISTENT_PEERS=\"${validatorTendermintId}@${validatorHost}:26656\"/g" ./seed-node.local01.env`,
                `sed -i "s/PRIVATE_PEERS=/PRIVATE_PEERS=\"${validatorTendermintId}\"/g" ./seed-node.local01.env`,
                `sed -i "s/SHOULD_USE_GLOBAL_PEERS=true/SHOULD_USE_GLOBAL_PEERS=\"false\"/g" ./seed-node.local01.env`,
                `sed -i "s/INIT_CONTAINER_NAME=cudos-init-seed-node-01/INIT_CONTAINER_NAME=\"${dockerContainerInitName}\"/g" ./seed-node.local01.arg`,
                `sed -i "s/START_CONTAINER_NAME=cudos-start-seed-node-01/START_CONTAINER_NAME=\"${dockerContainerStartName}\"/g" ./seed-node.local01.arg`,
                `sed -i "s/PORT26656=60201/PORT26656=\"${port26656}\"/g" ./seed-node.local01.arg`,
                `sed -i "s/PORT26657=60202/PORT26657=\"${port26657}\"/g" ./seed-node.local01.arg`,
                `echo \'${this.genesisJson.replace(/(\r\n|\n|\r)/gm, "")}\' >> /usr/cudos/CudosBuilders/docker/config/genesis.local.json`,
                `echo "" >> /usr/cudos/CudosBuilders/docker/config/persistent-peers.local.config`,
                `echo "" >> /usr/cudos/CudosBuilders/docker/config/seeds.local.config`,
                'cp ./users-seed-node.override.yml.example ./users-seed-node.override.yml',
                `docker-compose --env-file ./seed-node.local01.arg -f ./init-seed-node.yml -f ./users-seed-node.override.yml -p ${dockerContainerInitName} up --build`,
                `docker-compose --env-file ./seed-node.local01.arg -f ./init-seed-node.yml -f ./users-seed-node.override.yml -p ${dockerContainerInitName} down`,
                `docker-compose --env-file ./seed-node.local01.arg -f ./start-seed-node.yml -f ./users-seed-node.override.yml -p ${dockerContainerStartName} up --build -d`
            ]);

            this.nodeIdToNodeInstanceContainerNamesMap.set(seedNodeModel.nodeId, dockerContainerStartName);

            await seedSshHelper.awaitForNode(dockerContainerStartName);

            const tendermintNodeId = await seedSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded tendermint show-node-id"`, false);
            this.nodeIdTotendermintNodeId.set(seedNodeModel.nodeId, tendermintNodeId);
        }
    }

    async initAndStartRootValidatorSentryNodes() {
        Log.main('Init and start root validator\'s sentries');

        const validatorNodeModel = this.topologyHelper.rootValidator;
        const sentryNodeModels = this.topologyHelper.getSentries(validatorNodeModel.validatorId);

        const validatorTendermintId = this.nodeIdTotendermintNodeId.get(validatorNodeModel.nodeId);
        const validatorComputerModel = this.topologyHelper.getComputerModel(validatorNodeModel.computerId);
        const validatorHost = validatorComputerModel.isLocalDocker === true ? this.nodeIdToNodeInstanceContainerNamesMap.get(validatorNodeModel.nodeId) : validatorComputerModel.ip;

        const seedNodeModels = this.topologyHelper.getSeeds(validatorNodeModel.validatorId);
        const seeds = seedNodeModels.map((seedNodeModel) => {
            const seedTendermintNodeId = this.nodeIdTotendermintNodeId.get(seedNodeModel.nodeId);
            const seedComputerModel = this.topologyHelper.getComputerModel(seedNodeModel.computerId);
            const seedHost = seedComputerModel.isLocalDocker === true ? this.nodeIdToNodeInstanceContainerNamesMap.get(seedNodeModel.nodeId) : seedComputerModel.ip;
            return `${seedTendermintNodeId}@${seedHost}:26656`;
        }).join(',');

        for (let i = 0;  i < sentryNodeModels.length;  ++i) {
            const sentryNodeModel = sentryNodeModels[i];
            const sentryComputerModel = this.topologyHelper.getComputerModel(sentryNodeModel.computerId);
            const sentrySshHelper = this.instancesService.getSshHelper(sentryNodeModel.computerId);

            const dockerContainerInitName = `cudos-init-sentry-node-${validatorNodeModel.validatorId}-${i + 1}`;
            const dockerContainerStartName = `cudos-start-sentry-node-${validatorNodeModel.validatorId}-${i + 1}`;
            const port26656 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 26656;
            const port26657 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 26657;
            const port1317 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 1317;
            const port9090 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 9090;

            await sentrySshHelper.cloneRepos();
            await sentrySshHelper.prepareBinaryBuilder();
            await sentrySshHelper.exec([
                'cd /usr/cudos/CudosBuilders/docker/sentry-node',
                'cp ./sentry-node.env.example ./sentry-node.local01.env',
                `sed -i "s/MONIKER=<TYPE DOWN NODE NAME>/MONIKER=\"deployer-network-sentry-node-${i + 1}\"/g" ./sentry-node.local01.env`,
                `sed -i "s/PERSISTENT_PEERS=/PERSISTENT_PEERS=\"${validatorTendermintId}@${validatorHost}:26656\"/g" ./sentry-node.local01.env`,
                `sed -i "s/SEEDS=/SEEDS=\"${seeds}\"/g" ./sentry-node.local01.env`,
                `sed -i "s/PRIVATE_PEERS=/PRIVATE_PEERS=\"${validatorTendermintId}\"/g" ./sentry-node.local01.env`,
                `sed -i "s/SHOULD_USE_GLOBAL_PEERS=true/SHOULD_USE_GLOBAL_PEERS=\"false\"/g" ./sentry-node.local01.env`,
                `sed -i "s/INIT_CONTAINER_NAME=cudos-init-sentry-node-01/INIT_CONTAINER_NAME=\"${dockerContainerInitName}\"/g" ./sentry-node.local01.arg`,
                `sed -i "s/START_CONTAINER_NAME=cudos-start-sentry-node-01/START_CONTAINER_NAME=\"${dockerContainerStartName}\"/g" ./sentry-node.local01.arg`,
                `sed -i "s/PORT26656=26656/PORT26656=\"${port26656}\"/g" ./sentry-node.local01.arg`,
                `sed -i "s/PORT26657=26657/PORT26657=\"${port26657}\"/g" ./sentry-node.local01.arg`,
                `sed -i "s/PORT1317=1317/PORT1317=\"${port1317}\"/g" ./sentry-node.local01.arg`,
                `sed -i "s/PORT9090=9090/PORT9090=\"${port9090}\"/g" ./sentry-node.local01.arg`,
                `echo \'${this.genesisJson.replace(/(\r\n|\n|\r)/gm, "")}\' >> /usr/cudos/CudosBuilders/docker/config/genesis.local.json`,
                `echo "" >> /usr/cudos/CudosBuilders/docker/config/persistent-peers.local.config`,
                `echo "" >> /usr/cudos/CudosBuilders/docker/config/seeds.local.config`,
                'cp ./users-sentry-node.override.yml.example ./users-sentry-node.override.yml',
                `docker-compose --env-file ./sentry-node.local01.arg -f ./init-sentry-node.yml -f ./users-sentry-node.override.yml -p ${dockerContainerInitName} up --build`,
                `docker-compose --env-file ./sentry-node.local01.arg -f ./init-sentry-node.yml -f ./users-sentry-node.override.yml -p ${dockerContainerInitName} down`,
                `docker-compose --env-file ./sentry-node.local01.arg -f ./start-sentry-node.yml -f ./users-sentry-node.override.yml -p ${dockerContainerStartName} up --build -d`
            ]);

            this.nodeIdToNodeInstanceContainerNamesMap.set(sentryNodeModel.nodeId, dockerContainerStartName);

            await sentrySshHelper.awaitForNode(dockerContainerStartName);

            const tendermintNodeId = await sentrySshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded tendermint show-node-id"`, false);
            this.nodeIdTotendermintNodeId.set(sentryNodeModel.nodeId, tendermintNodeId);
        }
    }

    async initValidator() {

    }

    async configAndStartValidator() {
        
    }

    async initAndStartValidatorSeedNode() {

    }

    async initAndStartValidatorSentryNode() {

    }

    onExit = async () => {
        await this.stopNodesInstances();        
    }

    async stopNodesInstances() {
        Log.main('Stop nodes\' instances');

        const entries = this.nodeIdToNodeInstanceContainerNamesMap.entries();
        for (;;) {
            let entry = entries.next();
            if (entry.done === true) {
                break;
            }

            const nodeId = entry.value[0];
            const containerName = entry.value[1];
            const computerId = this.topologyHelper.getNodeModel(nodeId).computerId;
            const sshHelper = this.instancesService.getSshHelper(computerId);
            Log.main(`Stop ${containerName} for ${computerId}`);
            await sshHelper.exec(`docker stop ${containerName}`, false);
        }
    }

}

module.exports = NodesService;