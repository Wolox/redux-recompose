## onRetry - Effect

This effect is used when the `shouldRetry` function of a polling action returns a truthy value. It sets up the state with the info related to the next try.

This effect is a multi-target effect - It modifies more than one target at the same time.

It will:

- Set `${action.target}IsRetrying` as `true`
- Set `${action.target}Loading` as `false`
- Increment `${action.target}RetryCount` by 1
- Set `${action.target}Error` as `action.payload.error` by default.
- Set `${action.target}` as `action.payload.interval`

Example:

```js
const selector =
  (action, state) => action.payload.customError || state.defaultError;

const reducerDescription = {
  'SUCCESS': onSuccess(),
  'SUCCESS_CUSTOM': onSuccess(selector)
};
```

### Custom selectors

`onRetry` effect receives an optional parameter:

- selector: This function describes how we read the data from the `action`.  
  `(action, state) => any`  
  By default, is:  
  `action => action.payload.error`
