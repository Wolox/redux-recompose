import mockStore from '../../utils/asyncActionsUtils';
import createTypes from '../../creators/createTypes';

import withPostFailure from '.';

const MockService = {
  fetchSomething: () => new Promise(resolve => resolve({ ok: true, data: 42 })),
  fetchFailureNotFound: () => new Promise(resolve => resolve({ ok: false, problem: 'CLIENT_ERROR', status: 404 }))
};

const actions = createTypes(['FETCH', 'FETCH_SUCCESS', 'FETCH_FAILURE', 'OTHER_ACTION'], '@TEST');

describe('withPostFailure', () => {
  it('Handles correctly post failure', async () => {
    const store = mockStore({});
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchFailureNotFound,
      injections: [withPostFailure(dispatch => dispatch({ type: actions.OTHER_ACTION }))]
    });

    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.FETCH_FAILURE, target: 'aTarget', payload: 'CLIENT_ERROR' },
      { type: actions.OTHER_ACTION }
    ]);
  });

  it('Does not dispatch on post failure in case of success', async () => {
    const store = mockStore({});
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchSomething,
      injections: [withPostFailure(dispatch => dispatch({ type: actions.OTHER_ACTION }))]
    });

    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.FETCH_SUCCESS, target: 'aTarget', payload: 42 }
    ]);
  });
});
