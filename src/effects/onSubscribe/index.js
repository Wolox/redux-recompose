// TODO: Add validations for multitargeted actions
function onSubscribe(selector = action => action.payload) {
  return (state, action) => state.merge({ [action.target]: true, ...selector(action) });
}

export default onSubscribe;
