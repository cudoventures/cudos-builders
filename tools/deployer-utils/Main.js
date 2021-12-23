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

const TARGET_TESTNET_PUBLIC = 'testnet-public';
const TARGET_TESTNET_PRIVATE = 'testnet-private';

async function main() {
    const args = getArgParser();
    const secrets = getSecrets(args.target);

    console.log(`Temp dir: ${TEMP_DIR}`);
    console.log(`Target: ${args.target}`);
    console.log(`Server Dir: ${secrets.serverPath}`);

    await asyncFs.rm(TEMP_DIR, { 'recursive': true, 'force': true });
    const { deployFilePath, deployFilename } = await initTempDirectory();

    try {
        console.log('Creating archive');
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
    parser.add_argument('--target', { 'required': true, 'choices': [TARGET_TESTNET_PUBLIC, TARGET_TESTNET_PRIVATE] });
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

        const deployFilename = `cudos-utils.tar.gz`;
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
        archive.directory(path.resolve('../../CudosFaucet'), "/CudosFaucet");
        archive.directory(path.resolve('../../CudosGravityBridge/module'), '/CudosGravityBridge/module');
        archive.directory(path.resolve('../docker'), '/CudosBuilders/docker');

        const projectExplorerAbsPath = path.resolve('../../CudosExplorer');
        const pathContent = await asyncFs.readdir(projectExplorerAbsPath);
        for (let i = 0;  i < pathContent.length; ++i) {
            const itemAbsPath = path.join(projectExplorerAbsPath, pathContent[i]);
            const stat = await asyncFs.stat(itemAbsPath);

            switch (pathContent[i]) {
                case 'node_modules':
                    break;
                case '.meteor':
                    const meteorPathContent = await asyncFs.readdir(itemAbsPath);
                    for (let j = 0;  j < meteorPathContent.length;  ++j) {
                        if (meteorPathContent[j] === 'local') {
                            continue;
                        }
                        const meteorItemAbsPath = path.join(projectExplorerAbsPath, pathContent[i], meteorPathContent[j]);
                        const meteorStat = await asyncFs.stat(meteorItemAbsPath);
                        if (meteorStat.isDirectory() === true) {
                            archive.directory(meteorItemAbsPath, `/CudosExplorer/${pathContent[i]}/${meteorPathContent[j]}`);
                        } else {
                            archive.file(meteorItemAbsPath, { 'name': `/CudosExplorer/${pathContent[i]}/${meteorPathContent[j]}` } );
                        }
                    }
                    break;
                default:
                    if (stat.isDirectory() === true) {
                        archive.directory(itemAbsPath, `/CudosExplorer/${pathContent[i]}`);
                    } else {
                        archive.file(itemAbsPath, { 'name': `/CudosExplorer/${pathContent[i]}` } );
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
    let command;

    const dockerExplorerEnvFile = getDockerExplorerEnvFile(args);
    const dockerFaucetEnvFile = getDockerFaucetEnvFile(args);

    command = [
        `cd ${secrets.serverPath}`,
        `sudo rm -Rf ./CudosNode`,
        `sudo rm -Rf ./CudosBuilders`,
        `sudo rm -Rf ./CudosFaucet`,
        `sudo rm -Rf ./CudosExplorer`,
        `sudo rm -Rf ./CudosGravityBridge`,
        `sudo unzip -q ${filePath} -d ./`,
        `rm ${filePath}`,
        `sudo chmod -R g-rwx,o-rwx ./CudosNode`,
        `sudo chmod -R g-rwx,o-rwx ./CudosBuilders`,
        `sudo chmod -R g-rwx,o-rwx ./CudosFaucet`,
        `sudo chmod -R g-rwx,o-rwx ./CudosExplorer`,
        `sudo chmod -R g-rwx,o-rwx ./CudosGravityBridge`,
        `cd ./CudosBuilders/docker/explorer`,
        `(sudo docker-compose --env-file ${dockerExplorerEnvFile} -f ./explorer.yml -p cudos-explorer down || true)`,
        `cd ../faucet`,
        `(sudo docker-compose --env-file ${dockerFaucetEnvFile} -f ./faucet.yml -p cudos-faucet down || true)`,
        args.init === '1' ? `sudo rm -rf ${secrets.serverPath}/CudosData/*` : null,
        `sudo docker system prune -a -f`,
        // `sudo docker image prune -f`,
        // `sudo docker image prune -a -f`,
        // `sudo docker volume prune -f`,
        // `sudo docker builder prune -f`,
        // `sudo docker network prune -f`,
        `cd ../binary-builder`,
        `sudo docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder build`,
        `cd ../faucet`,
        `sudo docker-compose --env-file ${dockerFaucetEnvFile} -f ./faucet.yml -p cudos-faucet up --build -d`,
        `cd ../explorer`,
        `sudo docker-compose --env-file ${dockerExplorerEnvFile} -f ./explorer.yml -p cudos-explorer up --build -d`,
        // `cd ${secrets.serverPath}`,
        // `sudo rm -Rf ./CudosNode`,
        // `sudo rm -Rf ./CudosBuilders`,
        // `sudo rm -Rf ./CudosUtils`,
        // `sudo rm -Rf ./CudosGravityBridge`,
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

function getDockerExplorerEnvFile(args) {
    switch (args.target) {
        case TARGET_TESTNET_PUBLIC:
            return './explorer.testnet.public.arg';
        case TARGET_TESTNET_PRIVATE:
            return './explorer.testnet.private.arg';
        default:
            throw Error(`Unknown target ${args.target}`);
    }
}

function getDockerFaucetEnvFile(args) {
    switch (args.target) {
        case TARGET_TESTNET_PUBLIC:
            return './faucet.testnet.public.arg';
        case TARGET_TESTNET_PRIVATE:
            return './faucet.testnet.private.arg';
        default:
            throw Error(`Unknown target ${args.target}`);
    }
}

main();
