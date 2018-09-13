import { createTypes } from 'redux-recompose';

export const actions = createTypes(['OTHER_ACTION'], '@@HEARTHSTONE');

// No API calls ?
const actionCreators = {
  otherAction: () => ({ type: actions.OTHER_ACTION })
};

export default actionCreators;
