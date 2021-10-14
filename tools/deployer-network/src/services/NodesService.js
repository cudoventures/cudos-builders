const ValidatorNodeModel = require('../models/ValidatorNodeModel');
const Log = require('../utilities/LogHelper');
const NodesHelper = require('../utilities/NodesHelper');
const PathHelper = require('../utilities/PathHelper');

const CHAIN_ID = 'cudos-local-network';

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
        await this.initValidators();
        await this.initAndStartValidatorsSeedNode();
        await this.initAndStartValidatorsSentryNode();
        await this.configAndStartValidators();
    }

    async initAndStartRootValidator() {
        Log.main('Init and start root validator');
        
        const validatorNodeModel = this.topologyHelper.rootValidator;
        const validatorComputerModel = this.topologyHelper.getComputerModel(validatorNodeModel.computerId);
        const validatorSshHelper = this.instancesService.getSshHelper(validatorNodeModel.computerId);
        
        const port26656 = validatorComputerModel.isLocalDocker === true ? ++this.genPorts : 26656;

        if (validatorComputerModel.isLocalDocker === false) {
            await validatorSshHelper.cloneRepos();
        }
        await validatorSshHelper.prepareBinaryBuilder();
        await validatorSshHelper.exec([
            ...NodesHelper.getUserEnv(),
            `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/root-node`,
            'cp ./root-node.env.example ./root-node.local.env',
            'sed -i "s/MONIKER=/MONIKER=\"deployer-network-root-validator\"/g" ./root-node.local.env',
            `sed -i "s/CHAIN_ID=/CHAIN_ID=\"${CHAIN_ID}"/g" ./root-node.local.env`,
            `sed -i "s/ORCH_ETH_ADDRESS=/ORCH_ETH_ADDRESS=\"${validatorNodeModel.orchEthAddress}\"/g" ./root-node.local.env`,
            `sed -i "s/PORT26656=60101/PORT26656=\"${port26656}\"/g" ./root-node.local.arg`,
            ...NodesHelper.getUserOverrideYml('root-node'),
            'docker-compose --env-file ./root-node.local.arg -f ./init-root-node.yml -f ./users-root-node.override.yml -p cudos-init-root-node up --build',
            'docker-compose --env-file ./root-node.local.arg -f ./init-root-node.yml -f ./users-root-node.override.yml -p cudos-init-root-node down',
            `docker-compose --env-file ./root-node.local.arg -f ./start-root-node.yml -f ./users-root-node.override.yml -p ${ValidatorNodeModel.getRootValidatorDockerContainerStartName()} up --build -d`
        ]);

        const dockerContainerStartName = ValidatorNodeModel.getRootValidatorDockerContainerStartName();
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

            const dockerContainerInitName = seedNodeModel.getDockerContainerInitName(validatorNodeModel, i); //`cudos-init-seed-node-${validatorNodeModel.validatorId}-${i + 1}`;
            const dockerContainerStartName = seedNodeModel.getDockerContainerStartName(validatorNodeModel, i); //`cudos-start-seed-node-${validatorNodeModel.validatorId}-${i + 1}`;
            const volumeName = `cudos-data-seed-node-${validatorNodeModel.validatorId}-${i + 1}`;
            const port26656 = seedComputerModel.isLocalDocker === true ? ++this.genPorts : 26656;
            const port26657 = seedComputerModel.isLocalDocker === true ? ++this.genPorts : 26657;

            if (seedComputerModel.isLocalDocker === false) {
                await validatorSshHelper.cloneRepos();
            }
            await seedSshHelper.prepareBinaryBuilder();
            await seedSshHelper.exec([
                ...NodesHelper.getUserEnv(),
                `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/seed-node`,
                'cp ./seed-node.env.example ./seed-node.local01.env',
                `sed -i "s/MONIKER=<TYPE DOWN NODE NAME>/MONIKER=\"deployer-network-seed-node-${seedNodeModel.nodeId}\"/g" ./seed-node.local01.env`,
                `sed -i "s/PERSISTENT_PEERS=/PERSISTENT_PEERS=\"${validatorTendermintId}@${validatorHost}:26656\"/g" ./seed-node.local01.env`,
                `sed -i "s/PRIVATE_PEERS=/PRIVATE_PEERS=\"${validatorTendermintId}\"/g" ./seed-node.local01.env`,
                `sed -i "s/SHOULD_USE_GLOBAL_PEERS=true/SHOULD_USE_GLOBAL_PEERS=\"false\"/g" ./seed-node.local01.env`,
                `sed -i "s/INIT_CONTAINER_NAME=cudos-init-seed-node-01/INIT_CONTAINER_NAME=\"${dockerContainerInitName}\"/g" ./seed-node.local01.arg`,
                `sed -i "s/START_CONTAINER_NAME=cudos-start-seed-node-01/START_CONTAINER_NAME=\"${dockerContainerStartName}\"/g" ./seed-node.local01.arg`,
                `sed -i "s/VOLUME_NAME=cudos-data-seed-node-01/VOLUME_NAME=\"${volumeName}\"/g" ./seed-node.local01.arg`,
                `sed -i "s/PORT26656=60201/PORT26656=\"${port26656}\"/g" ./seed-node.local01.arg`,
                `sed -i "s/PORT26657=60202/PORT26657=\"${port26657}\"/g" ./seed-node.local01.arg`,
                ...NodesHelper.getDockerConfig(this.genesisJson),
                ...NodesHelper.getUserOverrideYml('seed-node'),
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

        const seeds = this.getSeedsByValidatorId(validatorNodeModel.validatorId);

        for (let i = 0;  i < sentryNodeModels.length;  ++i) {
            const sentryNodeModel = sentryNodeModels[i];
            const sentryComputerModel = this.topologyHelper.getComputerModel(sentryNodeModel.computerId);
            const sentrySshHelper = this.instancesService.getSshHelper(sentryNodeModel.computerId);

            const dockerContainerInitName = sentryNodeModel.getDockerContainerInitName(validatorNodeModel, i); // `cudos-init-sentry-node-${validatorNodeModel.validatorId}-${i + 1}`;
            const dockerContainerStartName = sentryNodeModel.getDockerContainerStartName(validatorNodeModel, i); //`cudos-start-sentry-node-${validatorNodeModel.validatorId}-${i + 1}`;
            const volumeName = `cudos-data-sentry-node-${validatorNodeModel.validatorId}-${i + 1}`;
            const port26656 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 26656;
            const port26657 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 26657;
            const port1317 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 1317;
            const port9090 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 9090;

            if (sentryComputerModel.isLocalDocker === false) {
                await validatorSshHelper.cloneRepos();
            }
            await sentrySshHelper.prepareBinaryBuilder();
            await sentrySshHelper.exec([
                ...NodesHelper.getUserEnv(),
                `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/sentry-node`,
                'cp ./sentry-node.env.example ./sentry-node.local01.env',
                `sed -i "s/MONIKER=<TYPE DOWN NODE NAME>/MONIKER=\"deployer-network-sentry-node-${sentryNodeModel.nodeId}\"/g" ./sentry-node.local01.env`,
                `sed -i "s/PERSISTENT_PEERS=/PERSISTENT_PEERS=\"${validatorTendermintId}@${validatorHost}:26656\"/g" ./sentry-node.local01.env`,
                `sed -i "s/SEEDS=/SEEDS=\"${seeds}\"/g" ./sentry-node.local01.env`,
                `sed -i "s/PRIVATE_PEERS=/PRIVATE_PEERS=\"${validatorTendermintId}\"/g" ./sentry-node.local01.env`,
                `sed -i "s/SHOULD_USE_GLOBAL_PEERS=true/SHOULD_USE_GLOBAL_PEERS=\"false\"/g" ./sentry-node.local01.env`,
                `sed -i "s/INIT_CONTAINER_NAME=cudos-init-sentry-node-01/INIT_CONTAINER_NAME=\"${dockerContainerInitName}\"/g" ./sentry-node.local01.arg`,
                `sed -i "s/START_CONTAINER_NAME=cudos-start-sentry-node-01/START_CONTAINER_NAME=\"${dockerContainerStartName}\"/g" ./sentry-node.local01.arg`,
                `sed -i "s/VOLUME_NAME=cudos-data-sentry-node-01/VOLUME_NAME=\"${volumeName}\"/g" ./sentry-node.local01.arg`,
                `sed -i "s/PORT26656=26656/PORT26656=\"${port26656}\"/g" ./sentry-node.local01.arg`,
                `sed -i "s/PORT26657=26657/PORT26657=\"${port26657}\"/g" ./sentry-node.local01.arg`,
                `sed -i "s/PORT1317=1317/PORT1317=\"${port1317}\"/g" ./sentry-node.local01.arg`,
                `sed -i "s/PORT9090=9090/PORT9090=\"${port9090}\"/g" ./sentry-node.local01.arg`,
                ...NodesHelper.getDockerConfig(this.genesisJson),
                ...NodesHelper.getUserOverrideYml('sentry-node'),
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

    async initValidators() {
        Log.main('Init validators');

        const validatorNodeModels = this.topologyHelper.validators;

        for (let i = 0;  i < validatorNodeModels.length;  ++i) {
            const validatorNodeModel = validatorNodeModels[i];
            const validatorComputerModel = this.topologyHelper.getComputerModel(validatorNodeModel.computerId);
            const validatorSshHelper = this.instancesService.getSshHelper(validatorNodeModel.computerId);

            const dockerContainerInitName = validatorNodeModel.getDockerContainerInitName(i); // `cudos-init-full-node-${validatorNodeModel.validatorId}-${i + 1}`;
            const dockerContainerConfigName = validatorNodeModel.getDockerContainerConfigName(i); // `cudos-config-full-node-${validatorNodeModel.validatorId}-${i + 1}`;
            const dockerContainerStartName = validatorNodeModel.getDockerContainerStartName(i); // `cudos-start-full-node-${validatorNodeModel.validatorId}-${i + 1}`;
            const volumeName = `cudos-data-full-node-${validatorNodeModel.validatorId}-${i + 1}`;
            const port26656 = validatorComputerModel.isLocalDocker === true ? ++this.genPorts : 26656;

            if (validatorComputerModel.isLocalDocker === false) {
                await validatorSshHelper.cloneRepos();
            }
            await validatorSshHelper.prepareBinaryBuilder();
            await validatorSshHelper.exec([
                ...NodesHelper.getUserEnv(),
                `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/full-node`,
                'cp ./full-node.env.example ./full-node.client.local01.env',
                `sed -i "s/MONIKER=<TYPE DOWN NODE NAME>/MONIKER=\"deployer-network-full-node-${validatorNodeModel.nodeId}\"/g" ./full-node.client.local01.env`,
                `sed -i "s/INIT_CONTAINER_NAME=cudos-init-full-node-client-local-01/INIT_CONTAINER_NAME=\"${dockerContainerInitName}\"/g" ./full-node.client.local01.arg`,
                `sed -i "s/CONFIG_CONTAINER_NAME=cudos-config-full-node-client-local-01/CONFIG_CONTAINER_NAME=\"${dockerContainerConfigName}\"/g" ./full-node.client.local01.arg`,
                `sed -i "s/START_CONTAINER_NAME=cudos-start-full-node-client-local-01/START_CONTAINER_NAME=\"${dockerContainerStartName}\"/g" ./full-node.client.local01.arg`,
                `sed -i "s/VOLUME_NAME=cudos-data-full-node-client-local-01/VOLUME_NAME=\"${volumeName}\"/g" ./full-node.client.local01.arg`,
                `sed -i "s/PORT26656=60401/PORT26656=\"${port26656}\"/g" ./full-node.client.local01.arg`,
                `sed -i "s/init-full-node.sh\\"]/init-full-node.sh \\&\\& sleep infinity\\"]/g" ./init-full-node.dockerfile`,
                ...NodesHelper.getDockerConfig(this.genesisJson),
                ...NodesHelper.getUserOverrideYml('full-node'),
                `docker-compose --env-file ./full-node.client.local01.arg -f ./init-full-node.yml -f ./users-full-node.override.yml -p ${dockerContainerInitName} up --build -d`,
            ]);

            const tendermintNodeId = await validatorSshHelper.exec(`docker container exec ${dockerContainerInitName} /bin/bash -c "cudos-noded tendermint show-node-id"`, false);
            this.nodeIdTotendermintNodeId.set(validatorNodeModel.nodeId, tendermintNodeId);

            await validatorSshHelper.exec([
                `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/full-node`,
                `docker-compose --env-file ./full-node.client.local01.arg -f ./init-full-node.yml -f ./users-full-node.override.yml -p ${dockerContainerInitName} down`,
            ]);
        }
    }

    async initAndStartValidatorsSeedNode() {
        Log.main('Init validators\'s seeds');

        const validatorNodeModels = this.topologyHelper.validators;

        const sentries = this.getSentriesByValidatorId(this.topologyHelper.rootValidator.validatorId);

        for (let j = 0;  j < validatorNodeModels.length;  ++j) {
            const validatorNodeModel = validatorNodeModels[j];
            const validatorTendermintId = this.nodeIdTotendermintNodeId.get(validatorNodeModel.nodeId);

            const seedNodeModels = this.topologyHelper.getSeeds(validatorNodeModel.validatorId);
            for (let i = 0;  i < seedNodeModels.length;  ++i) {
                const seedNodeModel = seedNodeModels[i];
                const seedComputerModel = this.topologyHelper.getComputerModel(seedNodeModel.computerId);
                const seedSshHelper = this.instancesService.getSshHelper(seedNodeModel.computerId);

                const dockerContainerInitName = seedNodeModel.getDockerContainerInitName(validatorNodeModel, i); // `cudos-init-seed-node-${validatorNodeModel.validatorId}-${i + 1}`;
                const dockerContainerStartName = seedNodeModel.getDockerContainerStartName(validatorNodeModel, i); // `cudos-start-seed-node-${validatorNodeModel.validatorId}-${i + 1}`;
                const volumeName = `cudos-data-seed-node-${validatorNodeModel.validatorId}-${i + 1}`;
                const port26656 = seedComputerModel.isLocalDocker === true ? ++this.genPorts : 26656;
                const port26657 = seedComputerModel.isLocalDocker === true ? ++this.genPorts : 26657;

                if (seedComputerModel.isLocalDocker === false) {
                    await validatorSshHelper.cloneRepos();
                }
                await seedSshHelper.prepareBinaryBuilder();
                await seedSshHelper.exec([
                    ...NodesHelper.getUserEnv(),
                    `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/seed-node`,
                    'cp ./seed-node.env.example ./seed-node.local01.env',
                    `sed -i "s/MONIKER=<TYPE DOWN NODE NAME>/MONIKER=\"deployer-network-seed-node-${seedNodeModel.nodeId}\"/g" ./seed-node.local01.env`,
                    `sed -i "s/PERSISTENT_PEERS=/PERSISTENT_PEERS=\"${sentries}\"/g" ./seed-node.local01.env`,
                    `sed -i "s/PRIVATE_PEERS=/PRIVATE_PEERS=\"${validatorTendermintId}\"/g" ./seed-node.local01.env`,
                    `sed -i "s/SHOULD_USE_GLOBAL_PEERS=true/SHOULD_USE_GLOBAL_PEERS=\"false\"/g" ./seed-node.local01.env`,
                    `sed -i "s/INIT_CONTAINER_NAME=cudos-init-seed-node-01/INIT_CONTAINER_NAME=\"${dockerContainerInitName}\"/g" ./seed-node.local01.arg`,
                    `sed -i "s/START_CONTAINER_NAME=cudos-start-seed-node-01/START_CONTAINER_NAME=\"${dockerContainerStartName}\"/g" ./seed-node.local01.arg`,
                    `sed -i "s/VOLUME_NAME=cudos-data-seed-node-01/VOLUME_NAME=\"${volumeName}\"/g" ./seed-node.local01.arg`,
                    `sed -i "s/PORT26656=60201/PORT26656=\"${port26656}\"/g" ./seed-node.local01.arg`,
                    `sed -i "s/PORT26657=60202/PORT26657=\"${port26657}\"/g" ./seed-node.local01.arg`,
                    ...NodesHelper.getDockerConfig(this.genesisJson),
                    ...NodesHelper.getUserOverrideYml('seed-node'),
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
    }

    async initAndStartValidatorsSentryNode() {
        Log.main('Init validators\'s sentries');

        const validatorNodeModels = this.topologyHelper.validators;
        
        for (let j = 0;  j < validatorNodeModels.length;  ++j) {
            const validatorNodeModel = validatorNodeModels[j];
            const validatorTendermintId = this.nodeIdTotendermintNodeId.get(validatorNodeModel.nodeId);

            const seeds = this.getSeedsByValidatorId(validatorNodeModel.validatorId);

            const sentryNodeModels = this.topologyHelper.getSentries(validatorNodeModel.validatorId);
            for (let i = 0;  i < sentryNodeModels.length;  ++i) {
                const sentryNodeModel = sentryNodeModels[i];
                const sentryComputerModel = this.topologyHelper.getComputerModel(sentryNodeModel.computerId);
                const sentrySshHelper = this.instancesService.getSshHelper(sentryNodeModel.computerId);
    
                const dockerContainerInitName = sentryNodeModel.getDockerContainerInitName(validatorNodeModel, i); // `cudos-init-sentry-node-${validatorNodeModel.validatorId}-${i + 1}`;
                const dockerContainerStartName = sentryNodeModel.getDockerContainerStartName(validatorNodeModel, i); //`cudos-start-sentry-node-${validatorNodeModel.validatorId}-${i + 1}`;
                const volumeName = `cudos-data-sentry-node-${validatorNodeModel.validatorId}-${i + 1}`;
                const port26656 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 26656;
                const port26657 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 26657;
                const port1317 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 1317;
                const port9090 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 9090;
    
                if (sentryComputerModel.isLocalDocker === false) {
                    await validatorSshHelper.cloneRepos();
                }
                await sentrySshHelper.prepareBinaryBuilder();
                await sentrySshHelper.exec([
                    ...NodesHelper.getUserEnv(),
                    `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/sentry-node`,
                    'cp ./sentry-node.env.example ./sentry-node.local01.env',
                    `sed -i "s/MONIKER=<TYPE DOWN NODE NAME>/MONIKER=\"deployer-network-sentry-node-${sentryNodeModel.nodeId}\"/g" ./sentry-node.local01.env`,
                    `sed -i "s/SEEDS=/SEEDS=\"${seeds}\"/g" ./sentry-node.local01.env`,
                    `sed -i "s/PRIVATE_PEERS=/PRIVATE_PEERS=\"${validatorTendermintId}\"/g" ./sentry-node.local01.env`,
                    `sed -i "s/SHOULD_USE_GLOBAL_PEERS=true/SHOULD_USE_GLOBAL_PEERS=\"false\"/g" ./sentry-node.local01.env`,
                    `sed -i "s/INIT_CONTAINER_NAME=cudos-init-sentry-node-01/INIT_CONTAINER_NAME=\"${dockerContainerInitName}\"/g" ./sentry-node.local01.arg`,
                    `sed -i "s/START_CONTAINER_NAME=cudos-start-sentry-node-01/START_CONTAINER_NAME=\"${dockerContainerStartName}\"/g" ./sentry-node.local01.arg`,
                    `sed -i "s/VOLUME_NAME=cudos-data-sentry-node-01/VOLUME_NAME=\"${volumeName}\"/g" ./sentry-node.local01.arg`,
                    `sed -i "s/PORT26656=26656/PORT26656=\"${port26656}\"/g" ./sentry-node.local01.arg`,
                    `sed -i "s/PORT26657=26657/PORT26657=\"${port26657}\"/g" ./sentry-node.local01.arg`,
                    `sed -i "s/PORT1317=1317/PORT1317=\"${port1317}\"/g" ./sentry-node.local01.arg`,
                    `sed -i "s/PORT9090=9090/PORT9090=\"${port9090}\"/g" ./sentry-node.local01.arg`,
                    ...NodesHelper.getDockerConfig(this.genesisJson),
                    ...NodesHelper.getUserOverrideYml('sentry-node'),
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
    }

    async configAndStartValidators() {
        Log.main('Config and start validators');

        const validatorNodeModels = this.topologyHelper.validators;

        for (let i = 0;  i < validatorNodeModels.length;  ++i) {
            const validatorNodeModel = validatorNodeModels[i];
            const validatorSshHelper = this.instancesService.getSshHelper(validatorNodeModel.computerId);

            const dockerContainerConfigName = validatorNodeModel.getDockerContainerConfigName(i); // `cudos-config-full-node-${validatorNodeModel.validatorId}-${i + 1}`;
            const dockerContainerStartName = validatorNodeModel.getDockerContainerStartName(i); // `cudos-start-full-node-${validatorNodeModel.validatorId}-${i + 1}`;

            const seeds = this.getSeedsByValidatorId(validatorNodeModel.validatorId);
            const sentries = this.getSentriesByValidatorId(validatorNodeModel.validatorId);

            await validatorSshHelper.exec([
                `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/full-node`,
                `sed -i "s/PERSISTENT_PEERS=/PERSISTENT_PEERS=\"${seeds},${sentries}\"/g" ./full-node.client.local01.env`,
                `docker-compose --env-file ./full-node.client.local01.arg -f ./config-full-node.yml -f ./users-full-node.override.yml -p ${dockerContainerConfigName} up --build`,
                `docker-compose --env-file ./full-node.client.local01.arg -f ./start-full-node.yml -f ./users-full-node.override.yml -p ${dockerContainerStartName} up --build -d`
            ]);

            this.nodeIdToNodeInstanceContainerNamesMap.set(validatorNodeModel.nodeId, dockerContainerStartName);

            await validatorSshHelper.awaitForNode(dockerContainerStartName);

            const tendermintNodeId = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded tendermint show-node-id"`, false);
            this.nodeIdTotendermintNodeId.set(validatorNodeModel.nodeId, tendermintNodeId);

            await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded keys add validator --keyring-backend test"`, false);
            const validatorWalletAddress = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded keys show validator -a --keyring-backend test"`, false);
            await this.fundFromFaucet(validatorWalletAddress, '1000001000000000000000000acudos');
            const tendermintValidatorAddress = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded tendermint show-validator"`, false);
            await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c 'cudos-noded tx staking create-validator --amount=1000000000000000000000000acudos \\
                                                --from=validator \\
                                                --pubkey="${tendermintValidatorAddress.replace(/"/g, '\\"')}" \\
                                                --moniker=$MONIKER \\
                                                --chain-id=${CHAIN_ID} \\
                                                --commission-rate="0.10" \\
                                                --commission-max-rate="0.20" \\
                                                --commission-max-change-rate="0.01" \\
                                                --min-self-delegation="1" \\
                                                --gas="auto" \\
                                                --gas-prices="0.025acudos" \\
                                                --gas-adjustment="1.80" \\
                                                --keyring-backend="test" \\
                                                -y'`, false);
        }
    }

    getSeedsByValidatorId(validatorId) {
        const seedNodeModels = this.topologyHelper.getSeeds(validatorId);
        return seedNodeModels.map((seedNodeModel) => {
            const seedTendermintNodeId = this.nodeIdTotendermintNodeId.get(seedNodeModel.nodeId);
            const seedComputerModel = this.topologyHelper.getComputerModel(seedNodeModel.computerId);
            const seedHost = seedComputerModel.isLocalDocker === true ? this.nodeIdToNodeInstanceContainerNamesMap.get(seedNodeModel.nodeId) : seedComputerModel.ip;
            return `${seedTendermintNodeId}@${seedHost}:26656`;
        }).join(',');
    }

    getSentriesByValidatorId(validatorId) {
        const sentryNodeModels = this.topologyHelper.getSentries(validatorId);
        return sentryNodeModels.map((sentryNodeModel) => {
            const sentryTendermintNodeId = this.nodeIdTotendermintNodeId.get(sentryNodeModel.nodeId);
            const sentryComputerModel = this.topologyHelper.getComputerModel(sentryNodeModel.computerId);
            const sentryHost = sentryComputerModel.isLocalDocker === true ? this.nodeIdToNodeInstanceContainerNamesMap.get(sentryNodeModel.nodeId) : sentryComputerModel.ip;
            return `${sentryTendermintNodeId}@${sentryHost}:26656`;
        }).join(',');
    }

    async fundFromFaucet(recipientWalletAddress, amount) {
        const rootValidatorSshHelper = this.instancesService.getSshHelper(this.topologyHelper.rootValidator.computerId);
        await rootValidatorSshHelper.exec(`docker container exec ${ValidatorNodeModel.getRootValidatorDockerContainerStartName()} /bin/bash -c "echo 123123123 | cudos-noded tx bank send ${this.faucetAddress} ${recipientWalletAddress} ${amount} --from faucet --keyring-backend os --chain-id ${CHAIN_ID} -y"`, false)
    }

    onExit = async () => {
        await this.stopNodesInstances();        
    }

    async stopNodesInstances() {
        Log.main('Stop nodes\' instances');

        const tasks = [];
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
            tasks.push(sshHelper.exec([
                `docker stop ${containerName}`,
                `docker container rm ${containerName}`
            ], false));
        }

        await Promise.all(tasks);
    }

}

module.exports = NodesService;