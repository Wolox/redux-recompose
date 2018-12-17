import { mergeState } from '../../configuration';

function onSpreadValue(selector = action => action.payload) {
  return (state, action) => mergeState(state, selector(action, state));
}

export default onSpreadValue;
