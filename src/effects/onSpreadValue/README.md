## onSpreadValue - Effect

This effect allows us to read the entries of an object from the `action` and spread them into the state.

Example:

```
const initialState = {
  key1: 10,
  key2: 20,
  key3: 30
};

const reducerDescription = {
  [actions.SPREAD]: onSpreadValue()
};

export default createReducer(initialState, reducerDescription);
```

If we now do:
`dispatch({ type: actions.SPREAD, payload: { key1: 'Hello', key2: 45 } });`

Then the state will be:

```
state = {
  key1: 'Hello',
  key2: 45,
  key3: 20
};
```

### Custom selectors

`onSpreadValue` receives an optional parameter:

- selector: This function describes how we read the object we want to spread from the `action`.
  `(action, state) => Object`
  By default, is:
  `action => action.payload`
