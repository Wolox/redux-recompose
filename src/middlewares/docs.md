## fetchMiddleware

This middleware allows us to integrate custom middlewares into
`redux-recompose` actions and reducers.
It works with Redux's `applyMiddleware` nicely, since it is simply passed down as a regular middleware

Usage example:

```
import { fetchMiddleware } from 'redux-recompose';

const store = createStore(
  reducers, applyMiddleware(thunk, fetchMiddleware))
);

```

Then, in your `action.js` the logic for the code you want your middleware to execute can be added like this:

```
const someActions = {
  actionWithMiddleware: () => {
    /* 
     * some code
     * with more logic
     */
    return {
      type: actionType.ACTION_TYPE,
      target: 'some_target',
      service: someServiceFunction
      payload: serviceFunctionPayload,
      successSelector: successFunction
    }
  }
}
```

where:

`type` is the action type dispatched.
`target` is the target string.
`service` is the service function called by the middleware (`get`, `post`, `put`, etc) 
`payload` is the parameter to pass down to the `service`. If more than one argument is required, please use an object in a key/value form. Ex: `payload: {someParam: someParamValue, otherParam: otherParamalue}`
`successSelector` is the function to be executed after a successful service call. This can be used to format the data before a state change.


