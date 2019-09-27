## withStatusHandling

The `withStatusHandling` injector allows to describe some behavior based on the response status code.
`withStatusHandling` receives an object whose property names are the different http status codes (404, 500, etc) and that define the logic to execute for the desired status code. If you want to execute `onFailure` and `withPostFailure` the handler function should return `true`, in the other case it should return `false`.

Example:

```js
  import { withStatusHandling } from 'redux-recompose';
    
  const actionCreators = {
    someAction: data => ({
      type: actionType,
      target: someTarget,
      service: someService,
      payload: data,
      injections: [
        withStatusHandling({
          401: (dispatch, response, getState) => handle401(getState, dispatch, response),
          404: (dispatch, response, getState) => handle404(response, dispatch, getState)
        })
      ]
    })
  };
```

