// Given a defaultState, it populates that state with ${key}Loading and ${key}Error
function completeState(defaultState, ignoredTargets = []) {
  if (!defaultState || defaultState.constructor !== Object) {
    throw new Error('Expected an object as a state to complete.');
  }
  if (
    !ignoredTargets ||
    ignoredTargets.constructor !== Array ||
    ignoredTargets.some(actionName => !actionName || typeof actionName !== 'string')
  ) {
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
