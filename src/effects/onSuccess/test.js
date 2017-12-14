import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';

import onSuccess from '.';

const initialState = {
  target: null,
  targetLoading: true,
  targetError: 'Some error'
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('onSuccess', () => {
  it('Sets correctly target with error and loading', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onSuccess()
    });
    const newState = reducer(setUp.state, { type: '@@ACTION/TYPE', target: 'target', payload: 'Success Payload' });
    expect(newState).toEqual({
      target: 'Success Payload',
      targetLoading: false,
      targetError: null
    });
  });
  it('Sets conditionally target content based on payload', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onSuccess((action, state) => action.payload + (state[action.target] || 0))
    });
    const incrementAction = { type: '@@ACTION/TYPE', target: 'target', payload: 1 };
    setUp.state = reducer(setUp.state, incrementAction);
    setUp.state = reducer(setUp.state, incrementAction);
    expect(setUp.state).toEqual({
      target: 2,
      targetLoading: false,
      targetError: null
    });
  });
});
