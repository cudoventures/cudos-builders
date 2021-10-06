const { ArgumentParser } = require('argparse');
const TopologyHelper = require('./utilities/TopologyHelper');

async function main() {
    const args = getArgParser();
    const topologyHelper = await TopologyHelper.instanceByPath(args.topology);
    console.log(topologyHelper);

    // Ping instances

    // Connect to instances and validate/install software requirements

    // Start the ssh-signaling system

    // Start the nodes
}

function getArgParser() {
    const parser = new ArgumentParser({description: 'Cudos Network StartUp Script'});
    parser.add_argument('--topology', { 'required': true });
    return parser.parse_args();
}

main();