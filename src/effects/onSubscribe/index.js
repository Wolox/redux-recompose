import { mergeState } from '../../configuration';

// TODO: Add validations for multitargeted actions
function onSubscribe(selector = action => action.payload) {
  return (state, action) => mergeState(state, { [action.target]: true, ...selector(action) });
}

export default onSubscribe;
