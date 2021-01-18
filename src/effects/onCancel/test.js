import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';

import onCancel from '.';

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

describe('onCancel', () => {
  it('Sets targets', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onCancel()
    });
    const newState = reducer(setUp.state, {
      type: '@@ACTION/TYPE',
      target: 'target',
      payload: 1
    });
    expect(newState).toEqual({
      target: null,
      targetLoading: false,
      targetError: null,
      targetRetryCount: 0,
      targetTimeoutID: null,
      targetIsRetrying: false
    });
  });
  it('Sets targets with selector', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onCancel(action => action.payload.timeoutID)
    });
    const newState = reducer(setUp.state, {
      type: '@@ACTION/TYPE',
      target: 'target',
      payload: { timeoutID: 1 }
    });
    expect(newState).toEqual({
      target: null,
      targetLoading: false,
      targetError: null,
      targetRetryCount: 0,
      targetTimeoutID: null,
      targetIsRetrying: false
    });
  });
});
