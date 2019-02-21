import Immutable from 'seamless-immutable';

import createReducer from '.';

const initialState = {
  count: 0
};

const setUp = {
  state: null
};

const actions = { DECREMENT: 'decrement', INCREMENT: 'increment', DUMMY: 'dummy' };

const dummyAction = { type: actions.DUMMY };
const decrementAction = { type: actions.DECREMENT, target: 'count' };
const incrementAction = { type: actions.INCREMENT, target: 'count' };

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('createReducer', () => {
  it('Throws if no reducer description is passed', () => {
    expect(() => createReducer({}, null)).toThrowError(new Error('Expected a reducer description as an object.'));
  });
  it('Throws if a non object reducer description is passed', () => {
    expect(() => createReducer({}, [])).toThrowError(new Error('Expected a reducer description as an object.'));
  });
  it('Initializes state correctly', () => {
    const reducerDescription = {};
    const reducer = createReducer(setUp.state, reducerDescription);
    expect(reducer(setUp.state, dummyAction).count).toBe(setUp.state.count);
  });
  it('Does not handle unknown actions', () => {
    const reducerDescription = {
      [actions.INCREMENT]: state => state.merge({ count: state.count + 1 })
    };
    const reducer = createReducer(setUp.state, reducerDescription);
    setUp.state = reducer(setUp.state, incrementAction);
    setUp.state = reducer(setUp.state, decrementAction);
    setUp.state = reducer(setUp.state, incrementAction);
    expect(setUp.state.count).toBe(2);
  });
  it('Does handle multiple actions', () => {
    const reducerDescription = {
      [actions.INCREMENT]: state => state.merge({ count: state.count + 1 }),
      [actions.DECREMENT]: state => state.merge({ count: state.count - 1 })
    };
    const reducer = createReducer(setUp.state, reducerDescription);
    setUp.state = reducer(setUp.state, incrementAction);
    setUp.state = reducer(setUp.state, decrementAction);
    setUp.state = reducer(setUp.state, incrementAction);
    expect(setUp.state.count).toBe(1);
  });
});
