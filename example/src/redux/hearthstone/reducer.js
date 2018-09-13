import Immutable from 'seamless-immutable';
import PropTypes from 'prop-types';
import { createReducer, completeReducer, completeState } from 'redux-recompose';

import { actions } from './actions';

const defaultState = completeState(
  {
    cards: [],
    count: 0
  },
  ['count']
);

const reducerDescription = completeReducer({
  primaryActions: [actions.GET_CARDS],
  override: {
    [actions.OTHER_ACTION]: state => state.merge({ count: state.count + 1 })
  }
});

export const propTypes = {
  id: PropTypes.number
};

export default createReducer(Immutable(defaultState), reducerDescription);
