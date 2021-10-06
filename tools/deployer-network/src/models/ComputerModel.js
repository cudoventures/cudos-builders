class ComputerModel {

    constructor() {
        this.id = "";
        this.ip = "";
        this.user = "";
        this.sshKey = "";
        this.pass = "";
    }

    static fromJson(json) {
        if (json === null) {
            return null;
        }

        const model = new ComputerModel();

        model.id = json.id ?? model.id;
        model.ip = json.ip ?? model.ip;
        model.user = json.user ?? model.user;
        model.sshKey = json.sshKey ?? model.sshKey;
        model.pass = json.pass ?? model.pass;
        
        return model;
    }

}

module.exports = ComputerModel;