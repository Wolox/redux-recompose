/* eslint-disable import/no-extraneous-dependencies */
import configureMockStore from 'redux-mock-store';

import createThunkAction from '../creators/createThunkAction';

const thunk = ({ dispatch, getState }) => next => action => (
  typeof action === 'function' ?
    action(dispatch, getState) :
    next(action)
);

const fetchMiddleware = ({ dispatch }) => next => action => (
  action.service !== undefined ?
    dispatch(createThunkAction(action.type, action.target, action.service, action.selector)) :
    next(action)
);

const middlewares = [thunk, fetchMiddleware];
const mockStore = configureMockStore(middlewares);

export default mockStore;
