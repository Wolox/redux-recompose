import { isValidObject } from '../../utils/typeUtils';

function createReducer(initialState, descriptor) {
  if (!isValidObject(descriptor)) {
    throw new Error('Expected a reducer description as an object.');
  }

  return (state = initialState, action) => {
    const handler = descriptor[action.type];
    if (!handler && !action.type) {
      console.warn(`Handling an action without type: ${JSON.stringify(action)}`);
    }
    return (handler && handler(state, action)) || state;
  };
}

export default createReducer;
