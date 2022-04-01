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
    'GAS',
    'FEE',
    'MNEMONICS',
    'ERC20_CONTRACT_ADDRESS',
    'BRIDGE_CONTRACT_ADDRESS',
    'BRIDGE_FEE',
    'ETHEREUM_GAS_PRICE',
    'ETHEREUM_GAS',
    'BRIDGE_FEE'
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
        FEE: process.env.FEE,
        GAS: process.env.GAS,
        BRIDGE_FEE: process.env.BRIDGE_FEE,
        MNEMONICS: process.env.MNEMONICS,
    },
    ETHEREUM: {
        ERC20_CONTRACT_ADDRESS: process.env.ERC20_CONTRACT_ADDRESS,
        BRIDGE_CONTRACT_ADDRESS: process.env.BRIDGE_CONTRACT_ADDRESS,
        ETHEREUM_GAS_PRICE: process.env.ETHEREUM_GAS_PRICE,
        ETHEREUM_GAS: process.env.ETHEREUM_GAS,
        ETHEREUM_RPC: process.env.ETHEREUM_RPC,
    },
};
