const AbsNodeModel = require('./AbsNodeModel');

class SentryNodeModel extends AbsNodeModel {

    constructor() {
        super();
        this.validatorId = "";
    }

    getDockerContainerInitName() {
        return `cudos-deployer-network-init-sentry-node-${this.nodeId}`;
    }

    getDockerContainerStartName() {
        return `cudos-deployer-network-start-sentry-node-${this.nodeId}`;
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