import dotenv from 'dotenv';
import path from 'path';
import getIbcConfig from './ibcConfig.js';
import getGravityConfig from './gravityConfig.js';
import getGeneralTestingConfig from './generalTestingConfig.js';

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
    'IBC_TESTING',
    'GRAVITY_TESTING',
    'GENERAL_TESTING',
    'CHAIN_ID',
    'BLOCK_TIME',
    'GAS_PRICE',
    'REST',
    'FAUCET_MNEMONIC',
];

envVariables.forEach((envVariable) => {
    if (!process.env[envVariable]) {
        throw new Error(`Environment variable ${envVariable} is missing`);
    }
});


const IBC_TESTING = process.env.IBC_TESTING.toLowerCase() === 'true';
const GRAVITY_TESTING = process.env.GRAVITY_TESTING.toLowerCase() === 'true';
const GENERAL_TESTING = process.env.GENERAL_TESTING.toLowerCase() === 'true';

const IBC = IBC_TESTING ? getIbcConfig() : null;
const GRAVITY = GRAVITY_TESTING ? getGravityConfig() : null;
const GENERAL = GENERAL_TESTING ? getGeneralTestingConfig() : null;
const FAUCET_MNEMONIC = process.env.FAUCET_MNEMONIC.replaceAll("\"", '');

export default {
    IBC_TESTING,
    GRAVITY_TESTING,
    GENERAL_TESTING,
    CHAIN_ID: process.env.CHAIN_ID,
    BLOCK_TIME: process.env.BLOCK_TIME,
    GAS_PRICE: process.env.GAS_PRICE,
    REST: process.env.REST,
    FAUCET_MNEMONIC,
    IBC,
    GRAVITY,
    GENERAL,
};
