import { isStringArray, isValidObject } from '../../utils/typeUtils';

// Given a defaultState, it populates that state with ${key}Loading and ${key}Error
function completeState(defaultState, ignoredTargets = []) {
  if (!isValidObject(defaultState)) {
    throw new Error('Expected an object as a state to complete.');
  }
  if (!isStringArray(ignoredTargets)) {
    throw new Error('Expected an array of strings as ignored targets');
  }

  const completedState = { ...defaultState };
  Object.keys(defaultState)
    .filter(key => ignoredTargets.indexOf(key) === -1)
    .forEach(key => {
      completedState[`${key}Loading`] = false;
      completedState[`${key}Error`] = null;
    });
  return completedState;
}

export default completeState;
