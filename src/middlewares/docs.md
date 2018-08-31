## fetchMiddleware

This middleware allows us to integrate custom middlewares into
`redux-recompose` actions and reducers.
It works with Redux's `applyMiddleware` nicely, since it is simply passed down as a regular middleware

Usage example:

```
import { fetchMiddleware } from 'redux-recompose';

const store = createStore(
  reducers, applyMiddleware(thunk, fetchMiddleware))
);

```