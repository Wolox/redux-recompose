import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';

import onConcatenate from '.';

const initialState = {
  numberArray: [1, 2, 3]
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('onConcatenate', () => {
  it('Concatenates array to another array', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/CONCATENATE': onConcatenate()
    });
    const newState = reducer(setUp.state, {
      type: '@@ACTION/CONCATENATE',
      payload: [4, 5],
      target: 'numberArray'
    });
    expect(newState.numberArray).toEqual([1, 2, 3, 4, 5]);
  });

  it('Concatenates array based on a payload', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/CONCATENATE': onConcatenate(action => action.payload.results)
    });
    const newState = reducer(setUp.state, {
      type: '@@ACTION/CONCATENATE',
      payload: { results: [4, 5, 6] },
      target: 'numberArray'
    });
    expect(newState.numberArray).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
