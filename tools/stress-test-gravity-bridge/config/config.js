import dotenv from 'dotenv';
import path from 'path';

const __dirname = path.resolve(path.dirname('')); 

let envPath = path.join(__dirname, '/config/.env');

if (process.env.ENV_FILENAME) {
    envPath = path.join(__dirname, process.env.ENV_FILENAME);
}

const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error(__dirname);
    throw result.error;
}

// required environment variables
const envVariables = [
    'CHAIN_ID',
    'REST',
    'GAS_PRICE',
    'GAS_PER_MSG',
    'MNEMONIC',
    'ERC20_CONTRACT_ADDRESS',
    'BRIDGE_CONTRACT_ADDRESS',
    "GRAVITY_MODULE_ADDRESS",
    'BRIDGE_FEE',
    'ETH_NODE_URL',
    'BATCH_CREATION_BLOCKS',
    'BRIDGE_FEE',
    'ETH_PRIV_KEY',
    'NUMBER_OF_ADDRESSES',
    'NUMBER_OF_TESTS',
];

envVariables.forEach((envVariable) => {
    if (!process.env[envVariable]) {
        throw new Error(`Environment variable ${envVariable} is missing`);
    }
});

export default {
    CUDOS_NETWORK: {
        CHAIN_ID: process.env.CHAIN_ID,
        REST: process.env.REST,
        GAS_PRICE: process.env.GAS_PRICE,
        GAS_PER_MSG: process.env.GAS_PER_MSG,
        BRIDGE_FEE: process.env.BRIDGE_FEE,
        MNEMONIC: process.env.MNEMONIC,
        GRAVITY_MODULE_ADDRESS: process.env.GRAVITY_MODULE_ADDRESS,
        BATCH_CREATION_BLOCKS: process.env.BATCH_CREATION_BLOCKS,
    },
    ETHEREUM: {
        ERC20_CONTRACT_ADDRESS: process.env.ERC20_CONTRACT_ADDRESS,
        BRIDGE_CONTRACT_ADDRESS: process.env.BRIDGE_CONTRACT_ADDRESS,
        ETH_NODE_URL: process.env.ETH_NODE_URL,
        ETH_PRIV_KEY: process.env.ETH_PRIV_KEY,
    },
    TEST: {
        NUMBER_OF_TESTS: process.env.NUMBER_OF_TESTS,
        NUMBER_OF_ADDRESSES: process.env.NUMBER_OF_ADDRESSES,
    }
};
