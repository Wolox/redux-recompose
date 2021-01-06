import * as yup from 'yup';

const schema = yup.object().required('reducerDescription is required').typeError('reducerDescription should be an object');

function createReducer(initialState, reducerDescription) {
  schema.validateSync(reducerDescription);

  return (state = initialState, action) => {
    if (!action.type) {
      console.warn(`Handling an action without type: ${JSON.stringify(action)}`);
    }
    const handler = reducerDescription[action.type];
    if (!handler) {
      console.warn(`No handler configured for action with type: ${JSON.stringify(action)}`);
    }
    return (handler && handler(state, action)) || state;
  };
}

export default createReducer;
