const AbsNodeModel = require('./AbsNodeModel');

class ValidatorNodeModel extends AbsNodeModel {

    constructor() {
        super();
        this.validatorId = "";
        this.orchEthAddress = "";
        this.ethPrivKey = "";

        this.port26656 = 0;
        this.port26657 = 0;
        this.port26660 = 0;
    }

    getDockerContainerInitName() {
        return `cudos-deployer-network-init-full-node-${this.nodeId}`;
    }

    getDockerContainerConfigName() {
        return `cudos-deployer-network-config-full-node-${this.nodeId}`;
    }

    getDockerContainerStartName() {
        return `cudos-deployer-network-start-full-node-${this.nodeId}`;
    }

    getDockerContainerOrchestratorName() {
        return `cudos-deployer-network-start-orchestrator-${this.nodeId}`;
    }

    static getRootValidatorDockerContainerStartName() {
        return 'cudos-deployer-network-start-root-node';
    }

    static fromJson(json) {
        if (json === null || json === undefined) {
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