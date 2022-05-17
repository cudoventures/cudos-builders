import {logGeneral} from './logger';

export default async function wait(seconds, message) {
    return new Promise((resolve) => {
        if(message != ''){
            logGeneral(`Waiting ${seconds} seconds: ${message}`);
        }

        setTimeout(resolve, seconds*1000);
    });
}
