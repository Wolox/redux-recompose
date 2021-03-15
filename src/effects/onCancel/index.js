import { mergeState } from '../../configuration';

function onCancel() {
  return (state, action) => {
    const timeoutIDKey = `${action.target}TimeoutID`;
    clearTimeout(state[timeoutIDKey]);
    return mergeState(state, {
      [`${action.target}IsRetrying`]: false,
      [`${action.target}Loading`]: false,
      [`${action.target}RetryCount`]: 0,
      [`${action.target}Error`]: null,
      [timeoutIDKey]: null
    });
  };
}

export default onCancel;
