## withStatusHandling

The `withStatusHandling` injector allows to describe some behavior based on the response status code.
`withStatusHandling` recieves an object whose property names are the different http status codes (404, 200, etc) and that define the logic to execute for the desired status code.

Example:

```
  import { withStatusHandling } from 'redux-recompose';

  const actionCreators = {
    someAction: data => ({
      type: actionType,
      target: someTarget,
      service: someService,
      payload: data,
      injections: [
        withStatusHandling({
          [`${statusCode}`]: dispatch => {
            /* dispatch some action */
          }
        })
      ]
    })
  };
```

