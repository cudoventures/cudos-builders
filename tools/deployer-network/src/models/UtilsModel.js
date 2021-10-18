class UtilsModel {

    constructor() {
        this.computerId = '';
        this.googleApiKey = '';
        this.captchaSiteKey = '';
        this.googleProjectId = '';
    }

    static fromJson(json) {
        if (json === null) {
            return null;
        }

        const model = new UtilsModel();

        model.computerId = json.computerId ?? model.computerId;
        model.googleApiKey = json.googleApiKey ?? model.googleApiKey;
        model.captchaSiteKey = json.captchaSiteKey ?? model.captchaSiteKey;
        model.googleProjectId = json.googleProjectId ?? model.googleProjectId;
        
        return model;
    }

}

module.exports = UtilsModel;