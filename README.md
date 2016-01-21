sinon-spy-react [![NPM Version](https://img.shields.io/npm/v/sinon-spy-react.svg?style=flat)](https://npmjs.org/package/sinon-spy-react)
==============
Spy on React.js classes with Sinon

## Installation

```
npm install sinon-spy-react --save-dev
```

## Examples

### Without JSX

```javascript
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var spyOnReactClass = require('sinon-spy-react');

var Component = require('./Component'); // some React component to test

it('calls componentDidMount after mounting', function () {
    var spy = spyOnReactClass(Component, 'componentDidMount'); // returns a Sinon spy
    var component = TestUtils.renderIntoDocument(React.createElement(Component));

    assert(spy.called);
});
```

### With ES6 and JSX

```javascript
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import spyOnReactClass from 'sinon-spy-react';

import Component from './Component'; // some React component to test

it('calls componentDidMount after mounting', () => {
    const spy = spyOnReactClass(Component, 'componentDidMount'); // returns a Sinon spy
    const component = TestUtils.renderIntoDocument(<Component />);

    assert(spy.called);
});
```
