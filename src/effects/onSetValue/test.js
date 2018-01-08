import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';

import onSetValue from '.';

const initialState = {
  aTarget: null
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('onSetValue', () => {
  it('Sets a value from the selector', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onSetValue(42)
    });
    const newState = reducer(setUp.state, { type: '@@ACTION/TYPE', target: 'aTarget' });
    expect(newState.aTarget).toBe(42);
  });
});
