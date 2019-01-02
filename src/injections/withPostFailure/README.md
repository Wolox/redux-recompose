## withPostFailure

The `withPostFailure` injector allows to inject behaviour after the service call fails and the `onFailure` effect is executed. This means that the `${action.target}Loading` and `${action.target}Error` are set before `withPostFailure` is called.

Example:

```
  import { withPostFailure } from 'redux-recompose';

  const actionCreators = {
    someAction: data => ({
      type: actionType,
      target: someTarget,
      service: someService,
      payload: data,
      injections: [
        withPostFailure((dispatch, response, state) => {
          /* insert here whatever logic
           * you want to execute after a failed service call.
           * This is particularly userful to dispatch side efects for errored service calls.
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

