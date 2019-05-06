
# Invisible Reducer 👻

An invisible reducer, we avoid repeating the same logic in each of the reducers is avoided. 

Is a extracting your cross-reducer logic, so this logic kepts isolated and reusable by our other reducers. Also, it keeps hidden from other reducers, so 👻.  

In a few words, less work...

### Example
Then use it in your app, already implemented redux, we add wrapCombineReducers:
```js
import { combineReducers as CR } from 'redux';
import { wrapCombineReducers } from 'redux-recompose'

const combineReducers = wrapCombineReducers(CR);

const rootReducer = combineReducers({
 // Add here your reducers as usual.
});
```
CombineReducers: utility from redux. This helps merge several reducers into a root one. Each reducer is part of the global state.

And that’s all, invisible in action.

By default, redux-recompose ships with a default invisible reducer that is the following:

```js
import createReducer from '../../creators/createReducer';
import onLoading from '../../effects/onLoading';
import onSuccess from '../../effects/onSuccess';
import onFailure from '../../effects/onFailure';

const reducerDescription = {
LOADING: onLoading(),
SUCCESS: onSuccess(),
FAILURE: onFailure()
};

export const defaultActionNames = Object.keys(reducerDescription);
export default createReducer({}, reducerDescription);

```

License
----
MIT
