class AbsNodeModel {

    constructor() {
        this.computerId = "";
        this.nodeId = 0;
        this.monitoring = 1;
    }

    hasMonitoring() {
        return this.monitoring === 1;
    }

    static fromJson(json, model = null) {
        if (json === null || json === undefined) {
            return null;
        }

        if (model === null) {
            model = new AbsNodeModel();
        }

        model.computerId = json.computerId ?? model.computerId;
        model.monitoring = parseInt(json.monitoring ?? model.monitoring);

        return model;
    }

}

module.exports = AbsNodeModel;