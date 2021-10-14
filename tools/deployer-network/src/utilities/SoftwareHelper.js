const Log = require('./LogHelper');
const PathHelper = require('./PathHelper');

class SoftwareHelper {

    constructor(sshHelper) {
        this.sshHelper = sshHelper;
    }

    async validateSoftwareRequirements() {
        Log.main(`Validate software requirements for ${this.sshHelper.computer.ip}`);
        await this.validateDocker();
        await this.validateDockerCompose();
        await this.prepareDataDir();
    }

    async validateDocker() {
        const response = await this.sshHelper.exec('docker -v', false);
        if (response.indexOf('Docker version') === 0) {
            Log.main(`${this.sshHelper.computer.ip}:${this.sshHelper.computer.port} has docker`);
            return;
        }

        Log.main(`Installing docker`);
        await this.sshHelper.exec([
            'sudo apt-get update',
            'sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release -y',
            'sudo rm -rf /usr/share/keyrings/docker-archive-keyring.gpg',
            'curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --batch --yes --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg',
            'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null',
            'sudo apt-get update',
            'sudo apt-get install docker-ce docker-ce-cli containerd.io -y'
        ]);
    }

    async validateDockerCompose() {
        const response = await this.sshHelper.exec('docker-compose -v', false);
        if (response.indexOf('docker-compose') === 0) {
            Log.main(`${this.sshHelper.computer.ip}:${this.sshHelper.computer.port} has docker-compose`);
            return;
        }

        Log.main(`Installing docker-compose`);
        await this.sshHelper.exec([
            'sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose',
            'sudo chmod +x /usr/local/bin/docker-compose'
        ])
    }

    async prepareDataDir() {
        Log.main(`${this.sshHelper.computer.ip}:${this.sshHelper.computer.port} check folder structure`);
        const user = this.sshHelper.computer.user;
        await this.sshHelper.exec([
            `sudo mkdir -p ${PathHelper.WORKING_DIR}/CudosData`,
            `sudo chown -R ${user}:${user} ${PathHelper.WORKING_DIR}`,
        ]);
    }

}

module.exports = SoftwareHelper;