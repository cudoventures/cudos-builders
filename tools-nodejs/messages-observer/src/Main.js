const { StargateClient } = require('cudosjs');
const { ArgumentParser } = require('argparse');

async function main() {
    const args = getArgParser();
    
    const client = await StargateClient.connect(args.trpc);

    let queryHeight = args.start_height;

    setInterval(async () => {
        try {
            const latestHeight = await client.getHeight();
            // const result = await client.searchTx('message.sender=\'cudos18w06hwzxc7xvkuh809d9c34c8j57ujkrnwktwy\' AND transfer.recipient=\'cudos1ruzlt5zfy4gvjaphewpvxlszul27f3evgs4sfk\' AND tx.height>=20982 AND tx.height<=21082');
            const result = await client.searchTx(`tx.height>=${queryHeight}`);

            result.sort((a, b) => {
                return a.height - b.height;
            });

            queryHeight = latestHeight;
            if (result.length > 0) {
                queryHeight = Math.max(queryHeight, result[result.length - 1].height);
            }
            ++queryHeight;
            
            result.forEach((iTx) => {
                const output = {
                    height: iTx.height,
                    msgType: '',
                    params: {},
                }

                for (let i = iTx.events.length; i-- > 0; ) {
                    const event = iTx.events[i];
                    if (isBase64(event.type)) {
                        event.type = Buffer.from(event.type, 'base64').toString();
                    }
                    for (let j = event.attributes.length; j-- > 0; ) {
                        if (isBase64(event.attributes[j].key)) {
                            event.attributes[j].key = Buffer.from(event.attributes[j].key, 'base64').toString();
                        }
                        if (isBase64(event.attributes[j].value)) {
                            event.attributes[j].value = Buffer.from(event.attributes[j].value, 'base64').toString();
                        }
                    }

                    switch (event.type) {
                        case 'message':
                            for (let j = event.attributes.length;  j-- > 0; ) {
                                const attribute = event.attributes[j];
                                if (attribute.key === 'action') {
                                    output.msgType = attribute.value;
                                }
                            }
                            break;
                        case 'coin_spent':
                        case 'coin_received':
                        case 'transfer':
                        case 'tx':
                            break;
                        default:
                            for (let j = event.attributes.length;  j-- > 0; ) {
                                const attribute = event.attributes[j];
                                switch (attribute.key) {
                                    case 'header':
                                        break;
                                    default:
                                        output.params[attribute.key] = attribute.value;
                                }
                            }

                    }
                }

                console.log(JSON.stringify(output));

                // const rawTx = decodeTxRaw(iTx.tx);
                // console.log(rawTx.body.messages.map((t) => t.typeUrl));
            });
        } catch (ex) {
            console.log(ex);
        }
    }, 5000);
}

function getArgParser() {
    const parser = new ArgumentParser({description: 'Cudos messages observer'});
    parser.add_argument('--trpc', { 'required': true });
    parser.add_argument('--start-height', { 'required': true });
    return parser.parse_args();
}

function isBase64(value) {
    return Buffer.from(value, 'base64').toString('base64') === value;
}

main();
