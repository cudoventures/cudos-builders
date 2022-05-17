const os = require('os');
const fs = require('fs');
const asyncFs = require('fs/promises');
const path = require('path');
const { ArgumentParser } = require('argparse');
const archiver = require('archiver');
const SCP2 = require('scp2');
const SSH2Client = require('ssh2').Client;

const SecretsConfig = require('./secrets.json');

const TEMP_DIR = path.join(os.tmpdir(), 'cudos-builder');

const MONITORING = 'monitoring';

async function main() {
    const args = getArgParser();
    const secrets = getSecrets(args.target);

    console.log(`Target: ${args.target}`);
    console.log(`Server Dir: ${secrets.serverPath}`);

    const { deployFilePath, deployFilename } = await initTempDirectory();

    try {
        console.log("Creating archive");
        await createArchive(deployFilePath, deployFilename);

        console.log('Uploading');
        await uploadFile(secrets, deployFilePath, deployFilename);

        console.log('Execute commands');
        await executeCommands(args, secrets, deployFilePath, deployFilename);
    } finally {
        try {
            await asyncFs.access(TEMP_DIR, fs.constants.F_OK);
            await asyncFs.rm(TEMP_DIR, { 'recursive': true });
        } catch (e) {
            console.error(e);
        }
    }
}

function getArgParser() {
    const targets = [
        MONITORING
    ]
    const parser = new ArgumentParser({description: 'Cudos testnet monitoring deployer'});
    parser.add_argument('--target', { 'required': true, 'choices': targets });
    return parser.parse_args();
}

function getSecrets(target) {
    const secrets = SecretsConfig[target];
    if (secrets === undefined) {
        console.error(`Secrets with target not found. Target:${target}`);
        return;
    }

    return secrets
}

async function initTempDirectory() {
    return new Promise(async (resolve, reject) => {
        try {
            await asyncFs.access(TEMP_DIR);
        } catch (e) {
            await asyncFs.mkdir(TEMP_DIR, { 'recursive': true });
        }

        const deployFilename = `cudos-monitoring.tar.gz`;
        const deployFilePath = path.join(TEMP_DIR, deployFilename);
        resolve({
            deployFilePath,
            deployFilename,
        })
    });
}

async function createArchive(deployFilePath, deployFilename) {
    return new Promise(async (resolve, reject) => {
        const output = fs.createWriteStream(deployFilePath);
        const archive = archiver('tar', {
            gzip: true, // Sets the compression level.
        });

        output.on('close', () => {
            console.log(`${archive.pointer()} total bytes`);
            console.log('archiver has been finalized and the output file descriptor has closed.');
            resolve({
                deployFilePath,
                deployFilename,
            });
        });

        output.on('end', () => {
            console.log('Data has been drained');
        });

        archive.on('warning', (err) => {
            if (err.code === 'ENOENT') {
                // log warning
            } else {
                // throw error
                reject(err);
            }
        });

        // good practice to catch this error explicitly
        archive.on('error', (err) => {
            reject(err);
        });

        // pipe archive data to the file
        archive.pipe(output);

        // append files from a sub-directory, putting its contents at the root of archive
        archive.directory( path.resolve('../docker/monitoring'), 'monitoring' );

        archive.finalize();
    });
}

function uploadFile(secrets, deployFilePath, deployFilename) {
    return new Promise(async (resolve, reject) => {
        const spcClient = new SCP2.Client();
        spcClient.on('connect', () => {
            console.log('Connected to server.');
        });

        spcClient.on('transfer', (buffer, uploaded, total) => {
            console.log(`Uploaded: ${uploaded + 1}/${total}`);
        });

        const destOptions = {
            host: secrets.host,
            port: secrets.port,
            username: secrets.username,
            passphrase: secrets.keyPass,
            privateKey: (await asyncFs.readFile(secrets.privateKey)).toString(),
            path: secrets.serverPath,
        };

        SCP2.scp(deployFilePath, destOptions, spcClient, (err) => {
            if (err) {
                console.error('Error:', err);
                reject(err);
                return;
            }

            resolve();
        });
    });
}

async function executeCommands(args, secrets, deployFilePath, deployFilename) {
    const conn = new SSH2Client();
    const filePath = path.join(secrets.serverPath, deployFilename);

    const dockerRootPath = 'monitoring';
    const dockerComposeFile = './monitoring.yml';
    const dockerProjectName = 'cudos-monitoring';
    const dockerEnvFile = 'monitoring.tesnet.public.arg';

    command = [
        `cd ${secrets.serverPath}`,
        `sudo rm -Rf ./monitoring`,
        `sudo tar -xzf ${filePath}`,
        `rm ${filePath}`,
        `cd ${dockerRootPath}`,
        `sudo docker run --rm \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -v "$PWD:$PWD" \
        -w="$PWD" \
        docker/compose:1.29.0 -f ${dockerComposeFile} -p ${dockerProjectName} --env-file ${dockerEnvFile} down`,
        `sudo docker system prune -a -f`,
        `sudo docker run --rm \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -v "$PWD:$PWD" \
        -w="$PWD" \
        docker/compose:1.29.0 -f ${dockerComposeFile} -p ${dockerProjectName} --env-file ${dockerEnvFile} up --build -d`,
        `cd ${secrets.serverPath}`,
        `sudo chmod -R g-rwx,o-rwx ./monitoring`,
    ]

    command = command.filter(c => c !== null).join(' && ');

    conn.on('ready', () => {
        console.log('Client :: ready');
        conn.exec(command, (err, stream) => {
            if (err) {
                throw err;
            }

            stream.on('close', (code, signal) => {
                console.log(`Stream :: close :: code: ${code}, signal: ${signal}`);
                conn.end();
            }).on('data', (data) => {
                console.log(`STDOUT: ${data}`);
            }).stderr.on('data', (data) => {
                console.log(`STDERR: ${data}`);
            });
        });
    });

    conn.connect({
        host: secrets.host,
        port: secrets.port,
        username: secrets.username,
        passphrase: secrets.keyPass,
        privateKey: (await asyncFs.readFile(secrets.privateKey)).toString(),
        path: secrets.serverPath,
    });
}

main();
