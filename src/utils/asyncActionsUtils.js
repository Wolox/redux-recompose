/* eslint-disable import/no-extraneous-dependencies */
import configureMockStore from 'redux-mock-store';

import fetchMiddleware from '../middlewares/fetch';

export const thunk = ({ dispatch, getState }) => next => action => (
  typeof action === 'function' ?
    action(dispatch, getState) :
    next(action)
);

const middlewares = [fetchMiddleware, thunk];
const mockStore = configureMockStore(middlewares);

export default mockStore;
