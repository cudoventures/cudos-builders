const AbsNodeModel = require('./AbsNodeModel');

class SeedNodeModel extends AbsNodeModel {

    constructor() {
        super();
        this.validatorId = "";

        this.port26656 = 0;
        this.prot26657 = 0;
    }

    getDockerContainerInitName() {
        return `cudos-deployer-network-init-seed-node-${this.nodeId}`;
    }

    getDockerContainerStartName() {
        return `cudos-deployer-network-start-seed-node-${this.nodeId}`;
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