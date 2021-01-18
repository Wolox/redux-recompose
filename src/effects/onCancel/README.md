## onCancel - Effect

This effect is cancels the polling flow.

This effect is a multi-target effect - It modifies more than one target at the same time.

It will:

- Set `${action.target}IsRetrying` as `false`
- Set `${action.target}Loading` as `false`
- Set `${action.target}RetryCount` as `0`
- Set `${action.target}Error` as `null`
- Set `${action.target}TimeoutID` as `null`

Example:

```js
const selector =
  (action, state) => action.payload.customError || state.defaultError;

const reducerDescription = {
  'CANCEL': onCancel(),
  'CANCEL_CUSTOM': onCancel(selector)
};
```

### Custom selectors

`onRetry` effect receives an optional parameter:

- selector: This function describes how we read the data from the `action`.  
  `(action, state) => any`  
  By default, is:  
  `action => action.payload`
