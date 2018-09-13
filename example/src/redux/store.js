import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { fetchMiddleware } from 'redux-recompose';
import thunk from 'redux-thunk';

import hearthstone from './hearthstone/reducer';

const reducers = combineReducers({
  hearthstone
});

const middlewares = [thunk, fetchMiddleware];
const enhancers = [applyMiddleware(...middlewares)];

const store = createStore(reducers, compose(...enhancers));

export default store;
