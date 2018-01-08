import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';

import onReadValue from '.';

const initialState = {
  aTarget: null,
  count: 1
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('onReadValue', () => {
  it('Reads a value from a payload', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onReadValue()
    });
    const newState = reducer(setUp.state, { type: '@@ACTION/TYPE', payload: 'An elephant', target: 'aTarget' });
    expect(newState.aTarget).toBe('An elephant');
  });

  it('Reads a custom value from the payload or the state', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/ELEPHUN': onReadValue(action => action.payload.elephantCount),
      '@@ACTION/ELECOUNT': onReadValue((action, state) => action.payload.elephantCount + state.count)
    });
    let newState = reducer(setUp.state, { type: '@@ACTION/ELEPHUN', payload: { elephantCount: 3 }, target: 'aTarget' });
    expect(newState.aTarget).toBe(3);
    newState = reducer(newState, { type: '@@ACTION/ELECOUNT', payload: { elephantCount: 5 }, target: 'count' });
    expect(newState.count).toBe(6);
    expect(newState.aTarget).toBe(3);
  });
});
