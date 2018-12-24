

## withFailure

The `withFailure` injector overrides the behaviour of the [`onFailure` effect](../../effects/onFailure/) which means that the default failure action will not be dispatched, nor the store will be affected unless you explicitly do it in the `withFailure` injector.
Please, do keep this in mind for completed actions and reducers, since the `loading` and `error` property of your `target` will not be automatically set.

Example:

```
  import { withFailure } from 'redux-recompose';

  const actionCreators = {
    someAction: data => ({
      type: actionType,
      target: someTarget,
      service: someService,
      payload: data,
      injections: [
        withFailure((dispatch, response) => {
          /* insert here whatever logic
          * you want to override the onFailure
          * effect with. You can dispatch actions
          * using the 'dispatch' argument and the 'response'
          * argument is the response from the service call.
          */
          dispatch({
            type: someOtherAction,
            target: someTarget,
            payload: somePayload
          });
        })
      ]
    })
  };
```

Remember that this injector may only be used for overriding `onFailure`, if you wish to inject some logic after a failed service call (and the default `onFailure` behaviour that comes with it), use `withPostFailure` injector.
