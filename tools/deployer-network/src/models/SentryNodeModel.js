const AbsNodeModel = require('./AbsNodeModel');

class SentryNodeModel extends AbsNodeModel {

    constructor() {
        super();
        this.validatorId = "";

        this.port26656 = 0;
        this.port26657 = 0;
        this.port1317 = 0;
        this.port9090 = 0;
    }

    getDockerContainerInitName() {
        return `cudos-deployer-network-init-sentry-node-${this.nodeId}`;
    }

    getDockerContainerStartName() {
        return `cudos-deployer-network-start-sentry-node-${this.nodeId}`;
    }

    static fromJson(json) {
        if (json === null || json === undefined) {
            return null;
        }

        const model = AbsNodeModel.fromJson(json, new SentryNodeModel());

        model.validatorId = json.validatorId ?? model.validatorId;

        return model;
    }

}

module.exports = SentryNodeModel;