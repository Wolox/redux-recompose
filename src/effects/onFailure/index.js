import { mergeState } from '../../configuration';

// TODO: Add support and validations for multi target actions
function onFailure(selector = action => action.payload) {
  return (state, action) => mergeState(state, {
    [`${action.target}Error`]: selector(action, state),
    [`${action.target}Loading`]: false
  });
}

export default onFailure;
