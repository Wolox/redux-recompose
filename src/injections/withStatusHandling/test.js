import mockStore from '../../utils/asyncActionsUtils';
import createTypes from '../../creators/createTypes';

import withStatusHandling from '.';

const MockService = {
  fetchSomething: async () => new Promise(resolve => resolve({ ok: true, data: 42 })),
  fetchFailureNotFound: async () => new Promise(resolve => resolve({ ok: false, problem: 'CLIENT_ERROR', status: 404 })),
  fetchFailureExpiredToken: async () => new Promise(resolve => resolve({ ok: false, problem: 'CLIENT_ERROR', status: 422 }))
};

const actions = createTypes(
  ['FETCH', 'FETCH_SUCCESS', 'FETCH_FAILURE', 'NOT_FOUND', 'EXPIRED_TOKEN'],
  '@TEST'
);

const customThunkAction = serviceCall => ({
  type: actions.FETCH,
  target: 'aTarget',
  service: serviceCall,
  injections: [withStatusHandling({ 404: dispatch => dispatch({ type: actions.NOT_FOUND }) })]
});

describe('withStatusHandling', () => {
  it('Handles correctly status codes', async () => {
    const store = mockStore({});
    await store.dispatch(customThunkAction(MockService.fetchFailureNotFound));
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.NOT_FOUND },
      { type: actions.FETCH_FAILURE, target: 'aTarget', payload: 'CLIENT_ERROR' }
    ]);
  });
  it('If not encounters a status code handler, it dispatches FAILURE', async () => {
    const store = mockStore({});
    await store.dispatch(customThunkAction(MockService.fetchFailureExpiredToken));
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.FETCH_FAILURE, target: 'aTarget', payload: 'CLIENT_ERROR' }
    ]);
  });

  it('Does not dispatch a FAILURE if a handler returns false', async () => {
    const store = mockStore({});
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchFailureExpiredToken,
      injections: [withStatusHandling({ 422: () => false })]
    });
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([{ type: actions.FETCH, target: 'aTarget' }]);
  });
});
