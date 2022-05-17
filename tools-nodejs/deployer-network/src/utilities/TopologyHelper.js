const fs = require('fs').promises;

const ComputerModel = require('../models/ComputerModel');
const ValidatorNodeModel = require('../models/ValidatorNodeModel');
const SeedNodeModel = require('../models/SeedNodeModel');
const SentryNodeModel = require('../models/SentryNodeModel');
const GravityBridgeUiModel = require('../models/GravityBridgeUiModel');
const UtilsModel = require('../models/UtilsModel');
const MonitoringModel = require('../models/MonitoringModel');
const ParamsModel = require('../models/ParamsModel');

class TopologyHelper {

    constructor() {
        this.computers = [];
        this.rootValidator = null;
        this.validators = [];
        this.sentries = [];
        this.seeds = [];
        this.gravityBridgeUiModel = null;
        this.utilsModel = null;
        this.monitoringModel = null;
        this.params = null;

        this.genNodeIds = 0;

        this.computersMap = new Map();
        this.nodesMap = new Map();
    }

    static async instanceByPath(path) {
        const helper = new TopologyHelper();

        const content = await fs.readFile(path);
        const jsonData = JSON.parse(content);

        helper.computers = jsonData.computers.map((computerJson) => {
            const model = ComputerModel.fromJson(computerJson);
            helper.computersMap.set(model.id, model);
            return model;
        });
        helper.rootValidator = ValidatorNodeModel.fromJson(jsonData.nodes.rootValidator);
        helper.addNodeModel(helper.rootValidator);
        helper.validators = jsonData.nodes.validators.map((validatorJson) => {
            const model = ValidatorNodeModel.fromJson(validatorJson);
            helper.addNodeModel(model);
            model.orchEthAddress = '';
            model.ethPrivKey = '';
            return model;
        });
        helper.seeds = jsonData.nodes.seeds.map((seedJson) => {
            const model = SeedNodeModel.fromJson(seedJson);
            helper.addNodeModel(model);
            return model;
        });
        helper.sentries = jsonData.nodes.sentries.map((sentryJson) => {
            const model = SentryNodeModel.fromJson(sentryJson);
            helper.addNodeModel(model);
            return model;
        });
        // helper.gravityBridgeUiModel = GravityBridgeUiModel.fromJson(jsonData.nodes.gravityBridgeUi);
        // helper.utilsModel = UtilsModel.fromJson(jsonData.nodes.utils);
        // helper.monitoringModel = MonitoringModel.fromJson(jsonData.nodes.monitoring);
        helper.params = ParamsModel.fromJson(jsonData.params);

        return helper;
    }

    addNodeModel(nodeModel) {
        nodeModel.nodeId = ++this.genNodeIds;
        this.nodesMap.set(nodeModel.nodeId, nodeModel);
    }
    
    getComputerModel(computerId) {
        return this.computersMap.get(computerId);
    }

    getNodeModel(nodeId) {
        return this.nodesMap.get(nodeId);
    }

    getSeeds(validatorId) {
        return this.seeds.filter((seedNodeModel) => {
            return seedNodeModel.validatorId === validatorId;
        });
    }

    getSentries(validatorId) {
        return this.sentries.filter((sentryNodeModel) => {
            return sentryNodeModel.validatorId === validatorId;
        });
    }

    getFirstSentry() {
        return this.sentries[0];
    }

    validate(gravity, explorer, faucet, monitoring) {
        let hasLocal = false, hasRemote = false;
        this.computers.forEach((computerModel) => {
            hasLocal = hasLocal || computerModel.isLocalDocker === true;
            hasRemote = hasRemote || computerModel.isLocalDocker === false;
        });
        
        if (hasLocal === true && hasRemote === true) {
            throw new Error('You must either only local docker instances or only remote machines');
        }

        const usedComputerIds = new Set();
        this.nodesMap.forEach((nodeModel) => {
            if (usedComputerIds.has(nodeModel.computerId) === true) {
                throw new Error(`Computer with id (${nodeModel.computerId}) has been used by more than a single node`);
            }
            usedComputerIds.add(nodeModel.computerId);

            const computerModel = this.getComputerModel(nodeModel.computerId);
            if (computerModel === undefined) {
                throw new Error(`Node with id (${nodeModel.nodeId}) does not have a computer instance`);
            }
        });

        const validateValidator = (validatorId) => {
            const seedNodeModels = this.getSeeds(validatorId);
            if (seedNodeModels.length === 0) {
                throw new Error(`Validator with id (${validatorId}) does not have seeds`);
            }
            const sentriesNodeModels = this.getSentries(validatorId);
            if (sentriesNodeModels.length === 0) {
                throw new Error(`Validator with id (${validatorId}) does not have sentries`);
            }
        }

        if (this.rootValidator === null) {
            throw new Error(`You must define a root validator`);
        }

        validateValidator(this.rootValidator.validatorId);
        this.validators.forEach((validatorNodeModel) => {
            validateValidator(validatorNodeModel.validatorId);
        });

        if (gravity === '1') {
            // if (usedComputerIds.has(this.gravityBridgeUiModel.computerId) === true) {
            //     throw new Error(`Computer with id (${this.gravityBridgeUiModel.computerId}) has been used by more than a single node`);
            // }
            // usedComputerIds.add(this.gravityBridgeUiModel.computerId);

            // if (this.getComputerModel(this.gravityBridgeUiModel.computerId) === undefined) {
            //     throw new Error(`GravityBridgeUi does not have a computer instance`);
            // }

            // if (this.gravityBridgeUiModel.ethTokenContract === '') {
            //     throw new Error(`Gravity does not have a token coontract`);
            // }

            if (this.params.gravity.ethrpc === '') {
                throw new Error(`Gravity does not have a ethereum full node`);
            }

            if (this.params.gravity.contractDeploerEthPrivKey === '') {
                throw new Error(`Gravity does not have a contract deployer private key`);
            }
        }

        // if (explorer === '1' ||  faucet === '1') {
        //     if (usedComputerIds.has(this.utilsModel.computerId) === true) {
        //         throw new Error(`Computer with id (${this.utilsModel.computerId}) has been used by more than a single node`);
        //     }
        //     usedComputerIds.add(this.utilsModel.computerId);

        //     if (this.getComputerModel(this.utilsModel.computerId) === undefined) {
        //         throw new Error(`Utils does not have a computer instance`);
        //     }

        //     if (faucet === '1') {
        //         if (this.utilsModel.googleApiKey === '') {
        //             throw new Error(`Utils does not have a google api key`);
        //         }

        //         if (this.utilsModel.captchaSiteKey === '') {
        //             throw new Error(`Utils does not have a google captcha site key`);
        //         }

        //         if (this.utilsModel.googleProjectId === '') {
        //             throw new Error(`Utils does not have a google project id`);
        //         }
        //     }
        // }

        // if (monitoring === '1') {
        //     if (usedComputerIds.has(this.monitoringModel.computerId) === true) {
        //         throw new Error(`Computer with id (${this.monitoringModel.computerId}) has been used by more than a single node`);
        //     }
        //     usedComputerIds.add(this.monitoringModel.computerId);
        // }

    }

}

module.exports = TopologyHelper;
