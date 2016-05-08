var assert = require('assert');
var jsdom = require('jsdom').jsdom;
var sinon = require('sinon');
var React = require('react');
var TestUtils = require('react-addons-test-utils');

// Set up JSDOM
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;

var sinonReact = require('../sinon-spy-react');

var noop = function() { };

describe('spyOnComponentMethod', function() {
  it('correctly sets up a spy on a component lifecycle method which exists', function() {
    var TestComponent = React.createClass({
      componentDidMount: noop,
      render: function() {
        return null;
      }
    });

    var spy = sinonReact.spyOnComponentMethod(TestComponent, 'componentDidMount');
    var component = TestUtils.renderIntoDocument(React.createElement(TestComponent));

    assert(spy.calledOnce);
  });

  it('correctly sets up a spy on a component lifecycle method which does not exists', function() {
    var TestComponent = React.createClass({
      render: function() {
        return null;
      }
    });

    var spy = sinonReact.spyOnComponentMethod(TestComponent, 'componentDidMount');
    var component = TestUtils.renderIntoDocument(React.createElement(TestComponent));

    assert(spy.calledOnce);
  });

  it('correctly sets up a spy on a custom component method', function() {
    var TestComponent = React.createClass({
      componentDidMount: function() {
        this.customTestMethod();
      },
      customTestMethod: noop,
      render: function() {
        return null;
      }
    });

    var spy = sinonReact.spyOnComponentMethod(TestComponent, 'customTestMethod');
    var component = TestUtils.renderIntoDocument(React.createElement(TestComponent));

    assert(spy.calledOnce);
  });

  it('throws an error if a component lifecycle method is passed which is not spyable', function() {
    var TestComponent = React.createClass({
      render: noop
    });

    assert.throws(sinonReact.spyOnComponentMethod.bind(null, TestComponent, 'shouldComponentUpdate'), /Cannot spy on lifecycle method shouldComponentUpdate. Please use a stub instead./);
  });

  it('throws an error if a custom method is passed which does not exists', function() {
    var TestComponent = React.createClass({
      render: noop
    });

    assert.throws(sinonReact.spyOnComponentMethod.bind(null, TestComponent, 'customTestMethod'), /Cannot spy on a method that does not exist./);
  });
});

describe('stubComponentMethod', function() {
  it('correctly stubs a component lifecycle method which exists', function() {
    var TestComponent = React.createClass({
      componentDidMount: noop,
      render: function() {
        return null;
      }
    });

    var stub = sinonReact.stubComponentMethod(TestComponent, 'componentDidMount');
    var component = TestUtils.renderIntoDocument(React.createElement(TestComponent));

    assert(stub.calledOnce);
  });

  it('correctly stubs a component lifecycle method which does not exists', function() {
    var TestComponent = React.createClass({
      render: function() {
        return null;
      }
    });

    var stub = sinonReact.stubComponentMethod(TestComponent, 'componentDidMount');
    var component = TestUtils.renderIntoDocument(React.createElement(TestComponent));

    assert(stub.calledOnce);
  });

  it('correctly stubs a custom component method', function() {
    var TestComponent = React.createClass({
      componentDidMount: function() {
        this.customTestMethod();
      },
      customTestMethod: noop,
      render: function() {
        return null;
      }
    });

    var stub = sinonReact.stubComponentMethod(TestComponent, 'customTestMethod');
    var component = TestUtils.renderIntoDocument(React.createElement(TestComponent));

    assert(stub.calledOnce);
  });

  it('throws an error if a custom method is passed which does not exists', function() {
    var TestComponent = React.createClass({
      render: noop
    });

    assert.throws(sinonReact.stubComponentMethod.bind(null, TestComponent, 'customTestMethod'), /Cannot stub a method that does not exist./);
  });
});
