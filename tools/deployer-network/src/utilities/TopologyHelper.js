const fs = require('fs').promises;

const ComputerModel = require('../models/ComputerModel');
const RootValidatorNodeModel = require('../models/RootValidatorNodeModel');
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
    }

    static async instanceByPath(path) {
        const helper = new TopologyHelper();

        const content = await fs.readFile(path);
        const jsonData = JSON.parse(content);

        helper.computers = jsonData.computers.map((computerJson) => {
            return ComputerModel.fromJson(computerJson);
        });
        helper.rootValidator = RootValidatorNodeModel.fromJson(jsonData.nodes.rootValidator);
        helper.validators = jsonData.nodes.validators.map((validatorJson) => {
            return ValidatorNodeModel.fromJson(validatorJson);
        });
        helper.seeds = jsonData.nodes.seeds.map((seedJson) => {
            return SeedNodeModel.fromJson(seedJson);
        });
        helper.sentries = jsonData.nodes.sentries.map((sentryJson) => {
            return SentryNodeModel.fromJson(sentryJson);
        });

        return helper;
    }

}

module.exports = TopologyHelper;