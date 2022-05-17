class ParamsModel {

    constructor() {
        this.gravity = new ParamsGravityModel();
    }

    static fromJson(json) {
        if (json === null || json === undefined) {
            return null;
        }

        const model = new ParamsModel();

        model.gravity.ethrpc = json.gravity.ethrpc ?? model.gravity.ethrpc;
        model.gravity.contractDeploerEthPrivKey = json.gravity.contractDeploerEthPrivKey ?? model.gravity.contractDeploerEthPrivKey;
        model.gravity.etherscanApiKey = json.gravity.etherscanApiKey ?? model.gravity.etherscanApiKey;

        return model;
    }

}

class ParamsGravityModel {

    constructor() {
        this.ethrpc = "";
        this.contractDeploerEthPrivKey = "";
        this.etherscanApiKey = "";
    }

}

module.exports = ParamsModel;
