## 2.0.1

* [`e2ab5fb`](https://github.com/levrik/sinon-spy-react/commit/e2ab5fb486269a847daa1e4955f8cdd7c7dc06e9) Deprecated this module

## 2.0.0

#### ATTENTION: BREAKING CHANGES

First of all, there is a small change in the API. The module does not export the `spyOnReactClass` method directly anymore. Instead it exports two functions now: `spyOnComponentMethod` (the old `spyOnReactClass`) and `stubComponentMethod`.

Secondly the behavior of the `spyOnComponentMethod` method has changed a bit. Now it returns a spy with the original function wrapped. That means that the original function doesn't get overwritten anymore. To "restore" the old behavior use stubs with the `stubComponentMethod` method instead.

* [`6ac114d`](https://github.com/levrik/sinon-spy-react/commit/6ac114df5055aa0700a86fab62bf3a0eee051fa8)
  [`744f8d5`](https://github.com/levrik/sinon-spy-react/commit/744f8d539a69e31e8a52d561643899effdf91ad3)
  [#6](https://github.com/levrik/sinon-spy-react/pull/6)
  Added basic support for stubs (and refactored a bit the spies code)
  ([@apires](https://github.com/apires) and [me](https://github.com/levrik))
* [`6fd262d`](https://github.com/levrik/sinon-spy-react/commit/6fd262df5e438ffd67dadf90fcb381c22ba87ff9) Added tests

## 1.1.1

* [`1263887`](https://github.com/levrik/sinon-spy-react/commit/1263887bcd8b585574c2bb3a556e3ef648dd7eb2)
  [#4](https://github.com/levrik/sinon-spy-react/pull/4)
  Corrected check for constructor existence
  ([@MasterXen](https://github.com/MasterXen))

## 1.1.0

* [`50f5e40`](https://github.com/levrik/sinon-spy-react/commit/50f5e40a47e3b3355365174e0b042055d1757e9f)
  Added compatibility with React 15

## 1.0.4

* [`049783c`](https://github.com/levrik/sinon-spy-react/commit/049783c48ec3de8db94c8ba1d1cb0e078fe74521)
  [#1](https://github.com/levrik/sinon-spy-react/pull/1)
  Using ES6 imports in example in the README
  ([@benstokoe](https://github.com/benstokoe))

## 1.0.3

* [`b038840`](https://github.com/levrik/sinon-spy-react/commit/b03884099992bad40e50e0ea8e39b4995097eba2)
  Throw an Error instead of string

## 1.0.2

* [`b79e3ca`](https://github.com/levrik/sinon-spy-react/commit/b79e3ca2aa040ae664e9cb21a8198280e2bf3537)
  Renamed main file to match package name

## 1.0.1

* [`78e9f1a`](https://github.com/levrik/sinon-spy-react/commit/78e9f1a1a39aeaa7a68a7a8e8c2e3bfeddbb87e2)
  Using ES5 instead ES6

## 1.0

* Initial release
