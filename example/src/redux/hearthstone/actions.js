import { createTypes } from 'redux-recompose';

export const actions = createTypes(['OTHER_ACTION'], '@@HEARTHSTONE');

const actionCreators = {
  otherAction: () => ({ type: actions.OTHER_ACTION })
};

export default actionCreators;
