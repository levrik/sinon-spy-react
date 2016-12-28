sinon-spy-react [![npm package](https://img.shields.io/npm/v/sinon-spy-react.svg?style=flat-square)](https://www.npmjs.com/package/sinon-spy-react)
==============
Spy on React.js classes with Sinon

## DEPRECATED

Please use classes instead of the `React.createClass` API since it's deprecated. Spying and stubbing of class methods is possible without this library.

#### How do I migrate my tests after conversion to classes?

```javascript
// Before
const spy = spyOnComponentMethod(Component, 'componentDidMount');

// After
const spy = sinon.spy(Component.prototype, 'componentDidMount');
```

```javascript
// Before
const stub = stubComponentMethod(Component, 'getInitialState').returns({
  foo: 'bar'
});

// After
const stub = sinon.stub(Component.prototype, 'getInitialState').returns({
  foo: 'bar'
});
```

## Installation

```
npm install sinon-spy-react --save-dev
```

> For the old 1.x documentation, look [here](https://github.com/levrik/sinon-spy-react/blob/1.1.2/README.md).

## API

### `spyOnComponentMethod(reactClass, methodName)`

This method creates and returns a spy on the given React component class and method. The original function is wrapped into the spy. That means the original code will still be executed. To prevent this or execute custom code use a stub.

**Note**: It isn't possible to create a spy on a method which does not exist except for lifecycle methods (e.g. `componentDidMount`). `getDefaultProps` and `getChildContext` are not supported. For `getInitialState` use a stub. That can be used to return a custom initial state for the test scenario, for example.

### `stubComponentMethod(reactClass, methodName)`

This method stubs the method on the given React component class and returns the stub.

**Note**: The `restore` method of the stub only restores the function on the React class definition, not on the instance. Create a new instance of the component after calling `restore` to get an instance with the restored method.

## Examples

```javascript
import assert from 'assert'; // obviously you can use a assertion library of your choice
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { spyOnComponentMethod, stubComponentMethod } from 'sinon-spy-react';

import Component from './Component'; // some React component to test

it('calls componentDidMount after mounting', () => {
    const spy = spyOnComponentMethod(Component, 'componentDidMount');
    const component = TestUtils.renderIntoDocument(<Component />);

    assert(spy.calledOnce);
});

it('does something with specific initial state', () => {
    const stub = stubComponentMethod(Component, 'getInitialState').returns({
      foo: 'bar' // the stubbed/mocked initial state
    });
    const spy = spyOnComponentMethod(Component, 'someSpecialMethod'); // gets called if state.foo === 'bar'
    const component = TestUtils.renderIntoDocument(<Component />);

    assert(spy.calledOnce);

    stub.restore();
});
```

The examples are written in ES6 but you can use this library without problems with ES5.
