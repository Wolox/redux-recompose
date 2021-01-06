import mockStore from '../../utils/asyncActionsUtils';
import createTypes from '../../creators/createTypes';

import withPostFetch from '.';

const MockService = {
  fetchSomething: async () => new Promise(resolve => resolve({ ok: true, data: 42, ultraSecretData: 'rho' })),
  fetchFailureNotFound: async () => new Promise(resolve => resolve({ ok: false, problem: 'CLIENT_ERROR', status: 404 }))
};

const actions = createTypes(['FETCH', 'FETCH_SUCCESS', 'FETCH_FAILURE', 'FETCH_LOADING'], '@TEST');

describe('withPostFetch', () => {
  it('Handles correctly the post fetch behavior', async () => {
    const store = mockStore({});
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchSomething,
      injections: [
        withPostFetch((dispatch, response) => dispatch({ type: actions.FETCH_LOADING, payload: response.ultraSecretData }))
      ]
    });
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.FETCH_LOADING, payload: 'rho' },
      { type: actions.FETCH_SUCCESS, target: 'aTarget', payload: 42 }
    ]);
  });
});
