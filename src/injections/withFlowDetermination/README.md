## withFlowDetermination

The `withFlowDetermination` injector allows to have complete control of the `success-failure` pattern. The `withFlowDetermination` function receives the `response` from the service call as parameter and must return `true` if the call response has the conditions to be `successful` or `false` if the conditions make the service call a `failure`.  
If `withFlowDetermination` returns `true` the `withSuccess` and `withPostSuccess` injectors will be executed, if defined.  
If `withFlowDetermination` returns `false` the `withFailure` and `withPostFailure` injectors will be executed, if defined.  


Example:

```js
  import { withFlowDetermination } from 'redux-recompose';

  const actionCreators = {
    someAction: data => ({
      type: actionType,
      target: someTarget,
      service: someService,
      payload: data,
      injections: [
        withFlowDetermination(response => response.ok) // this is the default
      ]
    })
  };
```
