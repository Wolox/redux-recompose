import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import createTypes from '../createTypes';

import createThunkAction from '.';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const MockService = {
  fetchSomething: async () => new Promise(resolve => resolve({ ok: true, data: 42 }))
};

const actions = createTypes(['FETCH', 'FETCH_SUCCESS', 'FETCH_FAILURE'], '@TEST');

describe('createThunkAction', () => {
  it('Fetches data correctly', async () => {
    const store = mockStore({});
    await store.dispatch(createThunkAction(actions.FETCH, 'aTarget', MockService.fetchSomething));
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTargetLoading' },
      { type: actions.FETCH_SUCCESS, target: 'aTarget', payload: 42 }
    ]);
  });
});
