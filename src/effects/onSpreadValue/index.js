import { mergeState } from '../../configuration';

function onSpreadValue(selector = action => action.payload) {
  return (state, action) => mergeState({ ...selector(action) });
}

export default onSpreadValue;
