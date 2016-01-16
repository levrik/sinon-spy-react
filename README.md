# sinon-spy-react
Spy on React.js classes with Sinon

## Example

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
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const spyOnReactClass = require('sinon-spy-react');

const Component = require('./Component'); // some React component to test

it('calls componentDidMount after mounting', () => {
    const spy = spyOnReactClass(Component, 'componentDidMount'); // returns a Sinon spy
    const component = TestUtils.renderIntoDocument(<Component />);

    assert(spy.called);
});
```
