## withSuccess

The `withSuccess` injector overrides the behaviour of the [`onSuccess` effect](../../effects/onSuccess/docs.md) which means that the default success action will not be dispatched, nor the store will be affected unless you explicitly do it in the `withSuccess` injector.
Please, do keep this in mind for completed actions and reducers, since the `loading` property of your `target` will not be automatically set to `false`

Example:

```
  import { withSuccess } from 'redux-recompose';

  const actionCreators = {
    someAction: data => ({
      type: actionType,
      target: someTarget,
      service: someService,
      payload: data,
      injections: [
        withSuccess((dispatch, response) => {
          /* insert here whatever logic
          * you want to override the onSuccess
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

Remember that this injector may only be used for overriding `onSuccess`, if you wish to inject some logic after a successful service call (and the default `onSuccess` behaviour that comes with it), use `onPostSuccess` injector.
