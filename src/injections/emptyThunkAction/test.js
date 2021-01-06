import mockStore from '../../utils/asyncActionsUtils';
import createTypes from '../../creators/createTypes';
import withPostSuccess from '../withPostSuccess';

const MockService = {
  fetchSomething: async (data = 42) => new Promise(resolve => resolve({ ok: true, data: data + 1 })),
  fetchFailure: async () => new Promise(resolve => resolve({ ok: false, problem: 'CLIENT_ERROR' }))
};

const actions = createTypes(['FETCH', 'OTHER_FETCH'], '@TEST');

describe('emptyThunkAction', () => {
  it('Just dispatches FETCH action if no target is specified', async () => {
    const store = mockStore({});
    await store.dispatch({ type: actions.FETCH, service: MockService.fetchSomething });
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([{ type: actions.FETCH }]);
  });
  it('Calls the service specified via parameters', async () => {
    const store = mockStore({});
    await store.dispatch({
      type: actions.FETCH,
      service: MockService.fetchSomething,
      payload: 20,
      injections: [
        withPostSuccess((dispatch, response) => dispatch({ type: actions.OTHER_FETCH, payload: response.data }))
      ]
    });
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH },
      { type: actions.OTHER_FETCH, payload: 21 }
    ]);
  });
});
