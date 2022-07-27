import gravityBalanceTest from './tests/gravity/testModuleAndContractBalances.js';
import ibcBalanceTest from './tests/ibc/testModuleAndMintedBalances.js';
import { bankSendMsg } from './cudos/msgs';
import loadTest from './tests/general/loadTest.js';
import nftMassMint from './tests/nft/massMintNfts';
import config from '../config/config.js';
import { Cosmos } from "@cosmostation/cosmosjs";
import sendTx from './cudos/txs.js';
import { logGeneral, logSuccess } from './utils/logger';
import { constants, getSigner, getRandomWallets, checkTx } from './cudos/cudosUtils.js';
import wait from './utils/wait.js';

const providers = [];

for (let endpoint of config.REST_ENDPOINTS) {
    const provider = new Cosmos(endpoint, config.CHAIN_ID);
    provider.setPath("m/44'/118'/0'/0/0");
    provider.bech32MainPrefix = 'cudos';
    provider.gasPrice = config.GAS_PRICE;

    providers.push(provider);
}


const baseConfig = {
    providers,
    faucetMnemonic: config.FAUCET_MNEMONIC,
    blockTime: config.BLOCK_TIME,
    gasPrice: config.GAS_PRICE,
    rest_endpoints: config.REST_ENDPOINTS,
}


// let signer = await getSigner(providers[0], config.FAUCET_MNEMONIC);
// logGeneral("Funding wallets from faucet...");
// const testWallets = await getRandomWallets(provider, 3);
// const fundRes = await sendTx(
//     signer,
//     bankSendMsg,
//     {
//         destinationAddresses: testWallets.map(w => w.address),
//         denom: 'acudos',
//         amount: '1000000000000000000000000000'
//     },
//     constants.GAS_LIMITS.BANK_SEND
// );

// await wait(35, '');
// checkTx(provider.url, fundRes);
// logSuccess('Wallets funded!');

if(config.GRAVITY_TESTING) {
    baseConfig.faucetMnemonic = testWallets[0].mnemonic;
    gravityBalanceTest(baseConfig, config.GRAVITY);
}

if(config.IBC_TESTING) {
    baseConfig.faucetMnemonic = testWallets[1].mnemonic;
    ibcBalanceTest(baseConfig, config.IBC);
}

if(config.GENERAL_TESTING) {
    // baseConfig.faucetMnemonic = testWallets[2].mnemonic;
    loadTest(baseConfig, config.GENERAL);
}

if(config.NFT_TESTING) {
    // baseConfig.faucetMnemonic = testWallets[2].mnemonic;
    nftMassMint(baseConfig);
}