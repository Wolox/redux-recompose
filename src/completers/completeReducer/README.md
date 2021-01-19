## completeReducer - Completer

This completer can extend a reducer, helping to reduce its code size.
It receives an object with different string arrays depending on how you want the resulting reducer to handle each action:

* `primaryActions`: Handles the `_SUCEESS` and `_FAILURE` actions with the `onSuccess` and `onFailure` effects.
* `modalActions`: Handles the `_OPEN` and `_CLOSE` actions with the `onSuscribe` and `onUnsubscribe` effects.
* `pollingActions`: Handles the `_RETRY`, `_CANCEL`, `_SUCEESS` and `_FAILURE` actions with the `onRetry`, `onCancel`, `onSuccess` and `onFailure` effects.
* `override`: Overrides any effect this reducer has added. You can use a usual reducer here.

Example:  
```js
const actions = createTypes(completeTypes({
  primaryActions: ['PRIMARY_ACTION'],
  pollingActions: ['POLLING_ACTION'],
  modalActions: ['MODAL_ACTION'],
  ignoredActions: ['IGNORED_ACTION'],
  customCompleters: [{actions: ['CUSTOM_ACTION'], completer: action => `${action}_COMPLETED`}]
}), '@@NAMESPACE');
const reducerDescription = {
  primaryActions: [actions.PRIMARY_ACTION],
  pollingActions: [actions.POLLING_ACTION],
  modalActions: [actions.MODAL_ACTION],
  override: {
    [actions.IGNORED_ACTION]: (state, action) => ({ ...state, someTarget: action.payload }),
    [actions.CUSTOM_ACTION_COMPLETED]: (state, action) => ({ ...state, someOtherTarget: action.payload }),
    [actions.PRIMARY_ACTION_FAILURE]: (state, action) => ({ ...state, someOtherTarget: action.payload }), // overrides the default onFailure() of PRIMARY_ACTION_FAILURE
  }
}

const completedReducer = completeReducer(reducerDescription);
/*
{
  [actions.PRIMARY_ACTION]: onLoading(),
  [actions.PRIMARY_ACTION_SUCCESS]: onSuccess(),
  [actions.PRIMARY_ACTION_FAILURE]: onFailure(), //this is overwritten afterwards
  [actions.MODAL_ACTION_OPEN]: onSuscribe(),
  [actions.MODAL_ACTION_CLOSE]: onUnsubscribes(),
  [actions.POLLING_ACTION]: onLoading(),
  [actions.POLLING_ACTION_SUCCESS]: onSuccess(),
  [actions.POLLING_ACTION_FAILURE]: onFailure(),
  [actions.POLLING_ACTION_RETRY]: onRetry(),
  [actions.POLLING_ACTION_CANCEL]: onCancel(),
  [actions.IGNORED_ACTION]: (state, action) => ({ ...state, someTarget: action.payload }),
  [actions.CUSTOM_ACTION_COMPLETED]: (state, action) => ({ ...state, someOtherTarget: action.payload }),
  [actions.PRIMARY_ACTION_FAILURE]: (state, action) => ({ ...state, someOtherTarget: action.payload })
  }
*/

const reducer = createReducer(initialState, completedReducer);
```  
