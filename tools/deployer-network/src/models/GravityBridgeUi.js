class GravityBridgeUiModel {

    constructor() {
        this.computerId = '';
        this.ethTokenContract = '';
    }

    static fromJson(json) {
        if (json === null) {
            return null;
        }

        const model = new GravityBridgeUiModel();

        model.computerId = json.computerId ?? model.computerId;
        model.ethTokenContract = json.ethTokenContract ?? model.ethTokenContract;
        
        return model;
    }

}

module.exports = GravityBridgeUiModel;