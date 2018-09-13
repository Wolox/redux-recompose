import Immutable from 'seamless-immutable';
import { createReducer } from 'redux-recompose';

import { actions } from './actions';

const defaultState = {
  count: 0
};

const reducerDescription = {
  [actions.OTHER_ACTION]: state => state.merge({ count: state.count + 1 })
};

export default createReducer(Immutable(defaultState), reducerDescription);
