import mockStore from '../../utils/asyncActionsUtils';
import createTypes from '../../creators/createTypes';

let tries = 0;

jest.useFakeTimers();

const MockService = {
  fetchSomething: async () => new Promise(resolve => resolve({ ok: true, data: 30, newData: 40 })),
  fetchFailure: async () => new Promise(resolve => resolve({ ok: false, problem: 'CLIENT_ERROR' })),
  fetchFailureForSelector: async () => new Promise(resolve => resolve({ ok: false, error: 'NEW_CLIENT_ERROR' })),
  fetchFailureForPolling: async () => {
    let promise;
    if (tries === 2) {
      promise = new Promise(resolve => resolve({ ok: true, status: 200, data: 'OK' }));
    } else {
      promise = new Promise(resolve => resolve({ ok: false, status: 500, problem: 'Still loading' }));
    }
    tries += 1;
    return promise;
  }
};

const actions = createTypes(['FETCH', 'FETCH_SUCCESS', 'FETCH_FAILURE', 'OTHER_FETCH'], '@TEST');

describe('pollingAction', () => {
  it('Uses the default success selector if not specified via parameters', async () => {
    const store = mockStore();
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchSomething,
      shouldRetry: () => false
    });
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      {
        type: actions.FETCH_SUCCESS,
        target: 'aTarget',
        payload: 30,
        isPolling: true
      }
    ]);
  });
  it('Uses success selector specified via parameters', async () => {
    const store = mockStore();
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchSomething,
      successSelector: response => response.newData,
      shouldRetry: () => false
    });
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      {
        type: actions.FETCH_SUCCESS,
        target: 'aTarget',
        payload: 40,
        isPolling: true
      }
    ]);
  });
  it('Uses the default failure selector if not specified via parameters', async () => {
    const store = mockStore();
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchFailure,
      shouldRetry: () => false
    });
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      {
        type: actions.FETCH_FAILURE,
        target: 'aTarget',
        payload: 'CLIENT_ERROR',
        isPolling: true
      }
    ]);
  });
  it('Uses failure selector specified via parameters', async () => {
    const store = mockStore();
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchFailureForSelector,
      failureSelector: response => response.error,
      shouldRetry: () => false
    });

    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      {
        type: actions.FETCH_FAILURE,
        target: 'aTarget',
        payload: 'NEW_CLIENT_ERROR',
        isPolling: true
      }
    ]);
  });
  it('Retries request', async () => {
    const store = mockStore();
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchFailureForPolling,
      shouldRetry: response => !response.ok
    });

    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.runAllTimers();

    // Use setImmediate so the Promise queue moves on and the first setTimeout callback is called
    await new Promise(setImmediate);
    expect(setTimeout).toHaveBeenCalledTimes(2);
    jest.runAllTimers();

    await new Promise(resolve => setImmediate(resolve));

    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      {
        type: '@TEST/FETCH_RETRY',
        target: 'aTarget',
        payload: { timeoutID: expect.any(Number), error: 'Still loading' }
      },
      { type: actions.FETCH, target: 'aTarget' },
      {
        type: '@TEST/FETCH_RETRY',
        target: 'aTarget',
        payload: { timeoutID: expect.any(Number), error: 'Still loading' }
      },
      { type: actions.FETCH, target: 'aTarget' },
      {
        type: actions.FETCH_SUCCESS,
        target: 'aTarget',
        payload: 'OK',
        isPolling: true
      }
    ]);
  });
});
