const { NodeSSH } = require('node-ssh');
const Log = require('./LogHelper');

class SshHelper {

    constructor(computer, stdLog = true) {
        this.computer = computer;
        this.stdLog = stdLog;
        this.ssh = new NodeSSH();
    }

    async connect() {
        const params = {
            host: this.computer.ip,
            port: this.computer.port,
            username: this.computer.user,
        };

        if (this.computer.hasSshKey() === false) {
            params.password = this.computer.pass;
        } else {
            params.privateKey = this.computer.sshKey;
            params.passphrase = this.computer.pass;
        }

        await this.ssh.connect(params);

        Log.main(`Connected to ${this.computer.ip}:${this.computer.port}`);
    }

    async disconnect() {
        this.ssh.dispose();
        Log.main(`Disconnect from ${this.computer.ip}:${this.computer.port}`);
    }

    async exec(cmd, stdLog) {
        if (Array.isArray(cmd)) {
            cmd = cmd.join(' && ');
        }

        stdLog = stdLog ?? this.stdLog;

        const res = [];
        try {
            await this.ssh.exec(cmd, [], {
                onStdout: (chunk) => {
                    res.push(chunk.toString('utf8'));
                    if (stdLog === true) {
                        Log.ssh(chunk.toString('utf8'))
                    }
                },
                onStderr: (chunk) => {
                    res.push(chunk.toString('utf8'));
                    if (stdLog === true) {
                        Log.ssh(chunk.toString('utf8'))
                    }
                },
            });
        } catch (ex) {
        }

        return res.join('\n');
    }

}

module.exports = SshHelper;