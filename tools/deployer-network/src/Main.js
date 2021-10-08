const { ArgumentParser } = require('argparse');
const TopologyHelper = require('./utilities/TopologyHelper');
const LifeCycleHelper = require('./utilities/LifeCycleHelper');
const Log = require('./utilities/LogHelper');
const InstancesService = require('./services/InstancesService');

async function main() {
    const args = getArgParser();

    const lifeCycleHelper = new LifeCycleHelper();
    const topologyHelper = await TopologyHelper.instanceByPath(args.topology);
    const instancesService = new InstancesService(topologyHelper);

    lifeCycleHelper.init();
    lifeCycleHelper.addExitHandler(instancesService.onExit);

    try {
        await instancesService.createMissingInstances();
        await instancesService.connectToInstances();
        await instancesService.validateSoftwareRequirements();
        Log.main('Ready');
    } catch (ex) {
        console.log(ex);
        process.kill(process.pid, 'SIGINT');
    }

    // Start the nodes

    setInterval(() => {}, 1 << 30);
}

function getArgParser() {
    const parser = new ArgumentParser({description: 'Cudos Network StartUp Script'});
    parser.add_argument('--topology', { 'required': true });
    return parser.parse_args();
}

main();