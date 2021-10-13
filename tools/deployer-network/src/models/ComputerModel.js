class ComputerModel {

    constructor() {
        this.id = "";
        this.ip = "";
        this.port = 22;
        this.user = "";
        this.sshKey = "";
        this.pass = "";
        this.isLocalDocker = false;
    }

    isAuto() {
        return this.ip === 'auto';
    }

    hasSshKey() {
        return this.sshKey !== '';
    }

    static fromJson(json) {
        if (json === null) {
            return null;
        }

        const model = new ComputerModel();

        model.id = json.id ?? model.id;
        model.ip = json.ip ?? model.ip;
        model.port = json.port ?? model.port;
        model.user = json.user ?? model.user;
        model.sshKey = json.sshKey ?? model.sshKey;
        model.pass = json.pass ?? model.pass;
        model.isLocalDocker = model.isAuto();
        
        return model;
    }

}

module.exports = ComputerModel;