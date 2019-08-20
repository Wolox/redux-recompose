## onReplace - Effect

This effect allows modifying an element of an array. Receive a function that tells how to find the element (s) or receives the element's index.
If you pass a function, change all the elements that meet the condition.

Example:

```js
const initialState = {
  letterArray: ['H','I','J','K','L','M','N']
};

const reducerDescription = {
  [actions.REPLACE]: onReplace()
};

export default createReducer(initialState, reducerDescription);
```

If we now do:  
`dispatch({ type: actions.REPLACE, target: 'letterArray', index: 3, payload: 'Z' });`

Then the state will be:

```js
state = {
  letterArray: ['H','I','J','Z','L','M','N']
};
```
Example 2:

```js
const initialState = {
  numberArray: [23, 45, 56, 12, 28, 45, 90, 36, 44, 67]
};

const reducerDescription = {
  [actions.REPLACE]: onReplace()
};

export default createReducer(initialState, reducerDescription);
```

If we now do:  
`dispatch({ type: actions.REPLACE, target: 'numberArray', condition: element => element > 50, payload: 51 });`

Then the state will be:

```js
state = {
  numberArray: [23, 45, 51, 12, 28, 45, 51, 36, 44, 51]
};
```
