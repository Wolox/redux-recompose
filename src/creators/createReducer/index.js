function createReducer(initialState, descriptor) {
  if (!descriptor || descriptor.constructor !== Object) {
    throw new Error('Expected a reducer description as an object.');
  }

  return (state = initialState, action) => {
    const handler = descriptor[action.type];
    if (!handler && !action.type) console.warn('Handling an action without type');
    return (handler && handler(state, action)) || state;
  };
}

export default createReducer;
