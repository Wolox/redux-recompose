## onAppend - Effect

This effect allow us to append an element to an array in the state.

Example:

```js
const initialState = {
  fibonacciArray: [1, 2, 3, 5, 8]
};

const reducerDescription = {
  [actions.APPEND]: onAppend()
};

export default createReducer(initialState, reducerDescription);
```

If we now do:  
`dispatch({ type: actions.APPEND, target: 'fibonacciArray', payload: 13 });`

Then the state will be:

```js
state = {
  fibonacciArray: [1, 2, 3, 5, 8, 13]
};
```

### Custom selectors

`onAppend` effect receives an optional parameter:

- selector: This function describes how we read the value from the `action`.  
  `(action, state) => any`  
  By default, is:  
  `action => action.payload`
