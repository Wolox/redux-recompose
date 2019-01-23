import { mergeState } from '../../configuration';

// TODO: Add support and validations for multi target actions
function onRetry(selector = action => action.payload.error) {
  return (state, action) =>
    mergeState(state, {
      [`${action.target}IsRetrying`]: true,
      [`${action.target}Loading`]: false,
      [`${action.target}Count`]: state[`${action.target}Count`] + 1,
      [`${action.target}Error`]: selector(action, state),
      [`${action.target}TimeoutID`]: action.payload.interval
    });
}

export default onRetry;
