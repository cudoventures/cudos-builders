const { ArgumentParser } = require('argparse');
const TopologyHelper = require('./utilities/TopologyHelper');
const LifeCycleHelper = require('./utilities/LifeCycleHelper');
const Log = require('./utilities/LogHelper');
const InstancesService = require('./services/InstancesService');
const NodesService = require('./services/NodesService');

async function main() {
    const args = getArgParser();

    const lifeCycleHelper = new LifeCycleHelper();
    const topologyHelper = await TopologyHelper.instanceByPath(args.topology);
    const instancesService = new InstancesService(topologyHelper);
    const nodesService = new NodesService(topologyHelper, instancesService);

    lifeCycleHelper.init();
    lifeCycleHelper.addExitHandler(instancesService.onExit);
    lifeCycleHelper.addExitHandler(nodesService.onExit);

    try {
        await instancesService.createMissingInstances();
        await instancesService.connectToInstances();
        await instancesService.validateSoftwareRequirements();
        await nodesService.start();
        Log.main('Ready');
    } catch (ex) {
        console.log(ex);
        process.kill(process.pid, 'SIGINT');
    }

    setInterval(() => {}, 1 << 30);
}

function getArgParser() {
    const parser = new ArgumentParser({description: 'Cudos Network StartUp Script'});
    parser.add_argument('--topology', { 'required': true });
    return parser.parse_args();
}

main();