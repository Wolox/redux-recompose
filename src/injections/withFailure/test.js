import mockStore from '../../utils/asyncActionsUtils';
import createTypes from '../../creators/createTypes';
import withStatusHandling from '../withStatusHandling';

import withFailure from '.';

const MockService = {
  fetchSomething: () => new Promise(resolve => resolve({ ok: true, data: 42 })),
  fetchFailureNotFound: () => new Promise(resolve => resolve({ ok: false, problem: 'CLIENT_ERROR', status: 404 }))
};

const actions = createTypes(
  ['FETCH', 'FETCH_SUCCESS', 'FETCH_FAILURE', 'OTHER_ACTION', 'NOT_FOUND'],
  '@TEST'
);

describe('withFailure', () => {
  it('Handles correctly failure behavior', async () => {
    const store = mockStore({});
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchSomething,
      injections: [withFailure(dispatch => dispatch({ type: actions.OTHER_ACTION }))]
    });
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchFailureNotFound,
      injections: [withFailure(dispatch => dispatch({ type: actions.OTHER_ACTION }))]
    });
    const actionsDispatched = store.getActions();
    // Does not dispatch FAILURE action
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.FETCH_SUCCESS, target: 'aTarget', payload: 42 },
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.OTHER_ACTION }
    ]);
  });
  it('Does not execute depending on the status handler result', async () => {
    const store = mockStore({});
    // Does execute Failure handler
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchFailureNotFound,
      injections: [
        withStatusHandling({ 404: dispatch => dispatch({ type: actions.NOT_FOUND }) }),
        withFailure(dispatch => dispatch({ type: actions.OTHER_ACTION }))
      ]
    });

    // Does not execute Failure handler
    await store.dispatch({
      type: actions.FETCH,
      target: 'aTarget',
      service: MockService.fetchFailureNotFound,
      injections: [
        withStatusHandling({
          404: dispatch => {
            dispatch({ type: actions.NOT_FOUND });
            return false;
          }
        }),
        withFailure(dispatch => dispatch({ type: actions.OTHER_ACTION }))
      ]
    });

    const actionsDispatched = store.getActions();
    // Does not dispatch FAILURE action
    expect(actionsDispatched).toEqual([
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.NOT_FOUND },
      { type: actions.OTHER_ACTION },
      { type: actions.FETCH, target: 'aTarget' },
      { type: actions.NOT_FOUND }
    ]);
  });
});
