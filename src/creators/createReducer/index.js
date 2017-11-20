function createReducer(initialState, descriptor) {
  return (state = initialState, action) => {
    const handler = descriptor[action.type];
    if (!handler && !action.type) console.warn('Handling an action without type');
    return (handler && handler(state, action)) || state;
  };
}

export default createReducer;
