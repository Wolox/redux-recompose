import { mergeState } from '../../configuration';

// TODO: Add support and validations for multi target actions
function onRetry(selector = action => action.payload.error) {
  return (state, action) => mergeState(state, {
    [`${action.target}IsRetrying`]: true,
    [`${action.target}Loading`]: false,
    [`${action.target}RetryCount`]: state[`${action.target}RetryCount`] + 1,
    [`${action.target}Error`]: selector(action, state),
    [`${action.target}TimeoutID`]: action.payload.timeoutID
  });
}

export default onRetry;
