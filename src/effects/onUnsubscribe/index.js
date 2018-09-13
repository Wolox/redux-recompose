import { mergeState } from '../../configuration';

// TODO: Add validations for multitargeted actions
function onUnsubscribe(selector = action => action.payload) {
  return (state, action) => mergeState(state, { [action.target]: false, ...selector(action) });
}

export default onUnsubscribe;
