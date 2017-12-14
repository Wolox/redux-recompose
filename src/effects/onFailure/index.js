// TODO: Add support and validations for multi target actions
function onFailure(selector = action => action.payload) {
  return (state, action) =>
    state.merge({
      [`${action.target}Error`]: selector(action, state),
      [`${action.target}Loading`]: false
    });
}

export default onFailure;
