const ChildProcess = require('child_process');
const Log = require('./LogHelper');

class BashHelper {

    constructor(stdLog = true) {
        this.stdLog = stdLog;
    }

    execute(cmd) {
        return new Promise((resolve, reject) => {
            if (Array.isArray(cmd)) {
                cmd = cmd.join(' && ');
            }

            const childProcess = ChildProcess.exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(stdout);
            });

            childProcess.stdout.on('data', (data) => {
                if (this.stdLog === true) {
                    Log.bash(data);
                }
            });

            childProcess.stderr.on('data', (data) => {
                if (this.stdLog === true) {
                    Log.bash(data);
                }
            });
        });
    }

}

module.exports = BashHelper;