## onFailure - Effect

This effect is used when describing the `FAILURE` case of the `SUCCESS-FAILURE` pattern.

This effect is a multi-target effect - It modifies more than one target at the same time.

It will:  
  * Put `${action.target}Loading` in `false`  
  * Put `${action.target}Error` with your `action.payload` by default.  
  * Put `${action.target}IsRetrying` in `false` if `action.isPolling` is truthy

Example:
```js
const reducerDescription = {
  [actions.ON_FETCH_FAILURE]: onFailure()
}
```

### Custom selectors  
`onFailure` effect receives an optional parameter:  
  * selector: This function describes how we read the error from the `action`.  
  `(action, state) => any`  
  By default, is:  
  `action => action.payload`  
