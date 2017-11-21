function validateEffect(effect) {
  return (state, action) => {
    if (!action.target) {
      console.warn(`There is no target specified for ${effect.name}`);
    }
    return effect.do(state, action);
  };
}

export default validateEffect;
