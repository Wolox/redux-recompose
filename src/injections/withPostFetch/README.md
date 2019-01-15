## withPostFetch

The `withPostFetch` injector allows to inject behaviour after the service call if finished, regardless of the response  status. This injector doesn't override any of the `success-failure` pattern behavior, Which means that the `${action.target}Loading` and `${action.target}Error` will still be changed accordingly (unless you set a different behaviour using other injectors). This injector is not thought for normalizing/denormalizing data. If this is the intention, [successSelector](../../middlewares/)can be used instead.

Example:

```
  import { withPostFetch } from 'redux-recompose';

  const actionCreators = {
    someAction: data => ({
      type: actionType,
      target: someTarget,
      service: someService,
      payload: data,
      injections: [
        withPostFetch((dispatch, response) => {

          });
        })
      ]
    })
  };
```

