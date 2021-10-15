class GravityBridgeUiModel {

    constructor() {
        this.computerId = '';
    }

    static fromJson(json) {
        if (json === null) {
            return null;
        }

        const model = new GravityBridgeUiModel();

        model.computerId = json.computerId ?? model.computerId;
        
        return model;
    }

}

module.exports = GravityBridgeUiModel;