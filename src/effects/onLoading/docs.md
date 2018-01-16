## onLoading - Effect

This effect puts `${action.target}Loading` in true.

Example of usage:

```
const initialState = {
  targetLoading: true
};

const reducerDescription = {
  [actions.LOADING]: onLoading()
};

export default createReducer(initialState, reducerDescription);
```

### Custom selectors
`onLoading` receives an optional parameter:
  * selector: Specifies a condition according to the action and the state. The condition result is stored in `${action.target}Loading`  
  `(action, state) => Boolean`
  By default, is:  
  `() => true`  
  Which means that it always put `${action.target}Loading` in `true`  
