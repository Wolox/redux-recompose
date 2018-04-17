import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';

import onToggle from '.';

const initialState = {
  target: false
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('onToggle', () => {
  it('Sets target content based on state value', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onToggle()
    });
    const toggleAction = { type: '@@ACTION/TYPE', target: 'target' };
    setUp.state = reducer(setUp.state, toggleAction);
    expect(setUp.state).toEqual({
      target: true
    });

    setUp.state = reducer(setUp.state, toggleAction);
    expect(setUp.state).toEqual({
      target: false
    });
  });
  it('Sets target content based on payload', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onToggle()
    });
    setUp.state = reducer(setUp.state, { type: '@@ACTION/TYPE', target: 'target', payload: true });
    expect(setUp.state).toEqual({
      target: true
    });

    setUp.state = reducer(setUp.state, { type: '@@ACTION/TYPE', target: 'target', payload: false });
    expect(setUp.state).toEqual({
      target: false
    });
  });
});
