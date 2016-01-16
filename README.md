# sinon-spy-react
<<<<<<< HEAD
Spy on React.js classes with Sinon

## Example

```javascript
var spyOnReactClass = require('sinon-spy-react');
var TestUtils = require('react-addons-test-utils');
var Component = require('./Component'); // some React component to test

it('calls componentDidMount after mounting', function () {
    var spy = spyOnReactClass(Component, 'componentDidMount'); // returns a Sinon spy
    var component = TestUtils.renderIntoDocument(<Component />);

    assert(spy.called);
});
```
=======
Spy on React classes with sinon
>>>>>>> dcfebadac83cbdab1af68618aa92336267483aa1
