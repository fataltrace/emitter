export default class {
    constructor () {
        this.handlers = {};
    }

    on (eventName, handler) {
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = [];
        }

        this.handlers[eventName].push(handler);
    }

    off (handler) {
        let index = this.handlers.indexOf(handler);

        if (index === -1) {
            return;
        }

        this.handlers.splice(index, 1);
    }

    emit (eventName, ...args) {
        this.handlers[eventName].forEach(handler => handler.apply(this, args));
    }
}