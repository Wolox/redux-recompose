## completeReducer - Completer

This completer can extend a reducer, helping to reduce its code size.
It receives an object with different string arrays depending on how you want the resulting reducer to handle each action:

* `primaryActions`: Handles the `SUCEESS` and `FAILURE` actions with the `onSuccess` and `onFailure` effects.
* `modalActions`: Handles the `_OPEN` and `_CLOSE` actions with the `onSuscribe` and `onUnsubscribe` effects.
* `pollingActions`: Handles the `_RETRY`, `SUCEESS` and `FAILURE` actions with the `onRetry`. `onSuccess` and `onFailure` effects.
* `override`: Overrides any effect this reducer has added. You can use a usual reducer here.

Example:  
```js
const actions = createTypes(completeTypes({
  primaryActions: ['PRIMARY_ACTION'],
  pollingActions: ['POLLING_ACTION'],
  modalActions: ['MODAL_ACTION'],
  ignoredActions: ['IGNORED_ACTION'],
  customCompleters: [{actions: ['CUSTOM_COMPLETED_ACTION'], completer: action => `${action}_COMPLETED`}]
}), '@@API');
const reducerDescription = {
  primaryActions: [actions.PRIMARY_ACTION],
  pollingActions: [actions.POLLING_ACTION],
  modalActions: [actions.MODAL_ACTION],
  override: {
    [actions.IGNORED_ACTION]: (state, action) => ({ ...state, someTarget: action.payload }), // custom reducer for IGNORED_ACTION
    [actions.CUSTOM_COMPLETED_ACTION_COMPLETED]: (state, action) => ({ ...state, someOtherTarget: action.payload }), // custom reducer for CUSTOM_COMPLETED_ACTION_COMPLETED
    [actions.PRIMARY_ACTION_FAILURE]: (state, action) => ({ ...state, someOtherTarget: action.payload }), // override the completed PRIMARY_ACTION_FAILURE reducer
  }
}

const completedReducer = completeReducer(reducerDescription);
/*
{
  [actions.PRIMARY_ACTION]: onLoading(),
  [actions.PRIMARY_ACTION_SUCCESS]: onSuccess(),
  [actions.FETCH_FAILURE_FAILURE]: onFailure(),
  [actions.MODAL_ACTION_OPEN]: onSuscribe(),
  [actions.MODAL_ACTION_CLOSE]: onUnsubscribes(),
  [actions.PRIMARY_ACTION]: onLoading(),
  [actions.PRIMARY_ACTION_SUCCESS]: onSuccess(),
  [actions.FETCH_FAILURE_FAILURE]: onFailure(),
  [actions.FETCH_FAILURE_RETRY]: onRetry(),
  [actions.IGNORED_ACTION]: (state, action) => ({ ...state, someTarget: action.payload }), // custom reducer for IGNORED_ACTION
  [actions.CUSTOM_COMPLETED_ACTION_COMPLETED]: (state, action) => ({ ...state, someOtherTarget: action.payload }), // custom reducer for CUSTOM_COMPLETED_ACTION_COMPLETED
  [actions.PRIMARY_ACTION_FAILURE]: (state, action) => ({ ...state, someOtherTarget: action.payload }), // override the completed PRIMARY_ACTION_FAILURE reducer
  }
*/

const reducer = createReducer(initialState, completedReducer);
```  
