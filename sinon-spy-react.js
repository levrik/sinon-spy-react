var React = require('react');
var ReactDOM = require('react-dom');
var sinon = require('sinon');

function spyOnComponentMethod(reactClass, methodName) {
    var classProto = reactClassPrototype(reactClass);
    var spy;
    var on;
    var idx;

    if (classProto.__reactAutoBindMap) { // React 0.14.x
      spy = classProto.__reactAutoBindMap[methodName] = sinon.spy(classProto.__reactAutoBindMap[methodName]);
    } else if (classProto.__reactAutoBindPairs) { // React 15.x
      idx = classProto.__reactAutoBindPairs.indexOf(methodName);
      if(idx !== -1){
          spy = classProto.__reactAutoBindPairs[idx+1] = sinon.spy(classProto.__reactAutoBindPairs[idx+1]);
      } else {
          throw new Error('Cannot spy on a function that does not exist');
      }
    }
    return spy;
}

function mockComponentMethod(reactClass, methodName) {
    var classProto = reactClassPrototype(reactClass);
    var mock;
    var on;
    var idx;
    var i;

    if (classProto.__reactAutoBindMap) { // React 0.14.x
      mock = classProto.__reactAutoBindMap[methodName] = sinon.mock(classProto.__reactAutoBindMap, methodName);
    } else if (classProto.__reactAutoBindPairs) { // React 15.x
      idx = classProto.__reactAutoBindPairs.indexOf(methodName);
      if(idx !== -1){
          mock = classProto.__reactAutoBindPairs[idx+1] = sinon.mock(classProto.__reactAutoBindPairs, idx+1);
      } else {
          mock = sinon.mock();
          i = classProto.__reactAutoBindPairs.push( methodName );
          classProto.__reactAutoBindPairs.push( methodName );
          classProto.__reactAutoBindPairs.push( mock );
          
          mock.restore = function(){
             classProto.__reactAutoBindPairs.splice(i-1, 2);   
          }
      }
    }
    return mock;
}

function reactClassPrototype(reactClass) {
    var ctor = reactClass.prototype && reactClass.prototype.constructor;
    if (typeof ctor === 'undefined')
        throw new Error('A component constructor could not be found for this class. Are you sure you passed in a React component?');

    return ctor.prototype;
}

module.exports.spyOnComponentMethod = spyOnComponentMethod;
module.exports.mockComponentMethod = mockComponentMethod;
