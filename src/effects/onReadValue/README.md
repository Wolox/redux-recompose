## onReadValue - Effect

This effect allow us to read values from the `action` and to put them directly in the state.  

By default, this effect reads `action.payload`.  

Example:  
```
const initialState = {
  aTarget: null
};

const reducerDescription = {
  [actions.READ]: onReadValue()
};

export default createReducer(initialState, reducerDescription);
```

If we now do:  
`dispatch({
  type: actions.READ,
  payload: 'Something',
  target: 'aTarget'
});`  

Then the state will be like:  
```
state = {
  aTarget: 'Something'
};
```

### Custom selectors
  `onReadValue` receives an optional parameter.
    * selector: It specifies how we are going to read the `action` and the `state` and place the result in `action.target`.  
    `(action, state) => any`  
    By default, is:  
    `action => action.payload`  
