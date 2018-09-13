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
  it('Spread the payload in the state', () => {
    const payload = { key1: '2', key2: 42 };
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onSpreadValue()
    });
    const newState = reducer(setUp.state, { type: '@@ACTION/TYPE', payload });
    Object.keys(payload).forEach(key => {
      expect(newState[key]).toBe(payload[key]);
    });
  });

  it('Spread the payload in the state using selector', () => {
    const payload = { key1: '2', key2: 42 };
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onSpreadValue(action => action.data)
    });
    const newState = reducer(setUp.state, { type: '@@ACTION/TYPE', data: payload });
    Object.keys(payload).forEach(key => {
      expect(newState[key]).toBe(payload[key]);
    });
  });
});
