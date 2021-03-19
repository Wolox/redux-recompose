
![versión npm](https://img.shields.io/npm/v/redux-recompose.svg?color=68d5f7)
![Download npm](https://img.shields.io/npm/dw/redux-recompose.svg?color=7551bb)
[![codecov](https://codecov.io/gh/Wolox/redux-recompose/branch/master/graph/badge.svg)](https://codecov.io/gh/Wolox/redux-recompose)
[![supported by](https://img.shields.io/badge/supported%20by-Wolox.💗-blue.svg)](https://www.wolox.com.ar/)
# Redux-recompose  
![Vertical Logo Redux-recompose](./logo/images/Redux_vertical_small@2x.png)

## Why another Redux library ?

`redux-recompose` provide tools to write less reducers/actions code.

Here is a [blog post](https://medium.com/wolox-driving-innovation/932e746b0198) about it.

Usually, we are used to write:

```js
// actions.js

function increment(anAmount) {
  return { type: 'INCREMENT', payload: anAmount };
}

// reducer.js

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + action.payload };
    default:
      return state;
  }
}
```

With the new concept of _target_ of an action, we could write something like:

```js
// actions.js

// Define an action. It will place the result on state.counter
function increment(anAmount) {
  return { type: 'INCREMENT', target: 'counter', payload: anAmount };
}


// reducer.js
// Create a new effect decoupled from the state structure at all.
const onAdd = (state, action) => ({ ...state, [action.target]: state[action.target] + action.payload });

// Describe your reducer - without the switch
const reducerDescription = {
  'INCREMENT': onAdd()
}

// Create it !
const reducer = createReducer(initialState, reducerDescription);
```

## Effects

Effects are functions that describe _how_ the state changes, but are agnostic of _what part_
of the state is being changed.

`redux-recompose` provides some effects to ease reducer definitions. These are:

- [onDelete](./src/effects/onDelete/)
- [onDeleteByIndex](./src/effects/onDeleteByIndex/)
- [onFailure](./src/effects/onFailure/)
- [onLoaded](./src/effects/onLoaded/)
- [onLoading](./src/effects/onLoading/)
- [onReadValue](./src/effects/onReadValue/)
- [onSetValue](./src/effects/onSetValue/)
- [onSuccess](./src/effects/onSuccess/)
- [onAppend](./src/effects/onAppend/)
- [onConcatenate](./src/effects/onConcatenate/)
- [onToggle](./src/effects/onToggle/)
- [onSpreadValue](./src/effects/onSpreadValue/)
- [onCycle](./src/effects/onCycle/)
- [onReplace](./src/effects/onReplace/)
- [onRetry](./src/effects/onRetry/)
- [onCancel](./src/effects/onCancel/)

New effects are welcome ! Feel free to open an issue or even a PR.

## Creators

There are a few creators that also ease writing Redux reducers and async actions.

- [createReducer](./src/creators/createReducer/)
- [createTypes](./src/creators/createTypes/)
- [createThunkAction](./src/creators/createThunkAction/)

Since state handling is decoupled from its state, we could create some more complex async actions, or even map an effect with an action type to create families of actions.  
More crazy and useful ideas are welcome too!

## Completers

You could use completers to reduce your code size. Completers are functions that take
partial definitions (i.e. descriptors) and help to construct the whole definition.

Completers in general looks like this:

- A pattern is being repeated in an element.
- Identify that pattern and try to apply to every element similar to those who use this pattern, although they apply it or not.
- Add some exceptions for elements who don't use this pattern.
- Compress your code size by applying that pattern to all elements but not for exception cases.

There are a few completers that can be used:

- [completeState](./src/completers/completeState/)
- [completeReducer](./src/completers/completeReducer/)
- [completeTypes](./src/completers/completeTypes/)

## Injectors

There's currently documentation for the following:

- [withFailure](./src/injections/withFailure/)
- [withFlowDetermination](./src/injections/withFlowDetermination/)
- [withPostFailure](./src/injections/withPostFailure/)
- [withPostFetch](./src/injections/withPostFetch/)
- [withPostSuccess](./src/injections/withPostSuccess/)
- [withPreFetch](./src/injections/withPreFetch/)
- [withStatusHandling](./src/injections/withStatusHandling/)
- [withSuccess](./src/injections/withSuccess/)

## Middlewares

Middlewares allow to inject logic between dispatching the action and the actual desired change in the store. Middlewares are particularly helpful when handling asynchronous actions.

The following are currently available:

- [fetchMiddleware](./src/middlewares/)

## Using with immutable libraries

The way `redux-recompose` updates the redux state can be configured. The default configuration is

```js
(state, newContent) => ({ ...state, ...newContent })
```

You can use `configureMergeState` to override the way `redux-recompose` handles state merging. This is specially useful when you are using immutable libraries.
For example, if you are using `seamless-immutable` to keep your store immutable, you'll want to use it's [`merge`](https://github.com/rtfeldman/seamless-immutable#merge) function. You can do so with the following configuration:

```js
import { configureMergeState } from 'redux-recompose';

configureMergeState((state, newContent) => state.merge(newContent))
```

## Recipes

- [Making HTTP requests by dispatching a redux action](./recipes/FETCHING.md)
- [Invisible Reducer](./recipes/INVISIBLE.md)
- [Polling](./recipes/POLLING.md)

## Thanks to

This library was inspired by acdlite/recompose. Let's keep creating tools for ease development.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## About

This project was written by [Manuel Battan](https://github.com/mvbattan) and it is maintained by [Wolox](http://www.wolox.com.ar).

![Wolox](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)

## License

**redux-recompose** is available under the MIT [license](LICENSE).

    Copyright (c) 2017 Manuel Battan <manuel.battan@wolox.com.ar>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
