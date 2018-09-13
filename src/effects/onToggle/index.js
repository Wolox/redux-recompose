import { mergeState } from '../../configuration';

// TODO: Add support and validations for multi target actions
function onToggle(selector = action => action.payload) {
  return (state, action) =>
    mergeState(state, {
      [action.target]: selector(action, state) || !state[action.target]
    });
}

export default onToggle;
