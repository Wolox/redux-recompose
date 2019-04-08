## onDeleteByIndex - Effect  

This effect allow us to delete certain items from arrays according to the index they have.  

These deletions are managed via `action.payload` by default.

Example:

We have this state:
```js
const initialState = {
  objectList: [{ id: 1 }, { id: 2 }, { id: 3 }]
};
```

And we want to delete objects _by index_. Then, we'd like to write:

```js
dispatch({ type: actions.DELETE_ITEM, payload: 2 });
```

if we would like to delete the item with `{ id: 3 }`, leading to:

`objectList: [{ id: 1 }, { id: 2 }]`

To achieve that, we write this as a _reducer_:
```js
const reducerDescription = {
  [actions.DELETE_ITEM]: onDeleteByIndex()
};

export default createReducer(initialState, reducerDescription);
```

### Custom selectors  

`onDeleteByIndex` effect takes an optional parameter:
  * selector: Specifies how we deduce the index from the action and the state.  
  `(action, state) => number`
  By default, is:  
  `action => action.payload`  
