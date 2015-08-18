(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _default = (function () {
    function _default() {
        _classCallCheck(this, _default);

        this.handlers = {};
    }

    _createClass(_default, [{
        key: "on",
        value: function on(eventName, handler) {
            if (!this.handlers[eventName]) {
                this.handlers[eventName] = [];
            }

            this.handlers[eventName].push(handler);
        }
    }, {
        key: "off",
        value: function off(eventName, handler) {
            var index = this.handlers[eventName].indexOf(handler);

            if (index === -1) {
                return;
            }

            this.handlers[eventName].splice(index, 1);
        }
    }, {
        key: "emit",
        value: function emit(eventName) {
            var _this = this;

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            this.handlers[eventName].forEach(function (handler) {
                return handler.apply(_this, args);
            });
        }
    }]);

    return _default;
})();

exports["default"] = _default;
module.exports = exports["default"];

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _srcEmitter = require('../../src/Emitter');

var _srcEmitter2 = _interopRequireDefault(_srcEmitter);

var DO_SOMETHING_EVENT = 'event';

var Component = (function (_Emitter) {
    _inherits(Component, _Emitter);

    function Component() {
        _classCallCheck(this, Component);

        _get(Object.getPrototypeOf(Component.prototype), 'constructor', this).call(this);
    }

    _createClass(Component, [{
        key: 'doSomething1',
        value: function doSomething1() {
            this.emit(DO_SOMETHING_EVENT, 1);
        }
    }, {
        key: 'doSomething2',
        value: function doSomething2() {
            this.emit(DO_SOMETHING_EVENT, 1, 2);
        }
    }, {
        key: 'doSomething3',
        value: function doSomething3() {
            this.emit(DO_SOMETHING_EVENT, 1, 2, 3);
        }
    }]);

    return Component;
})(_srcEmitter2['default']);

var Test = (function () {
    function Test() {
        _classCallCheck(this, Test);
    }

    _createClass(Test, [{
        key: 'initialize',
        value: function initialize() {
            this.createComponents();
            this.bindEvents();
            this.fireEvents();
            this.unbindEvents();
            this.fireEvents();
        }
    }, {
        key: 'createComponents',
        value: function createComponents() {
            this.component = new Component();
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            console.warn('bind events');

            this.handler = function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                console.warn('event handling. Event: ' + DO_SOMETHING_EVENT + '. Arguments: ' + args);
            };

            this.component.on(DO_SOMETHING_EVENT, this.handler);
            this.component.on(DO_SOMETHING_EVENT, this.handler);
            this.component.on(DO_SOMETHING_EVENT, this.handler);
        }
    }, {
        key: 'unbindEvents',
        value: function unbindEvents() {
            console.warn('unbind events');

            this.component.off(DO_SOMETHING_EVENT, this.handler);
        }
    }, {
        key: 'fireEvents',
        value: function fireEvents() {
            console.warn('fire events');

            this.component.doSomething1();
            this.component.doSomething2();
            this.component.doSomething3();
        }
    }]);

    return Test;
})();

var test = new Test();

test.initialize();

},{"../../src/Emitter":1}]},{},[2]);
