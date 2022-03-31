import sendToEth from './cudos-to-eth/sendToEth';

import Config from './config/config.js';
const destinationAddress = '0x41D0B5762341B0FCE6aDCCF69572c663481C7286';
const destiantionAddresses = [];

for (let i = 0; i < 100; i++) {
    destiantionAddresses.push(destinationAddress);
}
const senderMnemonic = Config.CUDOS_NETWORK.MNEMONICS.replaceAll("\"", '').split(',')[0] 

sendToEth(destiantionAddresses, 1, senderMnemonic);