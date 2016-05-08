var React = require('react');
var ReactDOM = require('react-dom');
var sinon = require('sinon');

function spyOnComponentMethod(reactClass, methodName) {
    var classProto = reactClassPrototype(reactClass);
    var methodIsLifecycle = isLifecycleMethod(methodName);
    if (!isSpyableLifecycleMethod(methodName) && methodIsLifecycle) throw new Error('Cannot spy on lifecycle method ' + methodName + '. Please use a stub instead.');

    if (classProto.__reactAutoBindMap) { // React 0.14.x
      if (typeof classProto.__reactAutoBindMap[methodName] === 'undefined') {
        if (methodIsLifecycle) return classProto.__reactAutoBindMap[methodName] = sinon.spy();
        else throw new Error('Cannot spy on a method that does not exist.');
      }

      return sinon.spy(classProto.__reactAutoBindMap, methodName);
    } else if (classProto.__reactAutoBindPairs) { // React 15.x
      if (isSpyableLifecycleMethod(methodName)) return sinon.spy(classProto, methodName);

      var idx = classProto.__reactAutoBindPairs.indexOf(methodName);
      if (idx === -1) throw new Error('Cannot spy on a method that does not exist.');

      return sinon.spy(classProto.__reactAutoBindPairs, idx + 1);
    }
}

function stubComponentMethod(reactClass, methodName) {
    var classProto = reactClassPrototype(reactClass);
    var methodIsLifecycle = isLifecycleMethod(methodName);

    if (classProto.__reactAutoBindMap) { // React 0.14.x
      if (typeof classProto.__reactAutoBindMap[methodName] === 'undefined') {
        if (methodIsLifecycle) return classProto.__reactAutoBindMap[methodName] = sinon.stub();
        else throw new Error('Cannot stub a method that does not exist.');
      }

      return sinon.stub(classProto.__reactAutoBindMap, methodName);
    } else if (classProto.__reactAutoBindPairs) { // React 15.x
      if (methodName === 'getDefaultProps') return sinon.stub(classProto.constructor, methodName);
      if (methodIsLifecycle) return sinon.stub(classProto, methodName);

      var idx = classProto.__reactAutoBindPairs.indexOf(methodName);
      if (idx === -1) throw new Error('Cannot stub a method that does not exist.');

      return sinon.stub(classProto.__reactAutoBindPairs, idx + 1);
    }
}

function reactClassPrototype(reactClass) {
    var ctor = reactClass.prototype && reactClass.prototype.constructor;
    if (typeof ctor === 'undefined')
        throw new Error('A component constructor could not be found for this class. Are you sure you passed in a React component?');

    return ctor.prototype;
}

function isLifecycleMethod(methodName) {
  switch (methodName) {
    case 'getDefaultProps':
    case 'getInitialState':
    case 'getChildContext':
    case 'componentWillMount':
    case 'componentDidMount':
    case 'componentWillReceiveProps':
    case 'componentWillUpdate':
    case 'componentDidUpdate':
    case 'componentWillUnmount':
    case 'shouldComponentUpdate':
    case 'render':
      return true;
    default:
      return false;
  }
}

function isSpyableLifecycleMethod(methodName) {
  switch (methodName) {
    case 'componentWillMount':
    case 'componentDidMount':
    case 'componentWillReceiveProps':
    case 'componentWillUpdate':
    case 'componentDidUpdate':
    case 'componentWillUnmount':
      return true;
    default:
      return false;
  }
}

exports.spyOnComponentMethod = spyOnComponentMethod;
exports.stubComponentMethod = stubComponentMethod;
