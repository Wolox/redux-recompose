## completeReducer - Completer

This completer can shrink a reducer description if handlers of these reducers are part of an object.  

Receives an object with `primaryActions` that is a string list of action names, and optionally a `override`.  
For those actions in `primaryActions`, it will add `onLoading`, `onSuccess` and `onFailure` effects for `action.type`, `${action.type}_SUCCESS` and `${action.type}_FAILURE` respectively.  
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
