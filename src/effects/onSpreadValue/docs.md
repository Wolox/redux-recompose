## onSpreadValue - Effect

This effect allow us to read values from the `action` and to spread them in the state.  

By default, this effect reads `action.payload`.  

Example:  
```
const initialState = {
  key1: null,
  key2: null
};

const reducerDescription = {
  [actions.SPREAD]: onSpreadValue()
};

export default createReducer(initialState, reducerDescription);
```

If we now do:  
`dispatch({
  type: actions.SPREAD,
  payload: { key1: 'Hello', key2: 45 }
});`  

Then the state will be like:  
```
state = {
  key1: 'Hello',
  key2: 45
};
```

### Custom selectors
  `onSpreadValue` receives an optional parameter.
    * selector: It specifies how we are going to read the `action` 
    `action => any`  
    By default, is:  
    `action => action.payload`  
