import mockStore from '../../utils/asyncActionsUtils';
import createTypes from '../../creators/createTypes';
import composeInjections from '../composeInjections';
import baseThunkAction from '../baseThunkAction';

import withPreFetch from '.';

const MockService = {
  fetchSomething: async () => new Promise(resolve => resolve({ ok: true, data: 42 })),
  fetchFailureNotFound: async () => new Promise(resolve => resolve({ ok: false, problem: 'CLIENT_ERROR', status: 404 }))
};

const actions = createTypes(['FETCH', 'FETCH_SUCCESS', 'FETCH_FAILURE', 'FETCH_LOADING'], '@TEST');

describe('withPreFetch', () => {
  it('Handles correctly the prefetch behavior', async () => {
    const store = mockStore({});
    await store.dispatch(composeInjections(
      baseThunkAction(actions.FETCH, 'aTarget', MockService.fetchSomething),
      withPreFetch(dispatch => dispatch({ type: actions.FETCH_LOADING }))
    ));
    const actionsDispatched = store.getActions();
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH_LOADING },
      { type: actions.FETCH_SUCCESS, target: 'aTarget', payload: 42 }
    ]);
  });
});
