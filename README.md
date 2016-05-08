sinon-spy-react [![npm package](https://img.shields.io/npm/v/sinon-spy-react.svg?style=flat-square)](https://npmjs.org/package/sinon-spy-react)
==============
Spy on React.js classes with Sinon

## Installation

```
npm install sinon-spy-react --save-dev
```

## API

### `spyOnComponentMethod(reactClass, methodName)`

This method creates and returns a spy on the given React component class and method. The original function gets wrapped into the spy. That means the original code gets still executed. To prevent this or execute custom code use a stub.

**Note**: It isn't possible to create a spy on a method which does not exists but with the exception of lifecycle methods (e.g. `componentDidMount`). `getDefaultProps` and `getChildContext` are not supported. For `getInitialState` use a stub which for example can be used to return a custom initial state for the test.

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
