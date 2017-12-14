import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';

import onLoaded from '.';
import onLoading from '../onLoading';

const initialState = {
  target: null,
  targetLoading: true,
  count: 0
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('onLoaded', () => {
  it('Sets correctly loading target', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE_LOADED': onLoaded(),
      '@@ACTION/TYPE_LOADING': onLoading()
    });
    let newState = reducer(setUp.state, { type: '@@ACTION/TYPE_LOADING', target: 'target' });
    expect(newState.targetLoading).toBe(true);
    newState = reducer(setUp.state, { type: '@@ACTION/TYPE_LOADED', target: 'target' });
    expect(newState.targetLoading).toBe(false);
  });
  it('Does not modify other targets', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onLoaded()
    });
    const newState = reducer(setUp.state, { type: '@@ACTION/TYPE', target: 'target' });
    expect(newState.target).toBeNull();
  });
  it('Sets loading conditionally', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onLoaded((action, state) => !!action.payload || state.count > 0)
    });
    let newState = reducer(setUp.state, { type: '@@ACTION/TYPE', target: 'target' });
    expect(newState.targetLoading).toBe(false);
    newState = reducer(setUp.state, { type: '@@ACTION/TYPE', target: 'target', payload: 'payload' });
    expect(newState.targetLoading).toBe(true);
  });
});
