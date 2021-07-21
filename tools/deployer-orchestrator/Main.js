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

const TARGET_ROOT_NODE_TESTNET_PUBLIC_ZONE01 = 'root-node-testnet-public-zone01';
const TARGET_VALIDATOR_NODE_TESTNET_PUBLIC_ZONE02 = 'validator-node-testnet-public-zone02';
const TARGET_VALIDATOR_NODE_TESTNET_PUBLIC_ZONE03 = 'validator-node-testnet-public-zone03';

const TARGET_ROOT_NODE_TESTNET_PRIVATE = 'root-node-testnet-private';

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
        TARGET_ROOT_NODE_TESTNET_PUBLIC_ZONE01,
        TARGET_VALIDATOR_NODE_TESTNET_PUBLIC_ZONE02,
        TARGET_VALIDATOR_NODE_TESTNET_PUBLIC_ZONE03,
        TARGET_ROOT_NODE_TESTNET_PRIVATE,
    ]
    const parser = new ArgumentParser({description: 'Cudos testnet orchestrator deployer'});
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
        // archive.directory(path.resolve('../../CudosGravityBridge/orchestrator'), '/CudosGravityBridge/module');
        archive.directory(path.resolve('../docker'), '/CudosBuilders/docker');

        const projectGravityBridge = path.resolve('../../CudosGravityBridge/orchestrator');
        const pathContent = await asyncFs.readdir(projectGravityBridge);
        for (let i = 0;  i < pathContent.length; ++i) {
            const itemAbsPath = path.join(projectGravityBridge, pathContent[i]);
            const stat = await asyncFs.stat(itemAbsPath);

            switch (pathContent[i]) {
                case 'target':
                    break;
                default:
                    if (stat.isDirectory() === true) {
                        archive.directory(itemAbsPath, `/CudosGravityBridge/orchestrator/${pathContent[i]}`);
                    } else {
                        archive.file(itemAbsPath, { 'name': `/CudosGravityBridge/orchestrator/${pathContent[i]}` } );
                    }
                    break;
            }
        }

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

    const dockerRootPath = getDockerRootPath(args);
    const dockerEnvFile = getDockerEnvFile(args);
    const dockerComposeFile = getDockerComposeFile(args);
    const dockerProjectName = getDockerProjectName(args);

    command = [
        `cd ${secrets.serverPath}`,
        `sudo rm -Rf ./CudosBuilders`,
        `sudo rm -Rf ./CudosGravityBridge/orchestrator`,
        `sudo unzip -q ${filePath} -d ./`,
        `rm ${filePath}`,
        `cd ./CudosBuilders/docker/${dockerRootPath}`,
        `(sudo docker-compose --env-file ${dockerEnvFile} -f ${dockerComposeFile} -p ${dockerProjectName} down || true)`,
        `sudo docker-compose --env-file ${dockerEnvFile} -f ${dockerComposeFile} -p ${dockerProjectName} up --build -d`,
        // `cd ${secrets.serverPath}`,
        // `sudo rm -Rf ./CudosGravityBridge/orchestrator`,
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

function getDockerRootPath(args) {
    switch (args.target) {
        case TARGET_ROOT_NODE_TESTNET_PUBLIC_ZONE01:
            return 'orchestrator';
        case TARGET_VALIDATOR_NODE_TESTNET_PUBLIC_ZONE02:
            return 'orchestrator';
        case TARGET_VALIDATOR_NODE_TESTNET_PUBLIC_ZONE03:
            return 'orchestrator';
        case TARGET_ROOT_NODE_TESTNET_PRIVATE:
            return 'orchestrator';
        default:
            throw Error(`Unknown target ${args.target}`);
    }
}

function getDockerEnvFile(args) {
    switch (args.target) {
        case TARGET_ROOT_NODE_TESTNET_PUBLIC_ZONE01:
            return '';
        case TARGET_VALIDATOR_NODE_TESTNET_PUBLIC_ZONE02:
            return '';
        case TARGET_VALIDATOR_NODE_TESTNET_PUBLIC_ZONE03:
            return '';
        case TARGET_ROOT_NODE_TESTNET_PRIVATE:
            return './orchestrator.testnet.private.arg';
        default:
            throw Error(`Unknown target ${args.target}`);
    }
}

function getDockerComposeFile(args) {
    switch (args.target) {
        case TARGET_ROOT_NODE_TESTNET_PUBLIC_ZONE01:
            return './orchestrator.release.yml';
        case TARGET_VALIDATOR_NODE_TESTNET_PUBLIC_ZONE02:
            return './orchestrator.release.yml';
        case TARGET_VALIDATOR_NODE_TESTNET_PUBLIC_ZONE03:
            return './orchestrator.release.yml';
        case TARGET_ROOT_NODE_TESTNET_PRIVATE:
            return './orchestrator.release.yml';
        default:
            throw Error(`Unknown target ${args.target}`);
    }
}

function getDockerProjectName(args) {
    switch (args.target) {
        case TARGET_ROOT_NODE_TESTNET_PUBLIC_ZONE01:
            return 'orchestrator';
        case TARGET_VALIDATOR_NODE_TESTNET_PUBLIC_ZONE02:
            return 'orchestrator';
        case TARGET_VALIDATOR_NODE_TESTNET_PUBLIC_ZONE03:
            return 'orchestrator';
        case TARGET_ROOT_NODE_TESTNET_PRIVATE:
            return 'orchestrator';
        default:
            throw Error(`Unknown target ${args.target}`);
    }
}

main();
