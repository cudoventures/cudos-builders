class LogHelper {

    static main() {
        console.log('\x1b[32m[MAIN] %s\x1b[0m', ...arguments);
    }

    static bash() {
        console.log('\x1b[33m[BASH] %s\x1b[0m', ...arguments);
    }

}

module.exports = LogHelper;