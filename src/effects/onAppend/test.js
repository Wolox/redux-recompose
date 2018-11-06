import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';

import onAppend from '.';

const initialState = {
  numberArray: [4, 2, 3, 4, 1]
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('onAppend', () => {
  it('Appends integer to integer array', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/APPEND_INTEGER': onAppend()
    });
    const newState = reducer(setUp.state, {
      type: '@@ACTION/APPEND_INTEGER',
      payload: 7,
      target: 'numberArray'
    });
    expect(newState.numberArray).toEqual([4, 2, 3, 4, 1, 7]);
  });

  it('Deletes objects based on a payload', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/APPEND_INTEGER': onAppend(action => action.payload.id)
    });
    const newState = reducer(setUp.state, {
      type: '@@ACTION/APPEND_INTEGER',
      payload: { id: 8 },
      target: 'numberArray'
    });
    expect(newState.numberArray).toEqual([4, 2, 3, 4, 1, 8]);
  });
});
