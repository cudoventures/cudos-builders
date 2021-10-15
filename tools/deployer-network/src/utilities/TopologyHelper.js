const fs = require('fs').promises;

const ComputerModel = require('../models/ComputerModel');
const ValidatorNodeModel = require('../models/ValidatorNodeModel');
const SeedNodeModel = require('../models/SeedNodeModel');
const SentryNodeModel = require('../models/SentryNodeModel');
const ParamsModel = require('../models/ParamsModel');

class TopologyHelper {

    constructor() {
        this.computers = [];
        this.rootValidator = null;
        this.validators = [];
        this.sentries = [];
        this.seeds = [];
        this.gravityBridgeUiModel = null;
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
        helper.gravityBridgeUiModel = jsonData.nodes.gravityBridgeUi;
        helper.params = ParamsModel.fromJson(jsonData.params);

        helper.validate();

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

    validate() {
        this.nodesMap.forEach((nodeModel) => {
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

        validateValidator(this.rootValidator.validatorId);
        this.validators.forEach((validatorNodeModel) => {
            validateValidator(validatorNodeModel.validatorId);
        });
    }

}

module.exports = TopologyHelper;