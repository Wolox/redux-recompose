## createThunkAction - Creator

This function describes a basic async action that fetches data. It describes the basis of `SUCCESS-FAILURE` pattern.  

As a result, returns a function that could dispatch up to three different actions.  

It receives four parameters:  
* type: the type of the action being dispatched initially.  
* target: the target being modified by each of these actions.  
* serviceCall: it is a function that returns a Promise. It is used on the `fetch` phase.  
* selector: this argument is optional. Receives the entire state and the result of this function will be passed to `serviceCall` as a parameter.  

Example:
```
const asyncAction = createThunkAction(
  actions.FETCH,
  'target',
  Service.GetStuff,
  state => state.stuff.id
);
```

Is conceptually equal to:
```
const asyncAction = async (dispatch, getState) => {
  dispatch({ type: actions.FETCH, target: 'target' });
  const stuffId = getState().stuff.id;
  const response = await Service.GetStuff(stuffId);
  if (response.ok) {
    dispatch({ type: actions.FETCH_SUCCESS, target: 'target', payload: response.data });
  } else {
    dispatch({ type: actions.FETCH_FAILURE, target: 'target', payload: response.problem });
  }
}
```
