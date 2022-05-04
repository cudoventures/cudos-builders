// import gravityBalanceTest from './tests/gravity/testModuleAndContractBalances.js';
import ibcBalanceTest from './tests/ibc/testModuleAndMintedBalances.js';
import loadTest from './tests/general/loadTest.js';
import config from '../config/config.js';
import { Cosmos } from "@cosmostation/cosmosjs";

const provider = new Cosmos(config.REST, config.CHAIN_ID);
provider.setPath("m/44'/118'/0'/0/0");
provider.bech32MainPrefix = 'cudos';
provider.gasPrice = config.GAS_PRICE;

const baseConfig = {
    provider,
    faucetMnemonic: config.FAUCET_MNEMONIC,
    blockTime: config.BLOCK_TIME,
    gasPrice: config.GAS_PRICE,
    rest: config.REST,
}

// if(config.GRAVITY_TESTING) {
//     gravityBalanceTest(baseConfig, config.GRAVITY);
// }

if(config.IBC_TESTING) {
    ibcBalanceTest(baseConfig, config.IBC);
}

if(config.GENERAL_TESTING) {
    loadTest(baseConfig, config.GENERAL);
}