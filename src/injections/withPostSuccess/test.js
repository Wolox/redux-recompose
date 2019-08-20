import mockStore from '../../utils/asyncActionsUtils';
import createTypes from '../../creators/createTypes';

import withPostSuccess from '.';

const MockService = {
  fetchSomething: async () => new Promise(resolve => resolve({ ok: true, data: 42 })),
  fetchFailureNotFound: async () =>
    new Promise(resolve => resolve({ ok: false, problem: 'CLIENT_ERROR', status: 404 }))
};

const actions = createTypes(['FETCH', 'FETCH_SUCCESS', 'FETCH_FAILURE', 'OTHER_ACTION'], '@TEST');

describe('withPostSuccess', () => {
  it('Handles correctly post success', async () => {
    const store = mockStore({});
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchSomething,
      injections: [withPostSuccess(dispatch => dispatch({ type: actions.OTHER_ACTION }))]
    });

    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.FETCH_SUCCESS, target: 'aTarget', payload: 42 },
      { type: actions.OTHER_ACTION }
    ]);
  });
});
