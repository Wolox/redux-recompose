import { mergeState } from '../../configuration';

function onCancel(selector = action => action.payload) {
  return (state, action) => {
    clearTimeout(selector(action, state));
    return mergeState(state, {
      [`${action.target}IsRetrying`]: false,
      [`${action.target}Loading`]: false,
      [`${action.target}RetryCount`]: 0,
      [`${action.target}Error`]: null,
      [`${action.target}TimeoutID`]: null
    });
  };
}

export default onCancel;
