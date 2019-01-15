## withPreFetch

The `withPreFetch` injector allows to inject behaviour before the service call. This injector is not thought for normalizing/denormalizing data. If this is the intention, 
use you normalizing/denormalizing function on the `payload` property as shown below:

Example:

```
  import { withPreFetch } from 'redux-recompose';

  const actionCreators = {
    someAction: data => ({
      type: actionType,
      target: someTarget,
      service: someService,
      payload: denormalize(data),
      injections: [
        withPreFetch((dispatch) => {
            /* you can dispatch other actions before the service call */
          });
        })
      ]
    })
  };
```
