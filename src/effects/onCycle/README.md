## onCycle - Effect

This effect allows to cycle an array as many positions as we indicate, in both directions.

Example:

```js
const initialState = {
  letterArray: ['A','B','C','D','E','F','G','H']
};

const reducerDescription = {
  [actions.CYCLE]: onCycle()
};

export default createReducer(initialState, reducerDescription);
```

If we now do:  
`dispatch({ type: actions.CYCLE, target: 'letterArray', step: 2 });`

Then the state will be:

```js
state = {
  letterArray: ['C','D','E','F','G','H','A','B']
};
```
Example 2:

```js
const initialState = {
  letterArray: ['A','B','C','D','E','F','G','H']
};

const reducerDescription = {
  [actions.CYCLE]: onCycle()
};

export default createReducer(initialState, reducerDescription);
```

If we now do:  
`dispatch({ type: actions.CYCLE, target: 'letterArray', step: -2 });`

Then the state will be:

```js
state = {
  letterArray: ['G','H','A','B','C','D','E','F']
};
```
