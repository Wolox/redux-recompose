import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';

import onCycle from '.';

const initialState = {
  numberArray: ['A','B','C','D','E','F','G','H']
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('onCycle', () => {
  it('Cycle array', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/CYCLE': onCycle()
    });
    const newState = reducer(setUp.state, {
      type: '@@ACTION/CYCLE',
      target: 'numberArray',
      step: 2
    });
    expect(newState.numberArray).toEqual(['C','D','E','F','G','H','A','B']);
  });
});

describe('onCycle', () => {
  it('Cycle array', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/CYCLE': onCycle()
    });
    const newState = reducer(setUp.state, {
      type: '@@ACTION/CYCLE',
      target: 'numberArray',
      step: -2
    });
    expect(newState.numberArray).toEqual(['G','H','A','B','C','D','E','F']);
  });
});
