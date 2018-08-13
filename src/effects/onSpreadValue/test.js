import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';

import onSpreadValue from '.';

const initialState = {
  key1: null,
  key2: null
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('onSpreadValue', () => {
  it('Sets a value from the selector', () => {
    const payload = { key1: '2', key2: 42 };
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onSpreadValue(payload)
    });
    const newState = reducer(setUp.state, { type: '@@ACTION/TYPE', payload });
    Object.keys(payload).forEach(key => {
      expect(newState[key]).toBe(payload[key]);
    });
  });
});
