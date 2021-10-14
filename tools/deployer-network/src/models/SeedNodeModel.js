const AbsNodeModel = require('./AbsNodeModel');

class SeedNodeModel extends AbsNodeModel {

    constructor() {
        super();
        this.validatorId = "";
    }

    getDockerContainerInitName(validatorNodeModel, i) {
        return `cudos-init-seed-node-${validatorNodeModel.validatorId}-${i + 1}`;
    }

    getDockerContainerStartName(validatorNodeModel, i) {
        return `cudos-start-seed-node-${validatorNodeModel.validatorId}-${i + 1}`;
    }

    static fromJson(json) {
        if (json === null) {
            return null;
        }

        const model = AbsNodeModel.fromJson(json, new SeedNodeModel());

        model.validatorId = json.validatorId ?? model.validatorId;

        return model;
    }

}

module.exports = SeedNodeModel;