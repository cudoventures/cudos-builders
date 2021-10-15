const AbsNodeModel = require('./AbsNodeModel');

class SentryNodeModel extends AbsNodeModel {

    constructor() {
        super();
        this.validatorId = "";
    }

    getDockerContainerInitName() {
        return `cudos-init-sentry-node-${this.nodeId}`;
    }

    getDockerContainerStartName() {
        return `cudos-start-sentry-node-${this.nodeId}`;
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