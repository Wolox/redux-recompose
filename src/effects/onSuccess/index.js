import { mergeState } from '../../configuration';

// TODO: Add support and validations for multi target actions
function onSuccess(selector = action => action.payload) {
  return (state, action) => {
    const newValues = {
      [`${action.target}Loading`]: false,
      [`${action.target}`]: selector(action, state),
      [`${action.target}Error`]: null
    };
    if (action.isPolling) {
      newValues[`${action.target}IsRetrying`] = false;
    }

    return mergeState(state, newValues);
  };
}

export default onSuccess;
