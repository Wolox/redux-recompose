import { isStringArray, isValidObject } from '../../utils/typeUtils';

function completeState(defaultState, ignoredTargets = [], pollingTargets = []) {
  if (!isValidObject(defaultState)) {
    throw new Error('Expected an object as a state to complete');
  }
  if (!isStringArray(ignoredTargets)) {
    throw new Error('Expected an array of strings as ignored targets');
  }
  if (!isStringArray(pollingTargets)) {
    throw new Error('Expected an array of strings as polling targets');
  }

  const completedState = { ...defaultState };
  Object.keys(defaultState)
    .filter(key => ignoredTargets.indexOf(key) === -1)
    .forEach(key => {
      completedState[`${key}Loading`] = false;
      completedState[`${key}Error`] = null;
    });

  pollingTargets.forEach(key => {
    completedState[`${key}IsRetrying`] = false;
    completedState[`${key}Count`] = 0;
    completedState[`${key}TimeoutID`] = null;
  });

  return completedState;
}

export default completeState;
