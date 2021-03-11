import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';

import onRetry from '.';

const initialState = {
  target: null,
  targetLoading: true,
  targetError: null,
  targetRetryCount: 0,
  targetTimeoutID: null,
  targetIsRetrying: false
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('onRetry', () => {
  it('Sets correctly target with error and loading', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onRetry()
    });
    const newState = reducer(setUp.state, {
      type: '@@ACTION/TYPE',
      target: 'target',
      payload: { error: 'Please try again', timeoutID: 1 }
    });
    expect(newState).toEqual({
      target: null,
      targetLoading: false,
      targetError: 'Please try again',
      targetRetryCount: 1,
      targetTimeoutID: 1,
      targetIsRetrying: true
    });
  });
  it('Sets conditionally target content based on payload', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onRetry(action => action.payload.customError)
    });
    const newState = reducer(setUp.state, {
      type: '@@ACTION/TYPE',
      target: 'target',
      payload: { customError: 'Please try again', timeoutID: 1 }
    });
    expect(newState).toEqual({
      target: null,
      targetLoading: false,
      targetError: 'Please try again',
      targetRetryCount: 1,
      targetTimeoutID: 1,
      targetIsRetrying: true
    });
  });
});
