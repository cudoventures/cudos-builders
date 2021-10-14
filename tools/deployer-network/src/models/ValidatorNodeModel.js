const AbsNodeModel = require('./AbsNodeModel');

class ValidatorNodeModel extends AbsNodeModel {

    constructor() {
        super();
        this.validatorId = "";
        this.orchEthAddress = "";
    }

    getDockerContainerInitName(i) {
        return `cudos-init-full-node-${this.validatorId}-${i + 1}`;
    }

    getDockerContainerConfigName(i) {
        return `cudos-config-full-node-${this.validatorId}-${i + 1}`;
    }

    getDockerContainerStartName(i) {
        return `cudos-start-full-node-${this.validatorId}-${i + 1}`;
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

        return model;
    }

}

module.exports = ValidatorNodeModel;