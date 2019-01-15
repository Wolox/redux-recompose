## withPreFetch

The `withPreFetch` injector allows to inject behaviour before the service call. This injector is not thought for normalizing/denormalizing data. If this is the intention, 
use you normalizing/denormalizing function on the `service` property as shown below:

Example:

```
  import { withPreFetch } from 'redux-recompose';

  const actionCreators = {
    someAction: data => ({
      type: actionType,
      target: someTarget,
      service: denormalize(someService),
      payload: data,
      injections: [
        withPreFetch((dispatch, response) => {

          });
        })
      ]
    })
  };
```
