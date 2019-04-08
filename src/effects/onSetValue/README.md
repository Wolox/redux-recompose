## onSetValue - Effect

This effect allow us to put a constant in the state.  

Example:  
```js
const initialState = {
  aTarget: null
};

const reducerDescription = {
  [actions.LOADING]: onSetValue(true)
};

export default createReducer(initialState, reducerDescription);
```

If we now do:  
`dispatch({ type: actions.LOADING, target: 'aTarget' });`  

Then the state will be like:  
```js
state = {
  aTarget: true
};
```
