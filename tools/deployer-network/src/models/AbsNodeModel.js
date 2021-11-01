class AbsNodeModel {

    constructor() {
        this.computerId = "";
        this.nodeId = 0;
    }

    static fromJson(json, model = null) {
        if (json === null || json === undefined) {
            return null;
        }

        if (model === null) {
            model = new AbsNodeModel();
        }

        model.computerId = json.computerId ?? model.computerId;

        return model;
    }

}

module.exports = AbsNodeModel;