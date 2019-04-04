## onDelete - Effect

This effect allow us to delete items from arrays without mutations involved.  
These deletions are managed via `action.payload` by default.

Example:

We have this state:
```js
const initialState = {
  objectList: [{ id: 1 }, { id: 2 }, { id: 3 }]
};
```

And we want to delete objects _by id_. Then, we'd like to write:

```js
dispatch({ type: actions.DELETE_ITEM, payload: 2 });
```

if we would like to delete the item with `{ id: 2 }`, leading to:

`objectList: [{ id: 1 }, { id: 3 }]`

To achieve that, we write this as a _reducer_:
```js
const reducerDescription = {
  [actions.DELETE_ITEM]: onDelete()
};

export default createReducer(initialState, reducerDescription);
```


### Custom selectors  

`onDelete` effect actually takes three parameters that are optional:  

  * leftSelector: How we are going to read the `action` for deletions; the identifier that we want to delete.  
    `(action, item) => any`  
    By default is  
    `action => action.payload`  
  * rightSelector: How we are going to read each one of the list items.  
    `(item, action) => any`  
    By default is  
    `item => item.id`  
  * filter: Actually, it is a comparison between the results of `leftSelector` and `rightSelector` calls.
    `(item, action) => bool`  
    By default is:  
    `(item, action) => action.payload !== item.id`  
