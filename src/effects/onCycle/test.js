import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';

import onCycle from '.';

const initialState = {
  letterArray: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('onCycle', () => {
  it('Cycle array two positions forward', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/CYCLE': onCycle()
    });
    const newState = reducer(setUp.state, {
      type: '@@ACTION/CYCLE',
      target: 'letterArray',
      step: 2
    });
    expect(newState.letterArray).toEqual(['C', 'D', 'E', 'F', 'G', 'H', 'A', 'B']);
  });

  it('Cycling array two positions backwards', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/CYCLE': onCycle()
    });
    const newState = reducer(setUp.state, {
      type: '@@ACTION/CYCLE',
      target: 'letterArray',
      step: -2
    });
    expect(newState.letterArray).toEqual(['G', 'H', 'A', 'B', 'C', 'D', 'E', 'F']);
  });
});
