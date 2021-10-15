const ValidatorNodeModel = require('../models/ValidatorNodeModel');
const WalletModel = require('../models/WalletModel');
const Log = require('../utilities/LogHelper');
const NodesHelper = require('../utilities/NodesHelper');
const PathHelper = require('../utilities/PathHelper');

const CHAIN_ID = 'cudos-local-network';

const GRAVITY_BRIDGE_UI_CONTAINER_NAME = 'cudos-gravity-bridge-ui';
const EXPLORER_CONTAINER_NAME = 'cudos-explorer';
const FAUCET_CONTAINER_NAME = 'cudos-faucet';

class NodesService {

    constructor(topologyHelper, instancesService) {
        this.topologyHelper = topologyHelper;
        this.instancesService = instancesService;

        this.genPorts = 60000;

        this.nodeIdToNodeInstanceContainerNamesMap = new Map();
        this.nodeIdToOrchestratorInstanceContainerNamesMap = new Map();
        this.validatorIdToOrchWalletModelMap = new Map();

        this.nodeIdTotendermintNodeId = new Map();
        this.genesisJson = '';
        this.faucetAddress = '';
        this.gravityContractAddress = '';
        this.sentryNodePort26656 = 0;
        this.sentryNodePort26657 = 0;
        this.sentryNodePort1317 = 0;
        this.sentryNodePort9090 = 0;
    }

    async start(gravity) {
        await this.initAndStartRootValidator();
        await this.initAndStartRootValidatorSeedNodes();
        await this.initAndStartRootValidatorSentryNodes();
        await this.initValidators();
        await this.initAndStartValidatorsSeedNode();
        await this.initAndStartValidatorsSentryNode();
        await this.configAndStartValidators();
        if (gravity === '1') {
            await this.deployGravitySmartContract();
            await this.startOrchestrators();
            await this.startGravityBridgeUi();
        }
    }

    async initAndStartRootValidator() {
        Log.main('Init and start root validator');
        
        const validatorNodeModel = this.topologyHelper.rootValidator;
        const validatorComputerModel = this.topologyHelper.getComputerModel(validatorNodeModel.computerId);
        const validatorSshHelper = this.instancesService.getSshHelper(validatorNodeModel.computerId);
        
        const port26656 = validatorComputerModel.isLocalDocker === true ? ++this.genPorts : 26656;

        if (validatorComputerModel.isLocalDocker === false) {
            await validatorSshHelper.cloneNodeRepos();
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

        const rootOrchWalletString = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cat /usr/cudos/cudos-data/orch-01.wallet"`, false);
        this.validatorIdToOrchWalletModelMap.set(validatorNodeModel.validatorId, WalletModel.instanceByString(rootOrchWalletString));
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
                await validatorSshHelper.cloneNodeRepos();
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

            if (this.sentryNodePort26656 === 0 && port26656 !== 26656) {
                this.sentryNodePort26656 = port26656;
            }
            if (this.sentryNodePort26657 === 0 && port26657 !== 26657) {
                this.sentryNodePort26657 = port26657;
            }
            if (this.sentryNodePort1317 === 0 && port1317 !== 1317) {
                this.sentryNodePort1317 = port1317;
            }
            if (this.sentryNodePort9090 === 0 && port9090 !== 9090) {
                this.sentryNodePort9090 = port9090;
            }

            if (sentryComputerModel.isLocalDocker === false) {
                await validatorSshHelper.cloneNodeRepos();
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
                await validatorSshHelper.cloneNodeRepos();
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
                    await validatorSshHelper.cloneNodeRepos();
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
                    await validatorSshHelper.cloneNodeRepos();
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

            // create validator
            await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded keys add validator --keyring-backend test"`, false);
            const validatorWalletAddress = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded keys show validator -a --keyring-backend test"`, false);
            await this.fundFromFaucet(validatorWalletAddress, '1000001000000000000000000acudos');
            const tendermintValidatorPubKey = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded tendermint show-validator"`, false);
            await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c 'cudos-noded tx staking create-validator --amount=1000000000000000000000000acudos \\
                                                --from=validator \\
                                                --pubkey="${tendermintValidatorPubKey.replace(/"/g, '\\"')}" \\
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

            // create orchestrator
            const validatorOperatorData = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded keys show validator --bech val --keyring-backend test"`, false);
            const validatorOperatorDataLines = validatorOperatorData.split('\n');
            const validatorOperatorDataLineAddress = validatorOperatorDataLines.find((validatorOperatorDataLine) => validatorOperatorDataLine.indexOf('address:') !== -1);
            const validatorOperatorAddress = validatorOperatorDataLineAddress.substring(validatorOperatorDataLineAddress.indexOf(': ') + 2);

            const validatorOrchWalletString = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded keys add orchestrator --keyring-backend test"`, false);
            const validatorOrchWallet = WalletModel.instanceByString(validatorOrchWalletString);
            this.validatorIdToOrchWalletModelMap.set(validatorNodeModel.validatorId, validatorOrchWallet);

            await this.fundFromFaucet(validatorOrchWallet.address, "1000000000000000000000acudos");

            await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded tx gravity set-orchestrator-address ${validatorOperatorAddress} ${validatorOrchWallet.address} ${validatorNodeModel.orchEthAddress} --from validator --keyring-backend test --chain-id ${CHAIN_ID} -y"`, false);
        }
    }

    async deployGravitySmartContract() {
        Log.main('Deploy gravity smart contract');

        const sentryNodeModel = this.topologyHelper.sentries[0];
        const sentrySshHelper = this.instancesService.getSshHelper(sentryNodeModel.computerId);

        await sentrySshHelper.exec([
            `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/gravity-contract-deployer`,
            'cp ./gravity-contract-deployer.env.example ./gravity-contract-deployer.env',
            `sed -i "s~COSMOS_NODE=\\"\\"~COSMOS_NODE=\\"http://${sentryNodeModel.getDockerContainerStartName()}:26657\\"~g" ./gravity-contract-deployer.env`,
            `sed -i "s~ETH_NODE=\\"\\"~ETH_NODE=\\"${this.topologyHelper.params.gravity.ethrpc}\\"~g" ./gravity-contract-deployer.env`,
            `sed -i "s/ETH_PRIV_KEY_HEX=\\"\\"/ETH_PRIV_KEY_HEX=\\"${this.topologyHelper.params.gravity.contractDeploerEthPrivKey}\\"/g" ./gravity-contract-deployer.env`,
        ], false);

        const contractDeployerResult = await sentrySshHelper.exec([
            `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/gravity-contract-deployer`,
            `docker-compose --env-file ./gravity-contract-deployer.arg -f ./gravity-contract-deployer.yml -p cudos-gravity-contract-deployer up --build`
        ]);
        const searchForString = "Gravity deployed at Address";
        const startIndex = contractDeployerResult.indexOf(searchForString);
        for (let i = startIndex + searchForString.length;  i < contractDeployerResult.length;  ++i) {
            if (contractDeployerResult[i] === '0') {
                this.gravityContractAddress = contractDeployerResult.substr(i, 42);
                break;
            }
        }

        await sentrySshHelper.exec([
            `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/gravity-contract-deployer`,
            `docker-compose --env-file ./gravity-contract-deployer.arg -f ./gravity-contract-deployer.yml -p cudos-gravity-contract-deployer down`
        ]);
    }

    async startOrchestrators() {
        Log.main('Start orchestrators');

        const validatorNodeModels = this.topologyHelper.validators.concat([
            this.topologyHelper.rootValidator
        ]);

        for (let i = 0;  i < validatorNodeModels.length;  ++i) {
            const validatorNodeModel = validatorNodeModels[i];
            const validatorSshHelper = this.instancesService.getSshHelper(validatorNodeModel.computerId);

            const grpc = this.nodeIdToNodeInstanceContainerNamesMap.get(validatorNodeModel.nodeId);
            const cosmosOrchWallet = this.validatorIdToOrchWalletModelMap.get(validatorNodeModel.validatorId);
            const dockerContainerOrchestratorName = validatorNodeModel.getDockerContainerOrchestratorName();

            await validatorSshHelper.exec([
                `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/orchestrator`,
                'cp ./orchestrator.env.example ./orchestrator.local01.env',
                `sed -i "s/FEES=\\"\\"/FEES=\\"0acudos\\"/g" ./orchestrator.local01.env`,
                `sed -i "s~GRPC=\\"\\"~GRPC=\\"http://${grpc}:9090\\"~g" ./orchestrator.local01.env`,
                `sed -i "s~ETHRPC=\\"\\"~ETHRPC=\\"${this.topologyHelper.params.gravity.ethrpc}\\"~g" ./orchestrator.local01.env`,
                `sed -i "s/CONTRACT_ADDR=\\"\\"/CONTRACT_ADDR=\\"${this.gravityContractAddress}\\"/g" ./orchestrator.local01.env`,
                `sed -i "s/COSMOS_ORCH_MNEMONIC=\\"\\"/COSMOS_ORCH_MNEMONIC=\\"${cosmosOrchWallet.mnemonic}\\"/g" ./orchestrator.local01.env`,
                `sed -i "s/ETH_PRIV_KEY_HEX=\\"\\"/ETH_PRIV_KEY_HEX=\\"${validatorNodeModel.ethPrivKey}\\"/g" ./orchestrator.local01.env`,
                `sed -i "s/CONTAINER_NAME=cudos-orchestrator-local-01/CONTAINER_NAME=${dockerContainerOrchestratorName}/g" ./orchestrator.local01.arg`,
                `docker-compose --env-file ./orchestrator.local01.arg -f ./orchestrator.release.yml -p ${dockerContainerOrchestratorName} up --build -d`
            ]);

            this.nodeIdToOrchestratorInstanceContainerNamesMap.set(validatorNodeModel.nodeId, `${dockerContainerOrchestratorName}-release`);
        }
    }

    async startGravityBridgeUi() {
        Log.main('Start gravity bridge ui');

        const gravityBridgeUiModel = this.topologyHelper.gravityBridgeUiModel;
        const gravityBridgeUiComputerModel = this.topologyHelper.getComputerModel(gravityBridgeUiModel.computerId);
        const gravityBridgeUiSshHelper = this.instancesService.getSshHelper(gravityBridgeUiModel.computerId);

        const host = gravityBridgeUiComputerModel.isLocalDocker === true ? 'localhost' : gravityBridgeUiComputerModel.ip;
        const port26657 = gravityBridgeUiComputerModel.isLocalDocker === true ? this.sentryNodePort26657 : 26657;
        const port1317 = gravityBridgeUiComputerModel.isLocalDocker === true ? this.sentryNodePort1317 : 1317;

        await gravityBridgeUiSshHelper.cloneGravityBridgeUiRepo();
        await gravityBridgeUiSshHelper.exec([
            `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/gravity-bridge-ui`,
            'cp ./gravity-bridge-ui.env.example ./gravity-bridge-ui.env',
            `sed -i "s~URL=~URL=http://${host}~g" ./gravity-bridge-ui.env`,
            `sed -i "s~ETHEREUM_RPC=~ETHEREUM_RPC=${this.topologyHelper.params.gravity.ethrpc}~g" ./gravity-bridge-ui.env`,
            `sed -i "s/CHAIN_NAME=/CHAIN_NAME=CudosTestnet-Deployer/g" ./gravity-bridge-ui.env`,
            `sed -i "s/CHAIN_ID=/CHAIN_ID=${CHAIN_ID}/g" ./gravity-bridge-ui.env`,
            `sed -i "19s~RPC=~RPC=http://${host}:${port26657}~g" ./gravity-bridge-ui.env`,
            `sed -i "s~API=~API=http://${host}:${port1317}~g" ./gravity-bridge-ui.env`,
            `sed -i "s~STAKING=~STAKING=http://${host}:3000/validators~g" ./gravity-bridge-ui.env`,
            `sed -i "s/ERC20_CONTRACT_ADDRESS=/ERC20_CONTRACT_ADDRESS=${gravityBridgeUiModel.ethTokenContract}/g" ./gravity-bridge-ui.env`,
            `sed -i "s/BRIDGE_CONTRACT_ADDRESS=/BRIDGE_CONTRACT_ADDRESS=${this.gravityContractAddress}/g" ./gravity-bridge-ui.env`,
            'cp ./gravity-bridge-ui.dev.arg ./gravity-bridge-ui.arg',
            'sed -i "s/ENV_FILE=gravity-bridge-ui.dev.env/ENV_FILE=gravity-bridge-ui.env/g" ./gravity-bridge-ui.arg',
            `sed -i "s/container_name: cudos-gravity-bridge-ui-testnet-private/container_name: ${GRAVITY_BRIDGE_UI_CONTAINER_NAME}/g" ./gravity-bridge-ui.arg`,
            `docker-compose --env-file ./gravity-bridge-ui.arg -f ./gravity-bridge-ui.release.yml -p ${GRAVITY_BRIDGE_UI_CONTAINER_NAME} up --build -d`
        ]);
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
        const rootValidatorNodeModel = this.topologyHelper.rootValidator;
        const rootValidatorSshHelper = this.instancesService.getSshHelper(rootValidatorNodeModel.computerId);
        const txResultString = await rootValidatorSshHelper.exec(`docker container exec ${ValidatorNodeModel.getRootValidatorDockerContainerStartName()} /bin/bash -c "echo 123123123 | cudos-noded tx bank send ${this.faucetAddress} ${recipientWalletAddress} ${amount} --from faucet --keyring-backend os --chain-id ${CHAIN_ID} -y"`, false);
        await rootValidatorSshHelper.awaitForTx(ValidatorNodeModel.getRootValidatorDockerContainerStartName(), txResultString);
    }

    onExit = async () => {
        await this.stopNodesInstances();   
        await this.stopOrchestratorInstances();
        await this.stopUtils();
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

    async stopOrchestratorInstances() {
        Log.main('Stop orchestrator\' instances');

        const tasks = [];
        const entries = this.nodeIdToOrchestratorInstanceContainerNamesMap.entries();
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

    async stopUtils() {
        Log.main('Stop utils\' instances');

        const tasks = [];

        const gravityBridgeUiModel = this.topologyHelper.gravityBridgeUiModel;
        const gravityBridgeUiSshHelper = this.instancesService.getSshHelper(gravityBridgeUiModel.computerId);
        tasks.push(gravityBridgeUiSshHelper.exec([
            `docker stop ${GRAVITY_BRIDGE_UI_CONTAINER_NAME}`,
            `docker container rm ${GRAVITY_BRIDGE_UI_CONTAINER_NAME}`
        ], false));

        await Promise.all(tasks);
    }

}

module.exports = NodesService;
