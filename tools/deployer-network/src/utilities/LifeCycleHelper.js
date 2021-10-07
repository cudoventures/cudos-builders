const Log = require('./LogHelper');

class LifeCycleHelper {

    constructor() {
        this.handlers = [];
        this.exitted = false;
    }

    init() {
        process.on('SIGINT', this.onExit);
        process.on('SIGQUIT', this.onExit);
        process.on('SIGTERM', this.onExit);
        process.on('uncaughtException', this.onExit);
        process.on('unhandledRejection', this.onExit);
    }

    addExitHandler(callback) {
        this.handlers.push(callback);
    }

    onExit = async () => {
        Log.main('Exiting');
        Log.main('Please wait to close all connections and docker instances');
        for (let i = this.handlers.length;  i-- > 0; ) {
            await this.handlers[i]();
        }
        process.exit(0);
    }

}

module.exports = LifeCycleHelper;