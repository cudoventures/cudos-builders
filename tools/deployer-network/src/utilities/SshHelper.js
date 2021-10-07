const { NodeSSH } = require('node-ssh');
const Log = require('./LogHelper');

class SshHelper {

    constructor(computer) {
        this.computer = computer;
        this.ssh = new NodeSSH();
    }

    async connect() {
        await this.ssh.connect({
            host: this.computer.ip,
            port: this.computer.port,
            username: this.computer.user,
            password: this.computer.pass,
        });

        Log.main(`Connected to ${this.computer.ip}:${this.computer.port}`);
    }

    async disconnect() {
        this.ssh.dispose();
        Log.main(`Disconnect from ${this.computer.ip}:${this.computer.port}`);
    }

}

module.exports = SshHelper;