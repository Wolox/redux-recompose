function validateEffect(effect) {
  return (state, action) => {
    if (!action.target) {
      console.warn(`There is no target specified for ${effect.name}.`);
    }
    if (state[effect.realTarget(action)] === undefined) {
      console.warn(`Missing field declaration for ${effect.realTarget(action)}.`);
    }
    return state.merge({ [effect.realTarget(action)]: effect.do(action, state) });
  };
}

export default validateEffect;
