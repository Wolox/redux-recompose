import mockStore from '../../utils/asyncActionsUtils';
import createTypes from '../../creators/createTypes';
import composeInjections from '../composeInjections';
import baseThunkAction from '../baseThunkAction';

import withStatusHandling from '.';

const MockService = {
  fetchSomething: async () => new Promise(resolve => resolve({ ok: true, data: 42 })),
  fetchFailureNotFound: async () => new Promise(resolve => resolve({ ok: false, problem: 'CLIENT_ERROR', status: 404 })),
  fetchFailureExpiredToken: async () => new Promise(resolve => resolve({ ok: false, problem: 'CLIENT_ERROR', status: 422 }))
};

const actions = createTypes(['FETCH', 'FETCH_SUCCESS', 'FETCH_FAILURE', 'NOT_FOUND', 'EXPIRED_TOKEN'], '@TEST');

const customThunkAction = serviceCall => composeInjections(
  baseThunkAction(actions.FETCH, 'aTarget', serviceCall),
  withStatusHandling({ 404: dispatch => dispatch({ type: actions.NOT_FOUND }) })
);

describe('withStatusHandling', () => {
  it('Handles correctly status codes', async () => {
    const store = mockStore({});
    await store.dispatch(customThunkAction(MockService.fetchSomething));
    await store.dispatch(customThunkAction(MockService.fetchFailureNotFound));
    await store.dispatch(customThunkAction(MockService.fetchFailureExpiredToken));
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.FETCH_SUCCESS, target: 'aTarget', payload: 42 },
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.NOT_FOUND },
      { type: actions.FETCH_FAILURE, target: 'aTarget', payload: 'CLIENT_ERROR' },
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.FETCH_FAILURE, target: 'aTarget', payload: 'CLIENT_ERROR' }
    ]);
  });
});
