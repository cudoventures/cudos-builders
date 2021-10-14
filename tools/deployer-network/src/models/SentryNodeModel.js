const AbsNodeModel = require('./AbsNodeModel');

class SentryNodeModel extends AbsNodeModel {

    constructor() {
        super();
        this.validatorId = "";
    }

    getDockerContainerInitName(validatorNodeModel, i) {
        return `cudos-init-sentry-node-${validatorNodeModel.validatorId}-${i + 1}`;
    }

    getDockerContainerStartName(validatorNodeModel, i) {
        return `cudos-start-sentry-node-${validatorNodeModel.validatorId}-${i + 1}`;
    }

    static fromJson(json) {
        if (json === null) {
            return null;
        }

        const model = AbsNodeModel.fromJson(json, new SentryNodeModel());

        model.validatorId = json.validatorId ?? model.validatorId;

        return model;
    }

}

module.exports = SentryNodeModel;