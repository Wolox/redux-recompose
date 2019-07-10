import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';

import onReplace from '.';

const initialState = {
  letterArray: ['H','I','J','K','L','M','N'],
  numberArray: [23, 45, 56, 12, 28, 45, 90, 36, 44, 67]
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('onReplace', () => {
  it('Replace position on array by index', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/REPLACE': onReplace()
    });
    const newState = reducer(setUp.state, {
      type: '@@ACTION/REPLACE',
      target: 'letterArray',
      index: 3,
      payload: 'Z'
    });
    expect(newState.letterArray).toEqual(['H','I','J','Z','L','M','N']);
  });

  it('Replace position on array by condition', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/REPLACE': onReplace()
    });
    const newState = reducer(setUp.state, {
      type: '@@ACTION/REPLACE',
      target: 'numberArray',
      condition: element => element > 50,
      payload: 51
    });
    expect(newState.numberArray).toEqual([23, 45, 51, 12, 28, 45, 51, 36, 44, 51]);
  });
});
