import mockStore from '../../utils/asyncActionsUtils';
import createTypes from '../../creators/createTypes';

const MockService = {
  fetchSomething: () => new Promise(resolve => resolve({ ok: true, data: 30 })),
  fetchSomethingForSelector: () => new Promise(resolve => resolve({ ok: true, newData: 40 })),
  fetchFailure: () => new Promise(resolve => resolve({ ok: false, problem: 'CLIENT_ERROR' })),
  fetchFailureForSelector: () => new Promise(resolve => resolve({ ok: false, error: 'NEW_CLIENT_ERROR' }))
};

const actions = createTypes(['FETCH', 'FETCH_SUCCESS', 'FETCH_FAILURE', 'OTHER_FETCH'], '@TEST');

describe('baseThunkAction', () => {
  it('Uses the default success selector if not specified via parameters', async () => {
    const store = mockStore({});
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchSomething
    });
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.FETCH_SUCCESS, target: 'aTarget', payload: 30 }
    ]);
  });
  it('Uses success selector specified via parameters', async () => {
    const store = mockStore({});
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchSomethingForSelector,
      successSelector: response => response.newData
    });
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.FETCH_SUCCESS, target: 'aTarget', payload: 40 }
    ]);
  });

  it('Uses the default failure selector if not specified via parameters', async () => {
    const store = mockStore({});
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchFailure
    });
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.FETCH_FAILURE, target: 'aTarget', payload: 'CLIENT_ERROR' }
    ]);
  });
  it('Uses success selector specified via parameters', async () => {
    const store = mockStore({});
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchFailureForSelector,
      failureSelector: response => response.error
    });
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.FETCH_FAILURE, target: 'aTarget', payload: 'NEW_CLIENT_ERROR' }
    ]);
  });
});
