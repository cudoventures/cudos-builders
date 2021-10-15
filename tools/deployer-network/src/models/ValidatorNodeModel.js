const AbsNodeModel = require('./AbsNodeModel');

class ValidatorNodeModel extends AbsNodeModel {

    constructor() {
        super();
        this.validatorId = "";
        this.orchEthAddress = "";
        this.ethPrivKey = "";
    }

    getDockerContainerInitName() {
        return `cudos-init-full-node-${this.nodeId}`;
    }

    getDockerContainerConfigName() {
        return `cudos-config-full-node-${this.nodeId}`;
    }

    getDockerContainerStartName() {
        return `cudos-start-full-node-${this.nodeId}`;
    }

    getDockerContainerOrchestratorName() {
        return `cudos-start-orchestrator-${this.nodeId}`;
    }

    static getRootValidatorDockerContainerStartName() {
        return 'cudos-start-root-node';
    }

    static fromJson(json) {
        if (json === null) {
            return null;
        }

        const model = AbsNodeModel.fromJson(json, new ValidatorNodeModel());

        model.validatorId = json.validatorId ?? model.validatorId;
        model.orchEthAddress = json.orchEthAddress ?? model.orchEthAddress;
        model.ethPrivKey = json.ethPrivKey ?? model.ethPrivKey;

        return model;
    }

}

module.exports = ValidatorNodeModel;