const { ArgumentParser } = require('argparse');
const TopologyHelper = require('./utilities/TopologyHelper');
const LifeCycleHelper = require('./utilities/LifeCycleHelper');
const Log = require('./utilities/LogHelper');
const InstancesService = require('./services/InstancesService');
const NodesService = require('./services/NodesService');

async function main() {
    const args = getArgParser();

    try {
        const lifeCycleHelper = new LifeCycleHelper();
        const topologyHelper = await TopologyHelper.instanceByPath(args.topology);
        const instancesService = new InstancesService(topologyHelper);
        const nodesService = new NodesService(topologyHelper, instancesService);

        topologyHelper.validate(args.gravity, args.explorer, args.faucet, args.monitoring);

        lifeCycleHelper.init();
        lifeCycleHelper.addExitHandler(instancesService.onExit, 0);
        lifeCycleHelper.addExitHandler(nodesService.onExit, 1);

        await instancesService.createMissingInstances();
        await instancesService.connectToInstances();
        await instancesService.validateSoftwareRequirements();
        await instancesService.reconnectToInstances(); // in order to apply latest user details like gruops
        await nodesService.start(args.gravity, args.explorer, args.faucet, args.monitoring);
        Log.main('Ready');
    } catch (ex) {
        console.log(ex);
        process.kill(process.pid, 'SIGINT');
    }

    setInterval(() => {}, 1 << 30);
}

function getArgParser() {
    const parser = new ArgumentParser({description: 'Cudos Network StartUp Script'});
    parser.add_argument('--topology', { 'required': false, 'default': './deployer-network/config/topology.json' });
    parser.add_argument('--gravity', { 'required': false, 'default': '1', 'choices': ['0', '1'] });
    parser.add_argument('--faucet', { 'required': false, 'default': '1', 'choices': ['0', '1'] });
    parser.add_argument('--explorer', { 'required': false, 'default': '1', 'choices': ['0', '1'] });
    parser.add_argument('--monitoring', { 'required': false, 'default': '1', 'choices': ['0', '1'] });
    return parser.parse_args();
}

main();