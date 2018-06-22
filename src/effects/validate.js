import { mergeState } from '../configuration';

// Common validator for single target effects
// Effects using this validator should be wrapped into an object with the shape:
// {
//   realTarget: the target being modified. Notice that it may be different of action.target,
//   do: the effect itself
// }
function validateEffect(effect) {
  return (state, action) => {
    if (!action.target) {
      console.warn(`There is no target specified for ${effect.name}.`);
    }
    if (state[effect.realTarget(action)] === undefined) {
      // TODO: RESTORE THIS WARNING
      // console.warn(`Missing field declaration for ${effect.realTarget(action)}.`);
    }
    return mergeState(state, { [effect.realTarget(action)]: effect.do(action, state) });
  };
}

export default validateEffect;
