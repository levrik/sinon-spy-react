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

function stubComponentMethod(reactClass, methodName) {
    var classProto = reactClassPrototype(reactClass);
    var stub;
    var on;
    var idx;
    var i;

    if (classProto.__reactAutoBindMap) { // React 0.14.x
      stub = classProto.__reactAutoBindMap[methodName] = sinon.stub(classProto.__reactAutoBindMap, methodName);
    } else if (classProto.__reactAutoBindPairs) { // React 15.x
      idx = classProto.__reactAutoBindPairs.indexOf(methodName);
      if(idx !== -1){
          stub = sinon.stub(classProto.__reactAutoBindPairs, idx+1);
      } else {
          stub = sinon.stub();
          i = classProto.__reactAutoBindPairs.push( methodName );
          classProto.__reactAutoBindPairs.push( stub );

          stub.restore = function(){
             classProto.__reactAutoBindPairs.splice(i-1, 2);
          }
      }
    }
    return stub;
}

function reactClassPrototype(reactClass) {
    var ctor = reactClass.prototype && reactClass.prototype.constructor;
    if (typeof ctor === 'undefined')
        throw new Error('A component constructor could not be found for this class. Are you sure you passed in a React component?');

    return ctor.prototype;
}

module.exports.spyOnComponentMethod = spyOnComponentMethod;
module.exports.stubComponentMethod = stubComponentMethod;
