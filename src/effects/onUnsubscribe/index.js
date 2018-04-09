// TODO: Add validations for multitargeted actions
function onUnsubscribe(selector = action => action.payload) {
  return (state, action) => state.merge({ [action.target]: false, ...selector(action) });
}

export default onUnsubscribe;
