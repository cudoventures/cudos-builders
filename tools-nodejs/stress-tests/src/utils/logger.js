const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";

export function logGeneral(msg) {
    console.log(YELLOW, msg)
}

export function logSuccess(msg) {
    console.log(GREEN, msg);
}

export function logError(msg) {
    console.log(RED, msg);
}