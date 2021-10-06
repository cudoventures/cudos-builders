class AbsNodeModel {

    constructor() {
        this.computerId = "";
    }

    static fromJson(json, model = null) {
        if (json === null) {
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