import mockStore from '../../utils/asyncActionsUtils';
import createTypes from '../../creators/createTypes';

import withFlowDetermination from '.';

const MockService = {
  fetchSomething: async () => new Promise(resolve => resolve({ ok: true, data: 42 })),
  fetchFailureNotFound: async () => new Promise(resolve =>
    resolve({
      ok: false,
      problem: 'CLIENT_ERROR',
      status: 404,
      data: 39
    }))
};

const actions = createTypes(['FETCH', 'FETCH_SUCCESS', 'FETCH_FAILURE', 'OTHER_ACTION'], '@TEST');

describe('withFlowDetermination', () => {
  it('Handles correctly the flow determination', async () => {
    const store = mockStore({});
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchSomething,
      injections: withFlowDetermination(response => response.ok)
    });

    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchFailureNotFound,
      injections: [withFlowDetermination(response => response.ok)]
    });

    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchFailureNotFound,
      injections: withFlowDetermination(response => response.status === 404)
    });

    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.FETCH_SUCCESS, target: 'aTarget', payload: 42 },
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.FETCH_FAILURE, target: 'aTarget', payload: 'CLIENT_ERROR' },
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.FETCH_SUCCESS, target: 'aTarget', payload: 39 }
    ]);
  });
});
