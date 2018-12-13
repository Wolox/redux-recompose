## onConcatenate - Effect

This effect allow us to concatenate an array to an array in the state. This is useful for cases where you want to dynamically add elements to an array as you fetch them, like the case of an infinite scroll.

Example:

```
const initialState = {
  numberArray: [1, 2, 3]
};

const reducerDescription = {
  [actions.CONCATENATE]: onConcatenate()
};

export default createReducer(initialState, reducerDescription);
```

If we now do:  
`dispatch({ type: actions.CONCATENATE, target: 'numberArray', payload: [4, 5] });`

Then the state will be:

```
state = {
  numberArray: [1, 2, 3, 4, 5]
};
```

### Custom selectors

`onConcatenate` effect receives an optional parameter:

- selector: This function describes how we read the value from the `action`.  
  `(action, state) => any`  
  By default, is:  
  `action => action.payload`
