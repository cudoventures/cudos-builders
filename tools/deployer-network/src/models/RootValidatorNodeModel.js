const AbsNodeModel = require('./AbsNodeModel');

class RootValidatorNodeModel extends AbsNodeModel {

    static fromJson(json) {
        if (json === null) {
            return null;
        }

        const model = AbsNodeModel.fromJson(json, new RootValidatorNodeModel());

        return model;
    }

}

module.exports = RootValidatorNodeModel;