import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';

import onFailure from '.';

const initialState = {
  target: 'Some content',
  targetLoading: true,
  targetError: null
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('onFailure', () => {
  it('Sets correctly error and loading', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onFailure()
    });
    const newState = reducer(setUp.state, { type: '@@ACTION/TYPE', target: 'target', payload: 'Oops !' });
    expect(newState).toEqual({
      target: 'Some content',
      targetLoading: false,
      targetError: 'Oops !'
    });
  });
  it('Sets conditionally error content', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onFailure(action => `Error: ${action.payload}`)
    });
    const newState = reducer(setUp.state, { type: '@@ACTION/TYPE', target: 'target', payload: 'Oops !' });
    expect(newState).toEqual({
      target: 'Some content',
      targetLoading: false,
      targetError: 'Error: Oops !'
    });
  });
});
