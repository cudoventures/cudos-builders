const ValidatorNodeModel = require('../models/ValidatorNodeModel');
const WalletModel = require('../models/WalletModel');
const Log = require('../utilities/LogHelper');
const NodesHelper = require('../utilities/NodesHelper');
const PathHelper = require('../utilities/PathHelper');

const CHAIN_ID = 'cudos-deployer-network';
const CHAIN_NAME = 'CudosTestnet-DeployerNetwork';

const GRAVITY_BRIDGE_UI_CONTAINER_NAME = 'cudos-deployer-network-gravity-bridge-ui';
const EXPLORER_CONTAINER_NAME = 'cudos-deployer-network-explorer';
const EXPLORER_MONGO_CONTAINER_NAME = 'cudos-deployer-network-explorer-mongo';
const FAUCET_CONTAINER_NAME = 'cudos-deployer-network-faucet';

class NodesService {

    constructor(topologyHelper, instancesService) {
        this.topologyHelper = topologyHelper;
        this.instancesService = instancesService;

        this.genPorts = 60000;

        this.nodeIdToNodeInstanceContainerNamesMap = new Map();
        this.nodeIdToOrchestratorInstanceContainerNamesMap = new Map();

        this.validatorIdToOrchWalletModelMap = new Map();
        this.nodeIdTotendermintNodeId = new Map();

        this.genesisJsonString = '';
        this.genesisTime = '';
        this.faucetAddress = '';
        this.faucetMnemonic = '';
        this.gravityContractAddress = '';

        this.gravity = "1";
        this.explorer = "1";
        this.faucet = "1";
        this.monitoring = "1";
    }

    async start(gravity, explorer, faucet, monitoring) {
        this.gravity = gravity;
        this.explorer = explorer;
        this.faucet = faucet;
        this.monitoring = monitoring;

        await this.prepareVolumes();

        await this.initAndStartRootValidator(gravity);
        await this.initAndStartRootValidatorSeedNodes();
        await this.initAndStartRootValidatorSentryNodes();
        await this.initValidators();
        await this.initAndStartValidatorsSeedNode();
        await this.initAndStartValidatorsSentryNode();
        await this.configAndStartValidators();
        if (gravity === '1') {
            await this.deployGravitySmartContract();
            await this.startOrchestrators();
            // await this.startGravityBridgeUi();
        }
        // if (faucet === '1') {
        //     await this.startFaucet();
        // }
        // if (explorer === '1') {
        //     await this.startExplorer();
        // }
        // if (monitoring === '1') {
        //     await this.startMonitoring();
        // }
    }

    async prepareVolumes(explorer, monitoring) {
        Log.main('Prepare volumes');

        // if (explorer === '1') {
        //     const utilsModel = this.topologyHelper.utilsModel;
        //     const utilsSshHelper = this.instancesService.getSshHelper(utilsModel.computerId);

        //     await utilsSshHelper.exec([
        //         `docker run -v "${PathHelper.WORKING_DIR}/CudosData/cudos-data-explorer-release-mongodb:/vol" debian rm -rf /vol`,
        //     ], false);
        // }

        // if (monitoring === '1') {
        //     const monitoringModel = this.topologyHelper.monitoringModel;
        //     const monitoringSshHelper = this.instancesService.getSshHelper(monitoringModel.computerId);

        //     await monitoringSshHelper.exec([
        //         `docker run -v "${PathHelper.WORKING_DIR}/CudosData/grafana:/vol" debian rm -rf /vol`,
        //     ], false);

        //     await monitoringSshHelper.exec([
        //         `docker run -v "${PathHelper.WORKING_DIR}/CudosData/prometheus:/vol" debian rm -rf /vol`,
        //     ], false);
        // }

        // all node volumes are deleted during initialization
    }

    async initAndStartRootValidator(gravity) {
        Log.main('Init and start root validator');
        
        const validatorNodeModel = this.topologyHelper.rootValidator;
        const validatorComputerModel = this.topologyHelper.getComputerModel(validatorNodeModel.computerId);
        const validatorSshHelper = this.instancesService.getSshHelper(validatorNodeModel.computerId);
        
        const dockerContainerStartName = ValidatorNodeModel.getRootValidatorDockerContainerStartName();        
        
        let ethTokenContract = '0x28ea52f3ee46CaC5a72f72e8B3A387C0291d586d';
        // if (gravity === '1') {
        //     const gravityBridgeUiModel = this.topologyHelper.gravityBridgeUiModel;
        //     ethTokenContract = gravityBridgeUiModel.ethTokenContract;
        // }

        validatorNodeModel.port26656 = validatorComputerModel.isLocalDocker === true ? ++this.genPorts : 26656;
        validatorNodeModel.port26660 = validatorComputerModel.isLocalDocker === true ? ++this.genPorts : 26660;

        if (validatorComputerModel.isLocalDocker === false) {
            await validatorSshHelper.cloneRepos();
        }
        await validatorSshHelper.prepareBinaryBuilder();
        await validatorSshHelper.exec([
            `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/root-node`,
            'cp ./root-node.env.example ./root-node.local.env',
            'sed -i "s/MONIKER=.*/MONIKER=\"deployer-network-root-validator\"/g" ./root-node.local.env',
            `sed -i "s/CHAIN_ID=.*/CHAIN_ID=\"${CHAIN_ID}\"/g" ./root-node.local.env`,
            `sed -i "s/ORCH_ETH_ADDRESS=.*/ORCH_ETH_ADDRESS=\"${validatorNodeModel.orchEthAddress}\"/g" ./root-node.local.env`,
            `sed -i "s/MONITORING_ENABLED=.*/MONITORING_ENABLED=\"true\"/g" ./root-node.local.env`,
            `sed -i "s/ADDR_BOOK_STRICT=.*/ADDR_BOOK_STRICT=\"false\"/g" ./root-node.local.env`,
            `sed -i "s/GRAVITY_MODULE_BALANCE=.*/GRAVITY_MODULE_BALANCE=\"1000000000000000000000000000\"/g" ./root-node.local.env`,
            `sed -i "s/CUDOS_TOKEN_CONTRACT_ADDRESS=.*/CUDOS_TOKEN_CONTRACT_ADDRESS=\"${ethTokenContract}\"/g" ./root-node.local.env`,
            `sed -i "s/NUMBER_OF_VALIDATORS=.*/NUMBER_OF_VALIDATORS=\"1\"/g" ./root-node.local.env`,
            `sed -i "s/NUMBER_OF_ORCHESTRATORS=.*/NUMBER_OF_ORCHESTRATORS=\"1\"/g" ./root-node.local.env`,
            `sed -i "s/VALIDATOR_BALANCE=.*/VALIDATOR_BALANCE=\"2000000000000000000000000\"/g" ./root-node.local.env`,
            `sed -i "s/ORCHESTRATOR_BALANCE=.*/ORCHESTRATOR_BALANCE=\"2000000000000000000000000\"/g" ./root-node.local.env`,
            `sed -i "s/FAUCET_BALANCE=.*/FAUCET_BALANCE=\"20000000000000000000000000000000\"/g" ./root-node.local.env`,
            `sed -i "s/KEYRING_OS_PASS=.*/KEYRING_OS_PASS=\"123123123\"/g" ./root-node.local.env`,
            `sed -i "s/PORT26656=.*/PORT26656=\"${validatorNodeModel.port26656}\"/g" ./root-node.local.arg`,
            `sed -i "s/PORT26660=.*/PORT26660=\"${validatorNodeModel.port26660}\"/g" ./root-node.local.arg`,
            `sed -i "s/START_CONTAINER_NAME=.*/START_CONTAINER_NAME=\"${dockerContainerStartName}\"/g" ./root-node.local.arg`,
            ...NodesHelper.getDockerExtraHosts('start-root-node'),
        ]);
        
        if (gravity === '1') {
            await validatorSshHelper.exec([
                `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/root-node`,
                `echo '\r\nsed -i "/\\[grpc\\]/,/\\[/ s/enable = false/enable = true/" "$\{CUDOS_HOME\}/config/app.toml"\r\n' >> ./scripts/init-root.sh`,
                `cat ./scripts/init-root.sh`
            ], true);
        }
        
        await validatorSshHelper.exec([
            `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/root-node`,
            'docker-compose --env-file ./root-node.local.arg -f ./init-root-node.yml -p cudos-init-root-node up --build',
            'docker-compose --env-file ./root-node.local.arg -f ./init-root-node.yml -p cudos-init-root-node down',
            `docker-compose --env-file ./root-node.local.arg -f ./start-root-node.yml -p ${ValidatorNodeModel.getRootValidatorDockerContainerStartName()} up --build -d`
        ]);

        this.nodeIdToNodeInstanceContainerNamesMap.set(validatorNodeModel.nodeId, dockerContainerStartName);

        await validatorSshHelper.awaitForNode(dockerContainerStartName);

        const tendermintNodeId = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded tendermint show-node-id"`, false);
        this.nodeIdTotendermintNodeId.set(validatorNodeModel.nodeId, tendermintNodeId);

        this.faucetAddress = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "echo 123123123 | cudos-noded keys show faucet -a --keyring-backend os"`, false);
        this.genesisJsonString = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cat /usr/cudos/cudos-data/config/genesis.json"`, false);

        const genesisJson = JSON.parse(`${this.genesisJsonString.replace(/(\r\n|\n|\r)/gm, "")}`);
        this.genesisTime = genesisJson.genesis_time;

        const faucetWalletString = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cat /usr/cudos/cudos-data/faucet.wallet"`, false);
        const faucetWallet = WalletModel.instanceByString(faucetWalletString);
        this.faucetMnemonic = faucetWallet.mnemonic;

        const rootOrchWalletString = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cat /usr/cudos/cudos-data/orch-1.wallet"`, false);
        this.validatorIdToOrchWalletModelMap.set(validatorNodeModel.validatorId, WalletModel.instanceByString(rootOrchWalletString));
    }

    async initAndStartRootValidatorSeedNodes() {
        Log.main('Init and start root validator\'s seeds');

        const validatorNodeModel = this.topologyHelper.rootValidator;
        const seedNodeModels = this.topologyHelper.getSeeds(validatorNodeModel.validatorId);

        const validatorTendermintId = this.nodeIdTotendermintNodeId.get(validatorNodeModel.nodeId);
        const validatorDockerInternalHost = this.getDockerInternalHostByNodeId(validatorNodeModel.nodeId); 

        for (let i = 0;  i < seedNodeModels.length;  ++i) {
            const seedNodeModel = seedNodeModels[i];
            const seedComputerModel = this.topologyHelper.getComputerModel(seedNodeModel.computerId);
            const seedSshHelper = this.instancesService.getSshHelper(seedNodeModel.computerId);

            const dockerContainerInitName = seedNodeModel.getDockerContainerInitName(validatorNodeModel, i); 
            const dockerContainerStartName = seedNodeModel.getDockerContainerStartName(validatorNodeModel, i); 
            const volumeName = `cudos-data-seed-node-${validatorNodeModel.validatorId}-${i + 1}`;

            seedNodeModel.port26656 = seedComputerModel.isLocalDocker === true ? ++this.genPorts : 26656;
            seedNodeModel.port26657 = seedComputerModel.isLocalDocker === true ? ++this.genPorts : 26657;
            seedNodeModel.port26660 = seedComputerModel.isLocalDocker === true ? ++this.genPorts : 26660;

            if (seedComputerModel.isLocalDocker === false) {
                await validatorSshHelper.cloneRepos();
            }
            await seedSshHelper.prepareBinaryBuilder();
            await seedSshHelper.exec([
                `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/seed-node`,
                'cp ./seed-node.env.example ./seed-node.local01.env',
                `sed -i "s/MONIKER=.*/MONIKER=\"deployer-network-seed-node-${seedNodeModel.nodeId}\"/g" ./seed-node.local01.env`,
                `sed -i "s/PERSISTENT_PEERS=.*/PERSISTENT_PEERS=\"${validatorTendermintId}@${validatorDockerInternalHost}:26656\"/g" ./seed-node.local01.env`,
                `sed -i "s/PRIVATE_PEERS=.*/PRIVATE_PEERS=\"${validatorTendermintId}\"/g" ./seed-node.local01.env`,
                `sed -i "s/SHOULD_USE_GLOBAL_PEERS=.*/SHOULD_USE_GLOBAL_PEERS=\"false\"/g" ./seed-node.local01.env`,
                `sed -i "s/MONITORING_ENABLED=.*/MONITORING_ENABLED=\"true\"/g" ./seed-node.local01.env`,
                `sed -i "s/ADDR_BOOK_STRICT=.*/ADDR_BOOK_STRICT=\"false\"/g" ./seed-node.local01.env`,
                `sed -i "s/INIT_CONTAINER_NAME=.*/INIT_CONTAINER_NAME=\"${dockerContainerInitName}\"/g" ./seed-node.local01.arg`,
                `sed -i "s/START_CONTAINER_NAME=.*/START_CONTAINER_NAME=\"${dockerContainerStartName}\"/g" ./seed-node.local01.arg`,
                `sed -i "s/VOLUME_NAME=.*/VOLUME_NAME=\"${volumeName}\"/g" ./seed-node.local01.arg`,
                `sed -i "s/PORT26656=.*/PORT26656=\"${seedNodeModel.port26656}\"/g" ./seed-node.local01.arg`,
                `sed -i "s/PORT26657=.*/PORT26657=\"${seedNodeModel.port26657}\"/g" ./seed-node.local01.arg`,
                `sed -i "s/PORT26660=.*/PORT26660=\"${seedNodeModel.port26660}\"/g" ./seed-node.local01.arg`,
                ...NodesHelper.getDockerExtraHosts('start-seed-node'),
                ...NodesHelper.getDockerConfig(this.genesisJsonString),
                `docker-compose --env-file ./seed-node.local01.arg -f ./init-seed-node.yml -p ${dockerContainerInitName} up --build`,
                `(docker-compose --env-file ./seed-node.local01.arg -f ./init-seed-node.yml -p ${dockerContainerInitName} down || true)`,
                `docker-compose --env-file ./seed-node.local01.arg -f ./start-seed-node.yml -p ${dockerContainerStartName} up --build -d`
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
        const validatorDockerInternalHost = this.getDockerInternalHostByNodeId(validatorNodeModel.nodeId); 

        const seeds = this.getSeedsByValidatorId(validatorNodeModel.validatorId);

        for (let i = 0;  i < sentryNodeModels.length;  ++i) {
            const sentryNodeModel = sentryNodeModels[i];
            const sentryComputerModel = this.topologyHelper.getComputerModel(sentryNodeModel.computerId);
            const sentrySshHelper = this.instancesService.getSshHelper(sentryNodeModel.computerId);

            const dockerContainerInitName = sentryNodeModel.getDockerContainerInitName(validatorNodeModel, i); 
            const dockerContainerStartName = sentryNodeModel.getDockerContainerStartName(validatorNodeModel, i); 
            const volumeName = `cudos-data-sentry-node-${validatorNodeModel.validatorId}-${i + 1}`;

            sentryNodeModel.port26656 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 26656;
            sentryNodeModel.port26657 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 26657;
            sentryNodeModel.port1317 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 1317;
            sentryNodeModel.port9090 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 9090;
            sentryNodeModel.port26660 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 26660;

            if (sentryComputerModel.isLocalDocker === false) {
                await validatorSshHelper.cloneRepos();
            }
            await sentrySshHelper.prepareBinaryBuilder();
            await sentrySshHelper.exec([
                `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/sentry-node`,
                'cp ./sentry-node.env.example ./sentry-node.local01.env',
                `sed -i "s/MONIKER=.*/MONIKER=\"deployer-network-sentry-node-${sentryNodeModel.nodeId}\"/g" ./sentry-node.local01.env`,
                `sed -i "s/PERSISTENT_PEERS=.*/PERSISTENT_PEERS=\"${validatorTendermintId}@${validatorDockerInternalHost}:26656\"/g" ./sentry-node.local01.env`,
                `sed -i "s/SEEDS=.*/SEEDS=\"${seeds}\"/g" ./sentry-node.local01.env`,
                `sed -i "s/PRIVATE_PEERS=.*/PRIVATE_PEERS=\"${validatorTendermintId}\"/g" ./sentry-node.local01.env`,
                `sed -i "s/SHOULD_USE_GLOBAL_PEERS=.*/SHOULD_USE_GLOBAL_PEERS=\"false\"/g" ./sentry-node.local01.env`,
                `sed -i "s/MONITORING_ENABLED=.*/MONITORING_ENABLED=\"true\"/g" ./sentry-node.local01.env`,
                `sed -i "s/ADDR_BOOK_STRICT=.*/ADDR_BOOK_STRICT=\"false\"/g" ./sentry-node.local01.env`,
                `sed -i "s/INIT_CONTAINER_NAME=.*/INIT_CONTAINER_NAME=\"${dockerContainerInitName}\"/g" ./sentry-node.local01.arg`,
                `sed -i "s/START_CONTAINER_NAME=.*/START_CONTAINER_NAME=\"${dockerContainerStartName}\"/g" ./sentry-node.local01.arg`,
                `sed -i "s/VOLUME_NAME=.*/VOLUME_NAME=\"${volumeName}\"/g" ./sentry-node.local01.arg`,
                `sed -i "s/PORT26656=.*/PORT26656=\"${sentryNodeModel.port26656}\"/g" ./sentry-node.local01.arg`,
                `sed -i "s/PORT26657=.*/PORT26657=\"${sentryNodeModel.port26657}\"/g" ./sentry-node.local01.arg`,
                `sed -i "s/PORT1317=.*/PORT1317=\"${sentryNodeModel.port1317}\"/g" ./sentry-node.local01.arg`,
                `sed -i "s/PORT9090=.*/PORT9090=\"${sentryNodeModel.port9090}\"/g" ./sentry-node.local01.arg`,
                `sed -i "s/PORT26660=.*/PORT26660=\"${sentryNodeModel.port26660}\"/g" ./sentry-node.local01.arg`,
                ...NodesHelper.getDockerExtraHosts('start-sentry-node'),
                ...NodesHelper.getDockerConfig(this.genesisJsonString),
                `docker-compose --env-file ./sentry-node.local01.arg -f ./init-sentry-node.yml -p ${dockerContainerInitName} up --build`,
                `(docker-compose --env-file ./sentry-node.local01.arg -f ./init-sentry-node.yml -p ${dockerContainerInitName} down || true)`,
                `docker-compose --env-file ./sentry-node.local01.arg -f ./start-sentry-node.yml -p ${dockerContainerStartName} up --build -d`
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

            const dockerContainerInitName = validatorNodeModel.getDockerContainerInitName(i); 
            const dockerContainerConfigName = validatorNodeModel.getDockerContainerConfigName(i); 
            const dockerContainerStartName = validatorNodeModel.getDockerContainerStartName(i); 
            const volumeName = `cudos-data-full-node-${validatorNodeModel.validatorId}-${i + 1}`;

            validatorNodeModel.port26656 = validatorComputerModel.isLocalDocker === true ? ++this.genPorts : 26656;
            validatorNodeModel.port26657 = validatorComputerModel.isLocalDocker === true ? ++this.genPorts : 26657;
            validatorNodeModel.port26660 = validatorComputerModel.isLocalDocker === true ? ++this.genPorts : 26660;

            if (validatorComputerModel.isLocalDocker === false) {
                await validatorSshHelper.cloneRepos();
            }
            await validatorSshHelper.prepareBinaryBuilder();
            await validatorSshHelper.exec([
                `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/full-node`,
                'cp ./full-node.env.example ./full-node.client.local01.env',
                `sed -i "s/MONIKER=.*/MONIKER=\"deployer-network-full-node-${validatorNodeModel.nodeId}\"/g" ./full-node.client.local01.env`,
                `sed -i "s/MONITORING_ENABLED=.*/MONITORING_ENABLED=\"true\"/g" ./full-node.client.local01.env`,
                `sed -i "s/ADDR_BOOK_STRICT=.*/ADDR_BOOK_STRICT=\"false\"/g" ./full-node.client.local01.env`,
                `sed -i "s/INIT_CONTAINER_NAME=.*/INIT_CONTAINER_NAME=\"${dockerContainerInitName}\"/g" ./full-node.client.local01.arg`,
                `sed -i "s/CONFIG_CONTAINER_NAME=.*/CONFIG_CONTAINER_NAME=\"${dockerContainerConfigName}\"/g" ./full-node.client.local01.arg`,
                `sed -i "s/START_CONTAINER_NAME=.*/START_CONTAINER_NAME=\"${dockerContainerStartName}\"/g" ./full-node.client.local01.arg`,
                `sed -i "s/VOLUME_NAME=.*/VOLUME_NAME=\"${volumeName}\"/g" ./full-node.client.local01.arg`,
                `sed -i "s/PORT26656=.*/PORT26656=\"${validatorNodeModel.port26656}\"/g" ./full-node.client.local01.arg`,
                `sed -i "s/PORT26657=.*/PORT26657=\"${validatorNodeModel.port26657}\"/g" ./full-node.client.local01.arg`,
                `sed -i "s/PORT26660=.*/PORT26660=\"${validatorNodeModel.port26660}\"/g" ./full-node.client.local01.arg`,
                `sed -i "s/init-full-node.sh\\"]/init-full-node.sh \\&\\& sleep infinity\\"]/g" ./init-full-node.dockerfile`,
                ...NodesHelper.getDockerConfig(this.genesisJsonString),
                `docker-compose --env-file ./full-node.client.local01.arg -f ./init-full-node.yml -p ${dockerContainerInitName} up --build -d`,
            ]);

            const tendermintNodeId = await validatorSshHelper.exec(`docker container exec ${dockerContainerInitName} /bin/bash -c "cudos-noded tendermint show-node-id"`, false);
            this.nodeIdTotendermintNodeId.set(validatorNodeModel.nodeId, tendermintNodeId);

            await validatorSshHelper.exec([
                `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/full-node`,
                `(docker-compose --env-file ./full-node.client.local01.arg -f ./init-full-node.yml -p ${dockerContainerInitName} down || true)`,
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

                const dockerContainerInitName = seedNodeModel.getDockerContainerInitName(validatorNodeModel, i); 
                const dockerContainerStartName = seedNodeModel.getDockerContainerStartName(validatorNodeModel, i); 
                const volumeName = `cudos-data-seed-node-${validatorNodeModel.validatorId}-${i + 1}`;

                seedNodeModel.port26656 = seedComputerModel.isLocalDocker === true ? ++this.genPorts : 26656;
                seedNodeModel.port26657 = seedComputerModel.isLocalDocker === true ? ++this.genPorts : 26657;
                seedNodeModel.port26660 = seedComputerModel.isLocalDocker === true ? ++this.genPorts : 26660;

                if (seedComputerModel.isLocalDocker === false) {
                    await validatorSshHelper.cloneRepos();
                }
                await seedSshHelper.prepareBinaryBuilder();
                await seedSshHelper.exec([
                    `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/seed-node`,
                    'cp ./seed-node.env.example ./seed-node.local01.env',
                    `sed -i "s/MONIKER=.*/MONIKER=\"deployer-network-seed-node-${seedNodeModel.nodeId}\"/g" ./seed-node.local01.env`,
                    `sed -i "s/PERSISTENT_PEERS=.*/PERSISTENT_PEERS=\"${sentries}\"/g" ./seed-node.local01.env`,
                    `sed -i "s/PRIVATE_PEERS=.*/PRIVATE_PEERS=\"${validatorTendermintId}\"/g" ./seed-node.local01.env`,
                    `sed -i "s/SHOULD_USE_GLOBAL_PEERS=.*/SHOULD_USE_GLOBAL_PEERS=\"false\"/g" ./seed-node.local01.env`,
                    `sed -i "s/MONITORING_ENABLED=.*/MONITORING_ENABLED=\"true\"/g" ./seed-node.local01.env`,
                    `sed -i "s/ADDR_BOOK_STRICT=.*/ADDR_BOOK_STRICT=\"false\"/g" ./seed-node.local01.env`,
                    `sed -i "s/INIT_CONTAINER_NAME=.*/INIT_CONTAINER_NAME=\"${dockerContainerInitName}\"/g" ./seed-node.local01.arg`,
                    `sed -i "s/START_CONTAINER_NAME=.*/START_CONTAINER_NAME=\"${dockerContainerStartName}\"/g" ./seed-node.local01.arg`,
                    `sed -i "s/VOLUME_NAME=.*/VOLUME_NAME=\"${volumeName}\"/g" ./seed-node.local01.arg`,
                    `sed -i "s/PORT26656=.*/PORT26656=\"${seedNodeModel.port26656}\"/g" ./seed-node.local01.arg`,
                    `sed -i "s/PORT26657=.*/PORT26657=\"${seedNodeModel.port26657}\"/g" ./seed-node.local01.arg`,
                    `sed -i "s/PORT26660=.*/PORT26660=\"${seedNodeModel.port26660}\"/g" ./seed-node.local01.arg`,
                    ...NodesHelper.getDockerExtraHosts('start-seed-node'),
                    ...NodesHelper.getDockerConfig(this.genesisJsonString),
                    `docker-compose --env-file ./seed-node.local01.arg -f ./init-seed-node.yml -p ${dockerContainerInitName} up --build`,
                    `(docker-compose --env-file ./seed-node.local01.arg -f ./init-seed-node.yml -p ${dockerContainerInitName} down || true)`,
                    `docker-compose --env-file ./seed-node.local01.arg -f ./start-seed-node.yml -p ${dockerContainerStartName} up --build -d`
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
    
                const dockerContainerInitName = sentryNodeModel.getDockerContainerInitName(validatorNodeModel, i); 
                const dockerContainerStartName = sentryNodeModel.getDockerContainerStartName(validatorNodeModel, i); 
                const volumeName = `cudos-data-sentry-node-${validatorNodeModel.validatorId}-${i + 1}`;

                sentryNodeModel.port26656 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 26656;
                sentryNodeModel.port26657 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 26657;
                sentryNodeModel.port1317 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 1317;
                sentryNodeModel.port9090 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 9090;
                sentryNodeModel.port26660 = sentryComputerModel.isLocalDocker === true ? ++this.genPorts : 26660;
    
                if (sentryComputerModel.isLocalDocker === false) {
                    await validatorSshHelper.cloneRepos();
                }
                await sentrySshHelper.prepareBinaryBuilder();
                await sentrySshHelper.exec([
                    `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/sentry-node`,
                    'cp ./sentry-node.env.example ./sentry-node.local01.env',
                    `sed -i "s/MONIKER=.*/MONIKER=\"deployer-network-sentry-node-${sentryNodeModel.nodeId}\"/g" ./sentry-node.local01.env`,
                    `sed -i "s/SEEDS=.*/SEEDS=\"${seeds}\"/g" ./sentry-node.local01.env`,
                    `sed -i "s/PRIVATE_PEERS=.*/PRIVATE_PEERS=\"${validatorTendermintId}\"/g" ./sentry-node.local01.env`,
                    `sed -i "s/SHOULD_USE_GLOBAL_PEERS=.*/SHOULD_USE_GLOBAL_PEERS=\"false\"/g" ./sentry-node.local01.env`,
                    `sed -i "s/MONITORING_ENABLED=.*/MONITORING_ENABLED=\"true\"/g" ./sentry-node.local01.env`,
                    `sed -i "s/ADDR_BOOK_STRICT=.*/ADDR_BOOK_STRICT=\"false\"/g" ./sentry-node.local01.env`,
                    `sed -i "s/INIT_CONTAINER_NAME=.*/INIT_CONTAINER_NAME=\"${dockerContainerInitName}\"/g" ./sentry-node.local01.arg`,
                    `sed -i "s/START_CONTAINER_NAME=.*/START_CONTAINER_NAME=\"${dockerContainerStartName}\"/g" ./sentry-node.local01.arg`,
                    `sed -i "s/VOLUME_NAME=.*/VOLUME_NAME=\"${volumeName}\"/g" ./sentry-node.local01.arg`,
                    `sed -i "s/PORT26656=.*/PORT26656=\"${sentryNodeModel.port26656}\"/g" ./sentry-node.local01.arg`,
                    `sed -i "s/PORT26657=.*/PORT26657=\"${sentryNodeModel.port26657}\"/g" ./sentry-node.local01.arg`,
                    `sed -i "s/PORT1317=.*/PORT1317=\"${sentryNodeModel.port1317}\"/g" ./sentry-node.local01.arg`,
                    `sed -i "s/PORT9090=.*/PORT9090=\"${sentryNodeModel.port9090}\"/g" ./sentry-node.local01.arg`,
                    `sed -i "s/PORT26660=.*/PORT26660=\"${sentryNodeModel.port26660}\"/g" ./sentry-node.local01.arg`,
                    ...NodesHelper.getDockerExtraHosts('start-sentry-node'),
                    ...NodesHelper.getDockerConfig(this.genesisJsonString),
                    `docker-compose --env-file ./sentry-node.local01.arg -f ./init-sentry-node.yml -p ${dockerContainerInitName} up --build`,
                    `(docker-compose --env-file ./sentry-node.local01.arg -f ./init-sentry-node.yml -p ${dockerContainerInitName} down || true)`,
                    `docker-compose --env-file ./sentry-node.local01.arg -f ./start-sentry-node.yml -p ${dockerContainerStartName} up --build -d`
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

            const dockerContainerConfigName = validatorNodeModel.getDockerContainerConfigName(i); 
            const dockerContainerStartName = validatorNodeModel.getDockerContainerStartName(i); 

            const seeds = this.getSeedsByValidatorId(validatorNodeModel.validatorId);
            const sentries = this.getSentriesByValidatorId(validatorNodeModel.validatorId);

            await validatorSshHelper.exec([
                `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/full-node`,
                `sed -i "s/PERSISTENT_PEERS=.*/PERSISTENT_PEERS=\"${seeds},${sentries}\"/g" ./full-node.client.local01.env`,
                ...NodesHelper.getDockerExtraHosts('start-full-node'),
                `docker-compose --env-file ./full-node.client.local01.arg -f ./config-full-node.yml -p ${dockerContainerConfigName} up --build`,
                `(docker-compose --env-file ./full-node.client.local01.arg -f ./config-full-node.yml -p ${dockerContainerConfigName} down || true)`,
                `docker-compose --env-file ./full-node.client.local01.arg -f ./start-full-node.yml -p ${dockerContainerStartName} up --build -d`
            ]);

            this.nodeIdToNodeInstanceContainerNamesMap.set(validatorNodeModel.nodeId, dockerContainerStartName);

            await validatorSshHelper.awaitForNode(dockerContainerStartName);

            const tendermintNodeId = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded tendermint show-node-id"`, false);
            this.nodeIdTotendermintNodeId.set(validatorNodeModel.nodeId, tendermintNodeId);

            // create validator
            await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded keys add validator --keyring-backend test |& tee \\"\\$CUDOS_HOME/validator.wallet\\""`, false);
            const validatorWalletAddress = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded keys show validator -a --keyring-backend test"`, false);
            await this.fundFromFaucet(validatorWalletAddress, '200000001000000000000000000acudos');
            const tendermintValidatorPubKey = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded tendermint show-validator"`, false);
            await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c 'cudos-noded tx staking create-validator --amount=200000000000000000000000000acudos \\
                                                --from=validator \\
                                                --pubkey="${tendermintValidatorPubKey.replace(/"/g, '\\"')}" \\
                                                --moniker=$MONIKER \\
                                                --chain-id=${CHAIN_ID} \\
                                                --commission-rate="0.10" \\
                                                --commission-max-rate="0.20" \\
                                                --commission-max-change-rate="0.01" \\
                                                --gas="auto" \\
                                                --gas-prices="0.025acudos" \\
                                                --gas-adjustment="1.80" \\
                                                --keyring-backend="test" \\
                                                -y'`, false);
            // console.log(`docker container exec ${dockerContainerStartName} /bin/bash -c 'cudos-noded tx staking create-validator --amount=200000000000000000000000000acudos \\
            // --from=validator \\
            // --pubkey="${tendermintValidatorPubKey.replace(/"/g, '\\"')}" \\
            // --moniker=$MONIKER \\
            // --chain-id=${CHAIN_ID} \\
            // --commission-rate="0.10" \\
            // --commission-max-rate="0.20" \\
            // --commission-max-change-rate="0.01" \\
            // --gas="auto" \\
            // --gas-prices="0.025acudos" \\
            // --gas-adjustment="1.80" \\
            // --keyring-backend="test" \\
            // -y'`);

            // create orchestrator
            if (this.gravity === '1' && validatorNodeModel.orchEthAddress !== '') {
                const validatorOperatorData = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded keys show validator --bech val --keyring-backend test"`, false);
                const validatorOperatorDataLines = validatorOperatorData.split('\n');
                const validatorOperatorDataLineAddress = validatorOperatorDataLines.find((validatorOperatorDataLine) => validatorOperatorDataLine.indexOf('address:') !== -1);
                const validatorOperatorAddress = validatorOperatorDataLineAddress.substring(validatorOperatorDataLineAddress.indexOf(': ') + 2);

                const validatorOrchWalletString = await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded keys add orchestrator --keyring-backend test |& tee \\"\\$CUDOS_HOME/zero-account.wallet\\""`, false);
                const validatorOrchWallet = WalletModel.instanceByString(validatorOrchWalletString);
                this.validatorIdToOrchWalletModelMap.set(validatorNodeModel.validatorId, validatorOrchWallet);

                await this.fundFromFaucet(validatorOrchWallet.address, "1000000000000000000000acudos");

                await validatorSshHelper.exec(`docker container exec ${dockerContainerStartName} /bin/bash -c "cudos-noded tx gravity set-orchestrator-address ${validatorOperatorAddress} ${validatorOrchWallet.address} ${validatorNodeModel.orchEthAddress} --from validator --keyring-backend test --chain-id ${CHAIN_ID} -y"`, false);
            }
        }
    }

    async deployGravitySmartContract() {
        Log.main('Deploy gravity smart contract');

        const sentryNodeModel = this.topologyHelper.getFirstSentry();
        const sentrySshHelper = this.instancesService.getSshHelper(sentryNodeModel.computerId);

        let ethTokenContract = '0x28ea52f3ee46CaC5a72f72e8B3A387C0291d586d';
        // if (gravity === '1') {
        //     const gravityBridgeUiModel = this.topologyHelper.gravityBridgeUiModel;
        //     ethTokenContract = gravityBridgeUiModel.ethTokenContract;
        // }

        await sentrySshHelper.exec([
            `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/gravity-contract-deployer`,
            'cp ./gravity-contract-deployer.env.example ./gravity-contract-deployer.env',
            `sed -i "s~COSMOS_NODE=.*~COSMOS_NODE=\\"http://${sentryNodeModel.getDockerContainerStartName()}:26657\\"~g" ./gravity-contract-deployer.env`,
            `sed -i "s~ETH_NODE=.*~ETH_NODE=\\"${this.topologyHelper.params.gravity.ethrpc}\\"~g" ./gravity-contract-deployer.env`,
            `sed -i "s/ETH_PRIV_KEY_HEX=.*/ETH_PRIV_KEY_HEX=\\"${this.topologyHelper.params.gravity.contractDeploerEthPrivKey}\\"/g" ./gravity-contract-deployer.env`,
            `sed -i "s/CUDOS_ACCESS_CONTROL_ADDRESS=.*/CUDOS_ACCESS_CONTROL_ADDRESS=\\"0x25D16867E01197D048C1433e4335edefF43Cd75b\\"/g" ./gravity-contract-deployer.env`,
            `sed -i "s/DEFAULT_NETWORK=.*/DEFAULT_NETWORK=\\"rinkeby\\"/g" ./gravity-contract-deployer.env`,
            `sed -i "s/ETHERSCAN_API_KEY=.*/ETHERSCAN_API_KEY=\\"${this.topologyHelper.params.gravity.etherscanApiKey}\\"/g" ./gravity-contract-deployer.env`,
            `sed -i "s/CUDOS_TOKEN_ADDRESS=.*/CUDOS_TOKEN_ADDRESS=\\"${ethTokenContract}\\"/g" ./gravity-contract-deployer.env`,
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
            `(docker-compose --env-file ./gravity-contract-deployer.arg -f ./gravity-contract-deployer.yml -p cudos-gravity-contract-deployer down || true)`
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

            const cosmosOrchWallet = this.validatorIdToOrchWalletModelMap.get(validatorNodeModel.validatorId);
            const dockerContainerOrchestratorName = validatorNodeModel.getDockerContainerOrchestratorName();

            if (cosmosOrchWallet === undefined) {
                continue;
            }

            if (validatorNodeModel.ethPrivKey !== '') {
                await validatorSshHelper.exec([
                    `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/orchestrator`,
                    'cp ./orchestrator.env.example ./orchestrator.local01.env',
                    `sed -i "s/FEES=.*/FEES=\\"5000000000000acudos\\"/g" ./orchestrator.local01.env`,
                    `sed -i "s~GRPC=.*~GRPC=\\"http://${this.getDockerInternalHostByNodeId(validatorNodeModel.nodeId)}:9090\\"~g" ./orchestrator.local01.env`,
                    `sed -i "s~ETHRPC=.*~ETHRPC=\\"${this.topologyHelper.params.gravity.ethrpc}\\"~g" ./orchestrator.local01.env`,
                    `sed -i "s/CONTRACT_ADDR=.*/CONTRACT_ADDR=\\"${this.gravityContractAddress}\\"/g" ./orchestrator.local01.env`,
                    `sed -i "s/COSMOS_ORCH_MNEMONIC=.*/COSMOS_ORCH_MNEMONIC=\\"${cosmosOrchWallet.mnemonic}\\"/g" ./orchestrator.local01.env`,
                    `sed -i "s/ETH_PRIV_KEY_HEX=.*/ETH_PRIV_KEY_HEX=\\"${validatorNodeModel.ethPrivKey}\\"/g" ./orchestrator.local01.env`,
                    `sed -i "s/CONTAINER_NAME=.*/CONTAINER_NAME=${dockerContainerOrchestratorName}/g" ./orchestrator.local01.arg`,
                    ...NodesHelper.getDockerExtraHosts('orchestrator.release'),
                    `docker-compose --env-file ./orchestrator.local01.arg -f ./orchestrator.release.yml -p ${dockerContainerOrchestratorName} up --build -d`
                ]);
                
                this.nodeIdToOrchestratorInstanceContainerNamesMap.set(validatorNodeModel.nodeId, `${dockerContainerOrchestratorName}-release`);
            }

        }
    }

    async startGravityBridgeUi() {
        Log.main('Start gravity bridge ui');

        const gravityBridgeUiModel = this.topologyHelper.gravityBridgeUiModel;
        const gravityBridgeUiComputerModel = this.topologyHelper.getComputerModel(gravityBridgeUiModel.computerId);
        const gravityBridgeUiSshHelper = this.instancesService.getSshHelper(gravityBridgeUiModel.computerId);
        const sentryNodeModel = this.topologyHelper.getFirstSentry();

        const host = this.getExternalHostByComputerId(gravityBridgeUiModel.computerId);

        if (gravityBridgeUiComputerModel.isLocalDocker === false) {
            await gravityBridgeUiSshHelper.cloneRepos();
        }
        await gravityBridgeUiSshHelper.exec([
            `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/gravity-bridge-ui`,
            'cp ./gravity-bridge-ui.env.example ./gravity-bridge-ui.env',
            `sed -i "s~URL=.*~URL=http://${host}~g" ./gravity-bridge-ui.env`,
            `sed -i "s~ETHEREUM_RPC=.*~ETHEREUM_RPC=${this.topologyHelper.params.gravity.ethrpc}~g" ./gravity-bridge-ui.env`,
            `sed -i "s/CHAIN_NAME=.*/CHAIN_NAME=${CHAIN_NAME}/g" ./gravity-bridge-ui.env`,
            `sed -i "s/CHAIN_ID=.*/CHAIN_ID=${CHAIN_ID}/g" ./gravity-bridge-ui.env`,
            `sed -i "19s~RPC=.*~RPC=http://${this.getExternalHostByComputerId(sentryNodeModel.computerId)}:${sentryNodeModel.port26657}~g" ./gravity-bridge-ui.env`,
            `sed -i "s~API=.*~API=http://${this.getExternalHostByComputerId(sentryNodeModel.computerId)}:${sentryNodeModel.port1317}~g" ./gravity-bridge-ui.env`,
            `sed -i "s~STAKING=.*~STAKING=http://${host}:3000/validators~g" ./gravity-bridge-ui.env`,
            `sed -i "s~PARAMS_ENDPOINT=.*~PARAMS_ENDPOINT=http://${this.getExternalHostByComputerId(sentryNodeModel.computerId)}:${sentryNodeModel.port1317}/gravity/v1beta/params~g" ./gravity-bridge-ui.env`,
            `sed -i "s/ERC20_CONTRACT_ADDRESS=.*/ERC20_CONTRACT_ADDRESS=${gravityBridgeUiModel.ethTokenContract}/g" ./gravity-bridge-ui.env`,
            `sed -i "s/BRIDGE_CONTRACT_ADDRESS=.*/BRIDGE_CONTRACT_ADDRESS=${this.gravityContractAddress}/g" ./gravity-bridge-ui.env`,
            'cp ./gravity-bridge-ui.dev.arg ./gravity-bridge-ui.arg',
            'sed -i "s/ENV_FILE=.*/ENV_FILE=gravity-bridge-ui.env/g" ./gravity-bridge-ui.arg',
            `sed -i "s/container_name:.*/container_name: ${GRAVITY_BRIDGE_UI_CONTAINER_NAME}/g" ./gravity-bridge-ui.release.yml`,
            ...NodesHelper.getDockerExtraHosts('gravity-birdge-ui.release'),
            `docker-compose --env-file ./gravity-bridge-ui.arg -f ./gravity-bridge-ui.release.yml -p ${GRAVITY_BRIDGE_UI_CONTAINER_NAME} up --build -d`
        ]);
    }
    
    // async startFaucet() {
    //     Log.main('Start faucet');
        
    //     const utilsModel = this.topologyHelper.utilsModel;
    //     const utilsComputerModel = this.topologyHelper.getComputerModel(utilsModel.computerId);
    //     const utilsSshHelper = this.instancesService.getSshHelper(utilsModel.computerId);
    //     const sentryNodeModel = this.topologyHelper.getFirstSentry();
        
    //     if (utilsComputerModel.isLocalDocker === false) {
    //         await utilsSshHelper.cloneRepos();
    //     }
    //     await utilsSshHelper.exec([
    //         `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/faucet`,
    //         'cp ./faucet.env.example ./faucet.local.env',
    //         `sed -i "s/CREDIT_AMOUNT=.*/CREDIT_AMOUNT=\\"10000000000000000000\\"/g" ./faucet.local.env`,
    //         `sed -i "s/MAX_CREDIT=.*/MAX_CREDIT=\\"10000000000000000000\\"/g" ./faucet.local.env`,
    //         `sed -i "s~NODE=.*~NODE=\\"http://${this.getDockerInternalHostByNodeId(sentryNodeModel.nodeId)}:26657\\"~g" ./faucet.local.env`,
    //         `sed -i "s/MNEMONIC=.*/MNEMONIC=\\"${this.faucetMnemonic}\\"/g" ./faucet.local.env`,
    //         `sed -i "s/GOOGLE_API_KEY=.*/GOOGLE_API_KEY=\\"${utilsModel.googleApiKey}\\"/g" ./faucet.local.env`,
    //         `sed -i "s/CAPTCHA_SITE_KEY=.*/CAPTCHA_SITE_KEY=\\"${utilsModel.captchaSiteKey}\\"/g" ./faucet.local.env`,
    //         `sed -i "s/GOOGLE_PROJECT_ID=.*/GOOGLE_PROJECT_ID=\\"${utilsModel.googleProjectId}\\"/g" ./faucet.local.env`,
    //         `sed -i "s/container_name:.*/container_name: ${FAUCET_CONTAINER_NAME}/g" ./faucet.yml`,
    //         ...NodesHelper.getDockerExtraHosts('faucet'),
    //         `docker-compose --env-file ./faucet.local.arg -f ./faucet.yml -p ${FAUCET_CONTAINER_NAME} up --build -d`
    //     ]);
    // }

    // async startExplorer() {
    //     Log.main('Start explorer');

    //     const utilsModel = this.topologyHelper.utilsModel;
    //     const utilsComputerModel = this.topologyHelper.getComputerModel(utilsModel.computerId);
    //     const utilsSshHelper = this.instancesService.getSshHelper(utilsModel.computerId);
    //     const sentryNodeModel = this.topologyHelper.getFirstSentry();

    //     const host = this.getExternalHostByComputerId(utilsModel.computerId);

    //     if (utilsComputerModel.isLocalDocker === false) {
    //         await utilsSshHelper.cloneRepos();
    //     }
    //     await utilsSshHelper.exec([
    //         `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/explorer`,
    //         'cp ./explorer.env.example ./explorer.local.env',
    //         `sed -i "s~MONGO_URL=.*~MONGO_URL=mongodb://root:cudos-root-db-pass@cudos-explorer-mongodb:27017~g" ./explorer.local.env`,
    //         `sed -i "s~ROOT_URL=.*~ROOT_URL=http://${host}~g" ./explorer.local.env`,
    //         `sed -i "s~GENESIS_TIME=.*"~GENESIS_TIME=\\"${this.genesisTime}\\"~g" ./explorer.local.arg`,
    //         `sed -i "s~FAUCET_URL=.*~FAUCET_URL=\\"http://${host}:5000\\"~g" ./explorer.local.arg`,
    //         `sed -i "s~INTERNAL_RPC_URL=.*~INTERNAL_RPC_URL=\\"http://${this.getDockerInternalHostByNodeId(sentryNodeModel.nodeId)}:26657\\"~g" ./explorer.local.arg`,
    //         `sed -i "s~INTERNAL_API_URL=.*~INTERNAL_API_URL=\\"http://${this.getDockerInternalHostByNodeId(sentryNodeModel.nodeId)}:1317\\"~g" ./explorer.local.arg`,
    //         `sed -i "s~EXTERNAL_RPC_URL=.*~EXTERNAL_RPC_URL=\\"http://${this.getExternalHostByComputerId(sentryNodeModel.computerId)}:${sentryNodeModel.port26657}\\"~g" ./explorer.local.arg`,
    //         `sed -i "s~EXTERNAL_API_URL=.*~EXTERNAL_API_URL=\\"http://${this.getExternalHostByComputerId(sentryNodeModel.computerId)}:${sentryNodeModel.port1317}\\"~g" ./explorer.local.arg`,
    //         `sed -i "s~EXTERNAL_STAKING_URL=.*~EXTERNAL_STAKING_URL=\\"http://${host}:3000/validators\\"~g" ./explorer.local.arg`,
    //         `sed -i "s/CHAIN_NAME=.*/CHAIN_NAME=\\"${CHAIN_NAME}\\"/g" ./explorer.local.arg`,
    //         `sed -i "s/CHAIN_ID=.*/CHAIN_ID=\\"${CHAIN_ID}\\"/g" ./explorer.local.arg`,
    //         `sed -i "s/container_name:.*/container_name: ${EXPLORER_MONGO_CONTAINER_NAME}/g" ./explorer.yml`,
    //         `sed -i "s/container_name:.*/container_name: ${EXPLORER_CONTAINER_NAME}/g" ./explorer.yml`,
    //         `sed -i "s/- cudos-explorer-mongodb/- cudos-explorer-mongodb\\r\\n    extra_hosts:\\r\\n      - \\"host.docker.internal:host-gateway\\"/g" ./explorer.yml`,
    //         `docker-compose --env-file ./explorer.local.arg -f ./explorer.yml -p ${EXPLORER_CONTAINER_NAME} up --build -d`
    //     ]);
    // }

    // async startMonitoring() {
    //     Log.main('Start monitoring');

    //     const monitoringModel = this.topologyHelper.monitoringModel;
    //     const monitoringComputerModel = this.topologyHelper.getComputerModel(monitoringModel.computerId);
    //     const monitoringSshHelper = this.instancesService.getSshHelper(monitoringModel.computerId);

    //     const sentryNodeModel = this.topologyHelper.getFirstSentry();

    //     const nodeModelsEchos = [];
    //     this.topologyHelper.nodesMap.forEach((nodeModel) => {
    //         const host = this.getDockerInternalHostByNodeId(nodeModel.nodeId);
    //         nodeModelsEchos.push(`echo "      - targets: ['${host}:26660']" >> ./config/prometheus.local.yml`);
    //         nodeModelsEchos.push(`echo "        labels:" >> ./config/prometheus.local.yml`);
    //         nodeModelsEchos.push(`echo "          instance: ${host}" >> ./config/prometheus.local.yml`);
    //     });

    //     if (monitoringComputerModel.isLocalDocker === false) {
    //         await monitoringSshHelper.cloneRepos();
    //     }
    //     await monitoringSshHelper.exec([
    //         ...NodesHelper.getUserEnv(),
    //         `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/monitoring`,
    //         'cp ./monitoring.env.example ./monitoring.local.env',
    //         `sed -i "s~NODE_ADDR=.*~NODE_ADDR=${this.getDockerInternalHostByNodeId(sentryNodeModel.nodeId)}:9090~g" ./monitoring.local.env`,
    //         `sed -i "s~TENDERMINT_ADDR=.*~TENDERMINT_ADDR=http://${this.getDockerInternalHostByNodeId(sentryNodeModel.nodeId)}:26657~g" ./monitoring.local.env`,
    //         `echo "global:" > ./config/prometheus.local.yml`,
    //         `echo "  scrape_interval: 15s" >> ./config/prometheus.local.yml`,
    //         `echo "  evaluation_interval: 30s" >> ./config/prometheus.local.yml`,
    //         `echo "" >> ./config/prometheus.local.yml`,
    //         `echo "scrape_configs:" >> ./config/prometheus.local.yml`,
    //         `echo "  - job_name: cudosnetwork" >> ./config/prometheus.local.yml`,
    //         `echo "    static_configs:" >> ./config/prometheus.local.yml`,
    //         ...nodeModelsEchos,
    //         `echo "  - job_name: validators" >> ./config/prometheus.local.yml`,
    //         `echo "    scrape_interval: 15s" >> ./config/prometheus.local.yml`,
    //         `echo "    metrics_path: /metrics/validators" >> ./config/prometheus.local.yml`,
    //         `echo "    static_configs:" >> ./config/prometheus.local.yml`,
    //         `echo "      - targets:" >> ./config/prometheus.local.yml`,
    //         `echo "        - cudos-monitoring-exporter:9300" >> ./config/prometheus.local.yml`,
    //         `docker-compose --env-file ./monitoring.local.arg -f ./monitoring.yml -p cudos-monitoring-local up --build -d`
    //     ]);
    // }

    getSeedsByValidatorId(validatorId) {
        const seedNodeModels = this.topologyHelper.getSeeds(validatorId);
        return seedNodeModels.map((seedNodeModel) => {
            const seedTendermintNodeId = this.nodeIdTotendermintNodeId.get(seedNodeModel.nodeId);
            const seedHost = this.getDockerInternalHostByNodeId(seedNodeModel.nodeId);
            return `${seedTendermintNodeId}@${seedHost}:26656`;
        }).join(',');
    }

    getSentriesByValidatorId(validatorId) {
        const sentryNodeModels = this.topologyHelper.getSentries(validatorId);
        return sentryNodeModels.map((sentryNodeModel) => {
            const sentryTendermintNodeId = this.nodeIdTotendermintNodeId.get(sentryNodeModel.nodeId);
            const sentryHost = this.getDockerInternalHostByNodeId(sentryNodeModel.nodeId);
            return `${sentryTendermintNodeId}@${sentryHost}:26656`;
        }).join(',');
    }

    getDockerInternalHostByNodeId(nodeId) {
        const nodeModel = this.topologyHelper.getNodeModel(nodeId);
        const computerModel = this.topologyHelper.getComputerModel(nodeModel.computerId);
        return computerModel.isLocalDocker === true ? this.nodeIdToNodeInstanceContainerNamesMap.get(nodeModel.nodeId) : computerModel.ip;
    }

    getExternalHostByComputerId(computerId) {
        const computerModel = this.topologyHelper.getComputerModel(computerId);
        return computerModel.isLocalDocker === true ? 'localhost' : computerModel.ip;
    }

    async fundFromFaucet(recipientWalletAddress, amount) {
        const rootValidatorNodeModel = this.topologyHelper.rootValidator;
        const rootValidatorSshHelper = this.instancesService.getSshHelper(rootValidatorNodeModel.computerId);
        const txResultString = await rootValidatorSshHelper.exec(`docker container exec ${ValidatorNodeModel.getRootValidatorDockerContainerStartName()} /bin/bash -c "echo 123123123 | cudos-noded tx bank send ${this.faucetAddress} ${recipientWalletAddress} ${amount} --from faucet --keyring-backend os --chain-id ${CHAIN_ID} -y"`, false);
        await rootValidatorSshHelper.awaitForTx(ValidatorNodeModel.getRootValidatorDockerContainerStartName(), txResultString);
    }

    onExit = async () => {
        await this.stopNodesInstances();
        if (this.gravity === '1') {
            await this.stopOrchestratorInstances();
            // await this.stopGravityBridgeUiInstance();
        }
        // if (this.faucet === '1') {
        //     await this.stopFaucetInstance();
        // }
        // if (this.explorer === '1') {
        //     await this.stopExplorerInstances();
        // }
        // if (this.monitoring === '1') {
        //     await this.stopMonitoring();
        // }
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

    // async stopGravityBridgeUiInstance() {
    //     Log.main('Stop gravity bridge ui\'s instance');

    //     const tasks = [];

    //     const gravityBridgeUiModel = this.topologyHelper.gravityBridgeUiModel;
    //     const gravityBridgeUiSshHelper = this.instancesService.getSshHelper(gravityBridgeUiModel.computerId);
    //     tasks.push(gravityBridgeUiSshHelper.exec([
    //         `docker stop ${GRAVITY_BRIDGE_UI_CONTAINER_NAME}`,
    //         `docker container rm ${GRAVITY_BRIDGE_UI_CONTAINER_NAME}`
    //     ], false));

    //     await Promise.all(tasks);
    // }

    // async stopFaucetInstance() {
    //     Log.main('Stop faucet instances');

    //     const tasks = [];

    //     const gravityBridgeUiModel = this.topologyHelper.gravityBridgeUiModel;
    //     const gravityBridgeUiSshHelper = this.instancesService.getSshHelper(gravityBridgeUiModel.computerId);
    //     tasks.push(gravityBridgeUiSshHelper.exec([
    //         `docker stop ${FAUCET_CONTAINER_NAME}`,
    //         `docker container rm ${FAUCET_CONTAINER_NAME}`,
    //     ], false));

    //     await Promise.all(tasks);
    // }

    // async stopExplorerInstances() {
    //     Log.main('Stop explorer instances');

    //     const tasks = [];

    //     const gravityBridgeUiModel = this.topologyHelper.gravityBridgeUiModel;
    //     const gravityBridgeUiSshHelper = this.instancesService.getSshHelper(gravityBridgeUiModel.computerId);
    //     tasks.push(gravityBridgeUiSshHelper.exec([
    //         `docker stop ${EXPLORER_CONTAINER_NAME}`,
    //         `docker container rm ${EXPLORER_CONTAINER_NAME}`,
    //         `docker stop ${EXPLORER_MONGO_CONTAINER_NAME}`,
    //         `docker container rm ${EXPLORER_MONGO_CONTAINER_NAME}`
    //     ], false));

    //     await Promise.all(tasks);
    // }

    // async stopMonitoring() {
    //     Log.main('Stop monitoring instances');

    //     const tasks = [];

    //     const monitoringModel = this.topologyHelper.monitoringModel;
    //     const monitoringSshHelper = this.instancesService.getSshHelper(monitoringModel.computerId);
    //     tasks.push(monitoringSshHelper.exec([
    //         `docker stop cudos-monitoring-prometeus`,
    //         `docker container rm cudos-monitoring-prometeus`,
    //         `docker stop cudos-monitoring-graphana`,
    //         `docker container rm cudos-monitoring-graphana`,
    //         `docker stop cudos-monitoring-exporter`,
    //         `docker container rm cudos-monitoring-exporter`,
    //     ], false));

    //     await Promise.all(tasks);
    // }

}

module.exports = NodesService;
