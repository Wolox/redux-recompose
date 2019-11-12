import mockStore from '../../utils/asyncActionsUtils';
import createTypes from '../../creators/createTypes';
import withPostSuccess from '../withPostSuccess';

const MockService = {
  fetchSomething: async (data = 42) =>
    new Promise(resolve => resolve({ ok: true, data: data + 1 })),
  fetchFailure: async () => new Promise(resolve => resolve({ ok: false, problem: 'CLIENT_ERROR' }))
};

const actions = createTypes(['FETCH', 'OTHER_FETCH'], '@TEST');

describe('singleCallThunkAction', () => {
  it('Does not dispatch an action by default', async () => {
    const store = mockStore({});
    await store.dispatch({ service: MockService.fetchSomething });
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([]);
  });
  it('Calls the service specified via parameters', async () => {
    const store = mockStore({});
    await store.dispatch({
      service: MockService.fetchSomething,
      payload: 20,
      injections: [
        withPostSuccess((dispatch, response) =>
          dispatch({ type: actions.OTHER_FETCH, payload: response.data }))
      ]
    });
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([{ type: actions.OTHER_FETCH, payload: 21 }]);
  });
});
