import Immutable from 'seamless-immutable';

import createAction from '../../creators/createAction';
import createReducer from '../../creators/createReducer';

import onLoaded from '.';

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
      '@@ACTION/TYPE': onLoaded()
    });
    const newState = reducer(setUp.state, createAction('@@ACTION/TYPE', 'target'));
    expect(newState.targetLoading).toBeFalsy();
  });
  it('Does not modify other targets', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onLoaded()
    });
    const newState = reducer(setUp.state, createAction('@@ACTION/TYPE', 'target'));
    expect(newState.target).toBeNull();
  });
  it('Sets loading conditionally', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onLoaded((action, state) => action.payload || state.count > 0)
    });
    let newState = reducer(setUp.state, createAction('@@ACTION/TYPE', 'target'));
    expect(newState.targetLoading).toBeFalsy();
    newState = reducer(setUp.state, createAction('@@ACTION/TYPE', 'target', 'payload'));
    expect(newState.targetLoading).toBeTruthy();
  });
});
