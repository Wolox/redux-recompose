import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer as router, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { reducer as form } from 'redux-form';

// TODO Add this if you need it
// import AnalyticsMiddleware from '../services/AnalyticsService';
import { reducer as auth } from './Auth/reducer';

export const history = createHistory();

// Add reducers here
const reducers = combineReducers({ auth, form, router });

const middlewares = [routerMiddleware(history)];
const enhancers = [];

/* ------------- Thunk Middleware ------------- */
middlewares.push(thunk);

// TODO Add this if you need it
/* ------------- Analytics Middleware ------------- */
// middlewares.push(AnalyticsMiddleware);

/* ------------- Assemble Middleware ------------- */
enhancers.push(applyMiddleware(...middlewares));

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = (state, action) =>
  // TODO Add this if you need it
  // if (action.type === authActions.SIGN_OUT) {
  //   return reducers(getGlobalState(state), action);
  // }
  reducers(state, action);

const store = createStore(rootReducer, composeEnhancers(...enhancers));

export default store;
