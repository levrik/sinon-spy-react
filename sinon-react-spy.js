const React = require('react');
const ReactDOM = require('react-dom');
const sinon = require('sinon');

function spyOnReactClass(reactClass, methodName) {
    const classProto = reactClassPrototype(reactClass);
    const spy = sinon.spy();

    if (classProto.__reactAutoBindMap) classProto.__reactAutoBindMap[methodName] = spy;
    return spy;
}

function reactClassPrototype(reactClass) {
    const ctor = reactClass.prototype && reactClass.prototype.constructor;
    if (typeof ctor === 'undefinied')
        throw 'A component constructor could not be found for this class. Are you sure you passed in a React component?';

    return ctor.prototype;
}

module.exports = spyOnReactClass;
