## withPostSuccess

The `withPostSuccess` injector allows to inject behaviour after the service call is successful and the `onSuccess` effect is executed. This means that the `${action.target}Loading` and `action.payload` will be set in `${action.target}` by the time `withPostSuccess` is called. This is particularly useful when needing to change or add other properties to the store besides `${action.target}`. 

Example:

```js
  import { withPostSuccess } from 'redux-recompose';

  const actionCreators = {
    someAction: data => ({
      type: actionType,
      target: someTarget,
      service: someService,
      payload: data,
      injections: [
        withPostSuccess((dispatch, response, getState) => {
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

