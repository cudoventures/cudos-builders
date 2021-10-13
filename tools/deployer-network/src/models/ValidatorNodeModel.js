const AbsNodeModel = require('./AbsNodeModel');

class ValidatorNodeModel extends AbsNodeModel {

    constructor() {
        super();
        this.validatorId = "";
        this.orchEthAddress = "";
    }

    static fromJson(json) {
        if (json === null) {
            return null;
        }

        const model = AbsNodeModel.fromJson(json, new ValidatorNodeModel());

        model.validatorId = json.validatorId ?? model.validatorId;
        model.orchEthAddress = json.orchEthAddress ?? model.orchEthAddress;

        return model;
    }

}

module.exports = ValidatorNodeModel;