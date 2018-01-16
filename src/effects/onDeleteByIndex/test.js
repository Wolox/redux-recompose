import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';

import onDeleteByIndex from '.';

const initialState = {
  aTarget: [1, 2, 4, 6, 1]
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('onDeleteByIndex', () => {
  it('By default, deletes reading index from payload', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/DELETE': onDeleteByIndex()
    });
    let newState = reducer(setUp.state, { type: '@@ACTION/DELETE', payload: 0, target: 'aTarget' });
    expect(newState.aTarget).toEqual([2, 4, 6, 1]);
    newState = reducer(newState, { type: '@@ACTION/DELETE', payload: 2, target: 'aTarget' });
    expect(newState.aTarget).toEqual([2, 4, 1]);
    newState = reducer(newState, { type: '@@ACTION/DELETE', payload: 2, target: 'aTarget' });
    expect(newState.aTarget).toEqual([2, 4]);
  });
  it('By default, does not throw on index out of range', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/DELETE': onDeleteByIndex()
    });
    const newState = reducer(setUp.state, { type: '@@ACTION/DELETE', payload: 200, target: 'aTarget' });
    expect(newState.aTarget).toEqual(setUp.state.aTarget);
  });
  it('May receive the index via custom payload', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/DELETE': onDeleteByIndex(action => action.payload.index)
    });
    const newState = reducer(setUp.state, { type: '@@ACTION/DELETE', payload: { index: 3 }, target: 'aTarget' });
    expect(newState.aTarget).toEqual([1, 2, 4, 1]);
  });
  it('Is secure for -1 value', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/DELETE': onDeleteByIndex()
    });
    // A missing value, wrongCalculatedIndexUseOnDeleteInstead will be -1
    const wrongCalculatedIndexUseOnDeleteInstead = setUp.state.aTarget.indexOf(5);
    const newState = reducer(setUp.state, { type: '@@ACTION/DELETE', payload: wrongCalculatedIndexUseOnDeleteInstead, target: 'aTarget' });
    expect(newState.aTarget).toEqual(setUp.state.aTarget);
  });
});
