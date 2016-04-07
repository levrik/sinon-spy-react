var React = require('react');
var ReactDOM = require('react-dom');
var sinon = require('sinon');

function spyOnReactClass(reactClass, methodName) {
    var classProto = reactClassPrototype(reactClass);
    var spy = sinon.spy();

    if (classProto.__reactAutoBindMap) { // React 0.14.x
      classProto.__reactAutoBindMap[methodName] = spy;
    } else if (classProto.__reactAutoBindPairs) { // React 15.x
      classProto.__reactAutoBindPairs.push(methodName, spy);
    }

    return spy;
}

function reactClassPrototype(reactClass) {
    var ctor = reactClass.prototype && reactClass.prototype.constructor;
    if (typeof ctor === 'undefinied')
        throw new Error('A component constructor could not be found for this class. Are you sure you passed in a React component?');

    return ctor.prototype;
}

module.exports = spyOnReactClass;
