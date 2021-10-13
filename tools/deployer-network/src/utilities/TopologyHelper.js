const fs = require('fs').promises;

const ComputerModel = require('../models/ComputerModel');
const ValidatorNodeModel = require('../models/ValidatorNodeModel');
const SeedNodeModel = require('../models/SeedNodeModel');
const SentryNodeModel = require('../models/SentryNodeModel');

class TopologyHelper {

    constructor() {
        this.computers = [];
        this.rootValidator = null;
        this.validators = [];
        this.sentries = [];
        this.seeds = [];

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

}

module.exports = TopologyHelper;