## withPostSuccess

The `withPostSuccess` injector allows to inject behaviour after the service call is successful and the `onSuccess` effect is executed. This means that the `${action.target}Loading` and `action.payload` will be set in `${action.target}` by the time `withPostSuccess` is called. This is particularly useful when changing or adding other properties to the store besides `${action.target}` is needed. 

Example:

```
  import { withPostSuccess } from 'redux-recompose';

  const actionCreators = {
    someAction: data => ({
      type: actionType,
      target: someTarget,
      service: someService,
      payload: data,
      injections: [
        withPostSuccess((dispatch, response, state) => {
          /* insert here whatever logic
           * you want to execute after service call and SUCCCESSFUL pattern.
           * This is particularly userful to dispatch side efects or actions to different targets
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

