import mockStore from '../../utils/asyncActionsUtils';
import createTypes from '../createTypes';

import createThunkAction from '.';

const MockService = {
  fetchSomething: async () => new Promise(resolve => resolve({ ok: true, data: 42 })),
  fetchFailure: async () => new Promise(resolve => resolve({ ok: false, problem: 'CLIENT_ERROR' }))
};

const actions = createTypes(['FETCH', 'FETCH_SUCCESS', 'FETCH_FAILURE'], '@TEST');

describe('createThunkAction', () => {
  it('Dispatches SUCCESS correctly', async () => {
    const store = mockStore({});
    await store.dispatch(createThunkAction(actions.FETCH, 'aTarget', MockService.fetchSomething));
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.FETCH_SUCCESS, target: 'aTarget', payload: 42 }
    ]);
  });
  it('Dispatches FAILURE correctly', async () => {
    const store = mockStore({});
    await store.dispatch(createThunkAction(actions.FETCH, 'aTarget', MockService.fetchFailure));
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.FETCH_FAILURE, target: 'aTarget', payload: 'CLIENT_ERROR' }
    ]);
  });
});
