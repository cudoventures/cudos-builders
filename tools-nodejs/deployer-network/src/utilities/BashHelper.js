const ChildProcess = require('child_process');
const Log = require('./LogHelper');

class BashHelper {

    constructor(stdLog = true) {
        this.stdLog = stdLog;
    }

    execute(cmd, stdLog) {
        return new Promise((resolve, reject) => {
            if (Array.isArray(cmd)) {
                cmd = cmd.join(' && ');
            }

            stdLog = stdLog ?? this.stdLog;

            const childProcess = ChildProcess.exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(stdout.trim());
            });

            childProcess.stdout.on('data', (data) => {
                if (stdLog === true) {
                    Log.bash(data);
                }
            });

            childProcess.stderr.on('data', (data) => {
                if (stdLog === true) {
                    Log.bash(data);
                }
            });
        });
    }

}

module.exports = BashHelper;