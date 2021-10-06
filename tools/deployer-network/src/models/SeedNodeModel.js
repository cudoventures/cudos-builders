const AbsNodeModel = require('./AbsNodeModel');

class SeedNodeModel extends AbsNodeModel {

    constructor() {
        super();
        this.validatorId = "";
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