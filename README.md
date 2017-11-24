# redux-recompose  

## Why another Redux library ?  
`redux-recompose` provide tools to write less reducers/actions code.  

Usually, we are used to write:  
```
actions.js

function increment(anAmount) {
  return { type: 'INCREMENT', payload: anAmount };
}

reducer.js

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

```
actions.js

// Define an action. It will place the result on state.counter
function increment(anAmount) {
  createAction('INCREMENT', 'counter', anAmount);
}


reducer.js
// Create a new effect decoupled from the state structure at all.
const onAdd = (state, action) => ({ ...state, [action.target]: state[action.target] + action.payload });

// Describe your reducer - without the switch
const reducerDescription = {
  'INCREMENT': onAdd()
}

// Create it !
const reducer = createReducer(initialState, reducerDescription);

```

## Effects [WIP]
`redux-recompose` provides some effects to ease reducer definitions. These are:  

*onSuccess* It will:  
  * Put `${action.target}Loading` in `false`  
  * Put `${action.target}Error` in `null`  
  * Fill `${action.target}` with your `action.payload` by default, or use a selector provided  
  Examples:  
    ```
    const selector = (action, state) => action.payload || state[action.target];
    const reducerDescription = {
      'SUCCESS': onSuccess(),
      'SUCCESS_AND_ADD': onSuccess(selector)
    };
    ```
*onFailure*: It will:  
  * Put `${action.target}Loading` in `false`  
  * Put `${action.target}Error` with your `action.payload`. This also supports a selector.  
*onLoading*: It will put `${action.target}Loading` in true. Also supports selectors.  
*onLoaded*: It will put `${action.target}Loading` in false. Also supports selectors.  

_Spoiler alert_: The last ones are useful to implement SUCCESS/FAILURE async actions pattern in thunk actions. Soon will be available this creator.  

We are currently writting some other effects:  
```
onSetValue
onReset
onDelete
onToggle
onAppend
onCycle
onMap
```

And other utilities like  
```
composeEffects
```

New effects are welcome ! Feel free to open an issue or even a PR.  

## Creators [WIP]  
There are a few creators that also ease writing Redux reducers and actions.  

*createReducer*: Receives an initialState and a reducer description. It replaces the traditional switch.  
  Example:  
  ```
  const reducerDescription = {
    'ACTION_NAME': (state, action) => ({ ...state, aTarget: ':)' })
  }

  const initialState = { aTarget: null };
  const reducer = createReducer(initialState, reducerDescription);
  ...
  dispatch({ type: 'ACTION_NAME' }); // state.aTarget = ':)'
  ```
*createAction*: Receives a type, a target and optionally a payload. Returns a new action.  
*createTypes*: Receives a string list and another string to prepend a namespace.  
  Example:  
  ```
  const actions = createTypes(['ACTION1', 'ACTION2'], '@@NAMESPACE');
  actions.ACTION1 === '@@NAMESPACE/ACTION1';
  ```

We are currently working on these creators:  
```
createThunkAction
createMultiTargetAction
createPollingAction
```
Since state handling is decoupled from its state, we could create some more complex async actions, or even map
an effect with an action type to create families of actions.  
More crazy and useful ideas are welcome too !  

## Completors [WIP]
You could use completors to reduce your code size.  

*completeState*: Receives a state description and a list of target exceptions.  
  Example:  
  ```
  const initialLongState = {
    thing: null,
    thingLoading: false,
    thingError: null,
    otherThing: null,
    otherThingLoading: false,
    otherThingError: null,
    anotherThing: null
  };

  const initialStateDescription = {
    thing: null,
    otherThing: null,
    anotherThing: null
  }

  const initialState = completeState(initialStateDescription, ['anotherThing']);

  initialState and initialLongState are equivalent.
  ```
*completeReducer*: Receives an object with `primaryActions` that is a string list of action names, and optionally a `override`.
For those actions in `primaryActions`, it will add `onLoading`, `onSuccess` and `onFailure` for `action.type`, `${action.type}_SUCCESS` and `${action.type}_FAILURE` respectively.  
  Example:  
  ```
  const actions = createActions(['FETCH', 'FETCH_SUCCESS', 'FETCH_FAILURE', 'OTHER'], '@@API');
  const reducerDescription = {
    primaryActions: [actions.FETCH],
    override: {
      [actions.OTHER]: () => console.log('Completing the reducer description')
    }
  }

  const reducer = createReducer(completeReducer(reducerDescription));
  ```

We are working to introduce other completors like:  
```
completeActionTypes
completeFromProps
```
Just to write less code.  

## Decorators [WIP]
Decorators are meant to customize your thunk action behavior. We are working on these:  

```
withPreRequest
withPostRequest
withStatusHandling
withSuccess
withFailure
withMultiserviceCall
withDetermination
withBaseThunkAction
```

And a function `composeDecorators` to help crafting your own async action definitions.  

## Configuration [WIP]

Currently, this library is oriented to use `seamless-immutable` for immutability concerns and `apisauce` for doing http requests.  
Soon, this will be able to be configured for using `immutable.js` by example or using another library for requests.  

Stay tuned !  


## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## About

This project is maintained by [Manuel Battan](https://github.com/mvbattan) and it was written by [Wolox](http://www.wolox.com.ar).

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
