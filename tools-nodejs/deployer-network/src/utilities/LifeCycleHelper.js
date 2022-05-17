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

    addExitHandler(callback, priority = 0) {
        this.handlers.push(new Handler(callback, priority));
    }

    onExit = async () => {
        Log.main('Exiting');
        Log.main('Please wait to close all connections and docker instances');
        this.handlers.sort((t1, t2) => {
            return t1.priority - t2.priority;
        });
        for (let i = this.handlers.length;  i-- > 0; ) {
            try {
                await this.handlers[i].callback();
            } catch (ex) {
                console.error(ex);
            }
        }
        process.exit(0);
    }

}

class Handler {

    constructor(callback, priority) {
        this.priority =  priority;
        this.callback = callback;
    }

}

module.exports = LifeCycleHelper;