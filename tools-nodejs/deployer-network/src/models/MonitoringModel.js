class MonitoringModel {

    constructor() {
        this.computerId = '';
    }

    static fromJson(json) {
        if (json === null || json === undefined) {
            return null;
        }

        const model = new MonitoringModel();

        model.computerId = json.computerId ?? model.computerId;
        
        return model;
    }

}

module.exports = MonitoringModel;