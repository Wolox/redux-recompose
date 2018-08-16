function onSpreadValue(selector = action => action.payload) {
  return (state, action) => state.merge({ ...selector(action) });
}

export default onSpreadValue;
