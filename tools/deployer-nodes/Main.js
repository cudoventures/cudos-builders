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

const TARGET_ROOT_NODE_TESTNET = 'root-node-testnet';
const TARGET_SEED_NODE_01_TESTNET = 'seed-node-01-testnet';
const TARGET_SENTRY_NODE_01_TESTNET = 'sentry-node-01-testnet';

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
    const parser = new ArgumentParser({description: 'Cudos testnet root node deployer'});
    parser.add_argument('--target', { 'required': true, 'choices': [TARGET_ROOT_NODE_TESTNET, TARGET_SEED_NODE_01_TESTNET, TARGET_SENTRY_NODE_01_TESTNET] });
    parser.add_argument('--init', { 'required': true, 'choices': ['0', '1'] });
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

        const deployFilename = `cudos-src.tar.gz`;
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
        const archive = archiver('zip', {
            zlib: { level: 9 }, // Sets the compression level.
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
        archive.directory(path.resolve('../../CudosNode'), '/CudosNode');
        archive.directory(path.resolve('../docker'), '/CudosBuilders/docker');

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

    const dockerRoot = getDockerRoot(args);
    const dockerEnvFile = getDockerEnvFile(args);
    const dockerComposeInitFile = getDockerComposeInitFile(args);
    const dockerComposeStartFile = getDockerComposeStartFile(args);
    const dockerInitProjectName = getDockerInitProjectName(args);
    const dockerStartProjectName = getDockerStartProjectName(args);

    command = [
        `cd ${secrets.serverPath}`,
        `sudo rm -Rf ./CudosBuilders`,
        `sudo rm -Rf ./CudosNode`,
        `sudo unzip -q ${filePath} -d ./`,
        `rm ${filePath}`,
        `cd ./CudosBuilders/docker/${dockerRoot}`,
        `(sudo docker-compose --env-file ${dockerEnvFile} -f ${dockerComposeStartFile} -p ${dockerStartProjectName} down || true)`,
        args.init === '1' ? `sudo rm -rf ${secrets.serverPath}/CudosData/*` : null,
        `sudo docker image prune -f`,
        `sudo docker image prune -a -f`,
        `sudo docker volume prune -f`,
        `sudo docker builder prune -f`,
        args.init === '1' ? `sudo docker-compose --env-file ${dockerEnvFile}  -f ${dockerComposeInitFile} -p ${dockerInitProjectName} up --build` : null,
        args.init === '1' ? `(sudo docker-compose --env-file ${dockerEnvFile}  -f ${dockerComposeInitFile} -p ${dockerInitProjectName} down || true)` : null,
        `sudo docker-compose --env-file ${dockerEnvFile} -f ${dockerComposeStartFile} -p ${dockerStartProjectName} up --build -d`,
        `cd ${secrets.serverPath}`,
        `sudo rm -Rf ./CudosBuilders`,
        `sudo rm -Rf ./CudosNode`,
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

function getDockerRoot(args) {
    switch (args.target) {
        case TARGET_ROOT_NODE_TESTNET:
            return 'root-node';
        case TARGET_SEED_NODE_01_TESTNET:
            return 'seed-node';
        case TARGET_SENTRY_NODE_01_TESTNET:
            return 'sentry-node';
        default:
            throw Error(`Unknown target ${args.target}`);
    }
}

function getDockerEnvFile(args) {
    switch (args.target) {
        case TARGET_ROOT_NODE_TESTNET:
            return './root-node.testnet.zone01.arg';
        case TARGET_SEED_NODE_01_TESTNET:
            return './seed-node.testnet.zone01.arg';
        case TARGET_SENTRY_NODE_01_TESTNET:
            return './sentry-node.testnet.zone01.arg';
        default:
            throw Error(`Unknown target ${args.target}`);
    }
}

function getDockerComposeInitFile(args) {
    switch (args.target) {
        case TARGET_ROOT_NODE_TESTNET:
            return './init-root-node.yml';
        case TARGET_SEED_NODE_01_TESTNET:
            return './init-seed-node.yml';
        case TARGET_SENTRY_NODE_01_TESTNET:
            return './init-sentry-node.yml';
        default:
            throw Error(`Unknown target ${args.target}`);
    }
}

function getDockerComposeStartFile(args) {
    switch (args.target) {
        case TARGET_ROOT_NODE_TESTNET:
            return './start-root-node.yml';
        case TARGET_SEED_NODE_01_TESTNET:
            return './start-seed-node.yml';
        case TARGET_SENTRY_NODE_01_TESTNET:
            return './start-sentry-node.yml';
        default:
            throw Error(`Unknown target ${args.target}`);
    }
}

function getDockerInitProjectName(args) {
    switch (args.target) {
        case TARGET_ROOT_NODE_TESTNET:
            return 'cudos-init-root-node';
        case TARGET_SEED_NODE_01_TESTNET:
            return 'cudos-init-seed-node';
        case TARGET_SENTRY_NODE_01_TESTNET:
            return 'cudos-init-sentry-node';
        default:
            throw Error(`Unknown target ${args.target}`);
    }
}

function getDockerStartProjectName(args) {
    switch (args.target) {
        case TARGET_ROOT_NODE_TESTNET:
            return 'cudos-start-root-node';
        case TARGET_SEED_NODE_01_TESTNET:
            return 'cudos-start-seed-node';
        case TARGET_SENTRY_NODE_01_TESTNET:
            return 'cudos-start-sentry-node';
        default:
            throw Error(`Unknown target ${args.target}`);
    }
}

main();
