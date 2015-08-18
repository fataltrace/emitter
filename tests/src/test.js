import Emitter from '../../src/Emitter';

const DO_SOMETHING_EVENT = 'event';

class Component extends Emitter {
    constructor () {
        super();
    }

    doSomething1 () {
        this.emit(DO_SOMETHING_EVENT, 1);
    }

    doSomething2 () {
        this.emit(DO_SOMETHING_EVENT, 1, 2);
    }

    doSomething3 () {
        this.emit(DO_SOMETHING_EVENT, 1, 2, 3);
    }
}

class Test {
    initialize () {
        this.createComponents();
        this.bindEvents();
        this.fireEvents();
        this.unbindEvents();
        this.fireEvents();
    }

    createComponents () {
        this.component = new Component();
    }

    bindEvents () {
        console.warn('bind events');

        this.handler = (...args) => {
            console.warn(`event handling. Event: ${DO_SOMETHING_EVENT}. Arguments: ${args}`);
        };

        this.component.on(DO_SOMETHING_EVENT, this.handler);
        this.component.on(DO_SOMETHING_EVENT, this.handler);
        this.component.on(DO_SOMETHING_EVENT, this.handler);
    }

    unbindEvents () {
        console.warn('unbind events');

        this.component.off(DO_SOMETHING_EVENT, this.handler);
    }

    fireEvents () {
        console.warn('fire events');

        this.component.doSomething1();
        this.component.doSomething2();
        this.component.doSomething3();
    }
}


let test = new Test();

test.initialize();
