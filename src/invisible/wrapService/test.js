import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import { thunk } from '../../utils/asyncActionsUtils';
import fetchMiddleware from '../../middlewares/fetch';
import wrapCombineReducers from '../wrapCombineReducers';

import wrapService from '.';

const MockService = {
  fetchSomething: async () => new Promise(resolve => resolve({ ok: true, data: 30 })),
  fetchSomethingForSelector: async () => new Promise(resolve => resolve({ ok: true, newData: 40 })),
  fetchFailure: async () => new Promise(resolve => resolve({ ok: false, problem: 'CLIENT_ERROR' })),
  fetchFailureForSelector: async () => new Promise(resolve => resolve({ ok: false, error: 'NEW_CLIENT_ERROR' }))
};

const setUp = {
  store: null
};

const configureStore = invisibleReducer => {
  const reducersObject = {
    foo: (state = { NSLoading: false, fetchSomethingLoading: false }) => state,
    dummy: (state = {}) => state
  };
  const ownCombineReducers = wrapCombineReducers(combineReducers, invisibleReducer);
  return createStore(
    ownCombineReducers(reducersObject),
    compose(applyMiddleware(thunk, fetchMiddleware))
  );
};

beforeEach(() => {
  setUp.store = configureStore();
});

describe('wrapService', () => {
  it('It should transform services as actions', async () => {
    const ServiceActions = wrapService(MockService, 'foo');
    await setUp.store.dispatch(ServiceActions.fetchSomething());
    expect(setUp.store.getState()).toEqual({
      dummy: {},
      foo: {
        NSLoading: false,
        fetchSomething: 30,
        fetchSomethingLoading: false,
        fetchSomethingError: null
      }
    });
  });
});
