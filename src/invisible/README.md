![coverage](https://img.shields.io/badge/Coverage-92%25-E01563.svg) ![downloads](https://img.shields.io/npm/dw/redux-recompose.svg?colorB=99d000&label=Downloads&style=popout) [![supported by](https://img.shields.io/badge/Supported%20by-Wolox.💗-blue.svg)](https://www.wolox.com.ar/) 
# Invisible Reducer 👻

By using invisible reducer, repeating the same logic in each of the reducers is avoided. 

It is a extracting your cross-reducer logic, so this logic keeps isolated and reusable by our other reducers. Also, it keeps hidden from other reducers, so 👻.  

In a few words, less work...


### Learn Redux-recompose

If you are not aware, we invite you to read  [**Redux-recompose**](https://github.com/Wolox/redux-recompose)

### Installation 

Dependencies:
```
>: npm install --save redux
````
if you already have it installed, skip this step:
```
>: npm install --save redux-recompose
```
we will need redux-recompose to use Invisible reducer.

### Example
Then use it in your app, already implemented redux, we add wrapCombineReducers:
```
import { combineReducers as CR } from 'redux';
import { wrapCombineReducers } from 'redux-recompose'

const combineReducers = wrapCombineReducers(CR);

const rootReducer = combineReducers({
 // Add here your reducers as usual.
});
```
CombineReducers: utility from redux. This helps merge several reducers into a root one. Each reducer is part of the global state

And that’s all, invisible in action.

By default, redux-recompose ships with a default invisible reducer that is the following:

```
import createReducer from '../../creators/createReducer';
import onLoading from '../../effects/onLoading';
import onSuccess from '../../effects/onSuccess';
import onFailure from '../../effects/onFailure';


// TODO: Let the user specify selectors
const reducerDescription = {
LOADING: onLoading(),
SUCCESS: onSuccess(),
FAILURE: onFailure()
};

export const defaultActionNames = Object.keys(reducerDescription);

// TODO: Let user specify this initialState
export default createReducer({}, reducerDescription);

```



License
----

MIT
