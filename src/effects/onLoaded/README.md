## onLoaded - Effect

This effect puts `${action.target}Loading` in false.

Example of usage:

```js
const initialState = {
  targetLoading: true
};

const reducerDescription = {
  [actions.LOADED]: onLoaded()
};

export default createReducer(initialState, reducerDescription);
```

### Custom selectors
`onLoaded` receives an optional parameter:
  * selector: Specifies a condition according to the action and the state. The condition result is stored in `${action.target}Loading`  
  `(action, state) => Boolean`
  By default, is:  
  `() => false`  
  Which means that it always put `${action.target}Loading` in `false`  
