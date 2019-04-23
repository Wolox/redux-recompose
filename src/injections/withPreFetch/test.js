import mockStore from '../../utils/asyncActionsUtils';
import createTypes from '../../creators/createTypes';

import withPreFetch from '.';

const MockService = {
  fetchSomething: async () => new Promise(resolve => resolve({ ok: true, data: 42 })),
  fetchFailureNotFound: async () => new Promise(resolve => resolve({ ok: false, problem: 'CLIENT_ERROR', status: 404 }))
};

const actions = createTypes(['FETCH', 'FETCH_SUCCESS', 'FETCH_FAILURE', 'FETCH_LOADING'], '@TEST');

describe('withPreFetch', () => {
  it('Handles correctly the prefetch behavior', async () => {
    const store = mockStore({});
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchSomething,
      injections: withPreFetch(dispatch => dispatch({ type: actions.FETCH_LOADING }))
    });
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH_LOADING },
      { type: actions.FETCH_SUCCESS, target: 'aTarget', payload: 42 }
    ]);
  });
});
