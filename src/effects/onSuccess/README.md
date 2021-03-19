## onSuccess - Effect

This effect is used when describing the `SUCCESS` case of the `SUCCESS-FAILURE` pattern.

This effect is a multi-target effect - It modifies more than one target at the same time.

It will:  
  * Put `${action.target}Loading` in `false`  
  * Put `${action.target}Error` in `null`  
  * Fill `${action.target}` with your `action.payload` by default, or use a selector provided  
  * Put `${action.target}IsRetrying` in `false` if `action.isPolling` is truthy
  * Put `${action.target}CountRetry` in `0` if `action.isPolling` is truthy

Example:  
  ```js
  const selector =
    (action, state) => action.payload || state[action.target];  

  const reducerDescription = {  
    'SUCCESS': onSuccess(),  
    'SUCCESS_CUSTOM': onSuccess(selector)  
  };  
  ```  

### Custom selectors
`onSuccess` effect receives an optional parameter:  
  * selector: This function describes how we read the data from the `action`.  
  `(action, state) => any`  
  By default, is:  
  `action => action.payload`  
