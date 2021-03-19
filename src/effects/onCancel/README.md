## onCancel - Effect

This effect cancels the polling flow.

This effect is a multi-target effect - It modifies more than one target at the same time.

It will:

- Set `${action.target}IsRetrying` as `false`
- Set `${action.target}Loading` as `false`
- Set `${action.target}RetryCount` as `0`
- Set `${action.target}Error` as `null`
- Set `${action.target}TimeoutID` as `null`

Example:

```js
const reducerDescription = {
  'CANCEL': onCancel()
};
```
