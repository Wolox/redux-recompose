// Given a defaultState, it populates that state with ${key}Loading and ${key}Error
function completeState(defaultState, ignoredTargets = []) {
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
