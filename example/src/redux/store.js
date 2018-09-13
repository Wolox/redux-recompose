import { createStore, applyMiddleware, compose, combineReducers as CR } from 'redux';
import { fetchMiddleware, configureMergeState, wrapCombineReducers } from 'redux-recompose';
import thunk from 'redux-thunk';

import hearthstone from './hearthstone/reducer';

configureMergeState((state, diff) => state.merge(diff));

const combineReducers = wrapCombineReducers(CR);

const reducers = combineReducers({
  hearthstone
});

const middlewares = [thunk, fetchMiddleware];
const enhancers = [
  applyMiddleware(...middlewares),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
];

const store = createStore(reducers, compose(...enhancers));

export default store;
