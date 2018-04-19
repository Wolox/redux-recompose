// TODO: Add support and validations for multi target actions
function onToggle(selector = action => action.payload) {
  return (state, action) =>
    state.merge({
      [action.target]: selector(action, state) || !state[action.target]
    });
}

export default onToggle;
