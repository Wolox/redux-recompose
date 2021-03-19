import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';

import onFailure from '.';

const initialState = {
  target: 'Some content',
  targetLoading: true,
  targetError: null
};

const initialPollingState = {
  target: 'Some content',
  targetLoading: true,
  targetError: null,
  targetIsRetrying: true,
  targetRetryCount: 3,
  targetTimeoutID: 3
};

const setUp = {
  state: null,
  pollingState: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
  setUp.pollingState = Immutable(initialPollingState);
});

describe('onFailure', () => {
  it('Sets correctly error and loading', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onFailure()
    });
    const newState = reducer(setUp.state, { type: '@@ACTION/TYPE', target: 'target', payload: 'Oops !' });
    expect(newState).toEqual({
      target: 'Some content',
      targetLoading: false,
      targetError: 'Oops !'
    });
  });
  it('Sets conditionally error content', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onFailure(action => `Error: ${action.payload}`)
    });
    const newState = reducer(setUp.state, { type: '@@ACTION/TYPE', target: 'target', payload: 'Oops !' });
    expect(newState).toEqual({
      target: 'Some content',
      targetLoading: false,
      targetError: 'Error: Oops !'
    });
  });
  it('Sets polling target', () => {
    const reducer = createReducer(setUp.pollingState, {
      '@@ACTION/TYPE_FAILURE': onFailure()
    });
    const newState = reducer(setUp.pollingState, {
      type: '@@ACTION/TYPE_FAILURE',
      target: 'target',
      payload: 'Boom!',
      isPolling: true
    });
    expect(newState).toEqual({
      target: 'Some content',
      targetLoading: false,
      targetError: 'Boom!',
      targetIsRetrying: false,
      targetRetryCount: 0,
      targetTimeoutID: 3
    });
  });
});
