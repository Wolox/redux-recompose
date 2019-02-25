## completeReducer - Completer

This completer can shrink a reducer description if handlers of these reducers are part of an object.  

Receives an object that describes how you want the reducer to look like for each action.
For those actions in `primaryActions`, it will add `onLoading`, `onSuccess` and `onFailure` effects for `action.type`, `${action.type}_SUCCESS` and `${action.type}_FAILURE` respectively.  
For those actions in `pollingActions`, it will add `onLoading`, `onSuccess`, `onFailure` and `onRetry` effects for `action.type`, `${action.type}_SUCCESS`, `${action.type}_FAILURE` and `${action.type}_RETRY` respectively.
You can use `override` to set a custom reducer for a specific action type.

Example:  
```
const actions = createTypes(['FETCH', 'FETCH_SUCCESS', 'FETCH_FAILURE', 'OTHER'], '@@API');
const reducerDescription = {
  primaryActions: [actions.FETCH],
  override: {
    [actions.OTHER]: (state, action) => ({ ...state, count: action.payload })
  }
}

const reducer = createReducer(completeReducer(reducerDescription));
```

reducer handlers will be equivalent to:  
```
  {
    [actions.FETCH]: onLoading(),
    [actions.FETCH_SUCCESS]: onSuccess(),
    [actions.FETCH_FAILURE]: onFailure(),
    [actions.OTHER]: (state, action) => ({ ...state, count: action.payload })
  }
```  
And the reducer created will behave like:  
```
const reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH:
      return { ...state, [`${action.target}Loading`]: true };
    case actions.FETCH_SUCCESS:
      return {
        ...state,
        [`${action.target}Loading`]: false,
        [`${action.target}Error`]: null,
        [`${action.target}`]: action.payload,
      };
    case actions.FETCH_FAILURE:
      return {
        ...state,
        [`${action.target}Loading`]: false,
        [`${action.target}Error`]: action.payload
      };
    case actions.OTHER:
      return { ...state, count: action.payload };
    default:
      return state;
  }
}
```

This way, we avoid writing `SUCCESS` and `FAILURE` effects every time.  


Here´s an example using `pollingActions`:

```js
  const reducerDescription = {
    pollingActions: [actions.POLLING_FETCH]
  }

  const reducerHandler = completeReducer(reducerDescription);
  /*
    {
      [actions.POLLING_FETCH]: onLoading(),
      [actions.POLLING_FETCH_SUCCESS]: onSuccess(),
      [actions.POLLING_FETCH_FAILURE]: onFailure(),
      [actions.POLLING_FETCH_RETRY]: onRetry()
    }
  */

  //Now, we create the actual reducer using createReducer
  const reducer = createReducer(reducerHandler);
```
