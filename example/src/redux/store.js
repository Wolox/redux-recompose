import { createStore, applyMiddleware, compose, combineReducers as CR } from 'redux';
import { fetchMiddleware, configureMergeState, wrapCombineReducers } from 'redux-recompose';
import thunk from 'redux-thunk';

import hearthstone from './hearthstone/reducer';

// Breaking in r-r v2.0: need to specify how do we merge (removed coupled seamless-immutable)
configureMergeState((state, diff) => state.merge(diff));

// Use this function to let invisible reducer override behavior when needed
const combineReducers = wrapCombineReducers(CR);

const reducers = combineReducers({
  hearthstone
});

const middlewares = [thunk, fetchMiddleware];
const enhancers = [
  applyMiddleware(...middlewares),
  // Cosmic sarasa for debug
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
];

const store = createStore(reducers, compose(...enhancers));

export default store;
