// TODO: Add support and validations for multi target actions
function onSuccess(selector = action => action.payload) {
  return (state, action) =>
    state.merge({
      [`${action.target}Loading`]: false,
      [`${action.target}`]: selector(action, state),
      [`${action.target}Error`]: null
    });
}

export default onSuccess;
