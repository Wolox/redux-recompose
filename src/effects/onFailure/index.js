import { mergeState } from '../../configuration';

// TODO: Add support and validations for multi target actions
function onFailure(selector = action => action.payload) {
  return (state, action) => {
    const newValues = {
      [`${action.target}Error`]: selector(action, state),
      [`${action.target}Loading`]: false
    };
    if (action.isPolling) {
      newValues[`${action.target}IsRetrying`] = false;
      newValues[`${action.target}RetryCount`] = 0;
    }

    return mergeState(state, newValues);
  };
}

export default onFailure;
