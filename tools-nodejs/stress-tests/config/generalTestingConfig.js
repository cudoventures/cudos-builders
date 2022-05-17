import dotenv from 'dotenv';
import path from 'path';

export default function getGeneralTestingConfig () {
    const __dirname = path.resolve(path.dirname('')); 

    let envPath = path.join(__dirname, '/config/general-test.env');

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
        'NUMBER_OF_ADDRESSES',
        'NUMBER_OF_TESTS',
        'VALIDATOR_ADDRESSES',
    ];

    envVariables.forEach((envVariable) => {
        if (!process.env[envVariable]) {
            throw new Error(`Environment variable ${envVariable} is missing`);
        }
    });

    const VALIDATOR_ADDRESSES = process.env.VALIDATOR_ADDRESSES.split(',');

    return {
        NUMBER_OF_TESTS: process.env.NUMBER_OF_TESTS,
        NUMBER_OF_ADDRESSES: process.env.NUMBER_OF_ADDRESSES,
        VALIDATOR_ADDRESSES,
    };
}
