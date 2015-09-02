export default class {
    constructor () {
        this.handlers = {};
    }

    on (eventNames, handler) {
        eventNames.split(' ').forEach(eventName => {
            if (!this.handlers[eventName]) {
                this.handlers[eventName] = [];
            }

            this.handlers[eventName].push(handler);
        });
    }

    off (eventName, handler) {
        let index = this.handlers[eventName].indexOf(handler);

        if (index === -1) {
            return;
        }

        this.handlers[eventName].splice(index, 1);
    }

    emit (eventName, ...args) {
        if (!this.handlers[eventName]) {
            return;
        }

        this.handlers[eventName].forEach(handler => handler.apply(this, args));
    }
}