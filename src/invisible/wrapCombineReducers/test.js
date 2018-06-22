import { combineReducers, createStore } from 'redux';

import createReducer from '../../creators/createReducer';

import wrapCombineReducers, { createExternalActions } from '.';

const setUp = {
  store: null
};

const configureStore = invisibleReducer => {
  const reducersObject = {
    foo: (state = { NSLoading: false }) => state,
    dummy: (state = {}) => state
  };
  const ownCombineReducers = wrapCombineReducers(combineReducers, invisibleReducer);
  return createStore(ownCombineReducers(reducersObject));
};

beforeEach(() => {
  setUp.store = configureStore();
});

describe('wrapCombineReducers', () => {
  it('Wrap reducers can combine reducers and provide an invisible reducer', async () => {
    const $ = createExternalActions('foo');
    await setUp.store.dispatch({ type: $.LOADING, target: 'NS' });
    expect(setUp.store.getState()).toEqual({ foo: { NSLoading: true }, dummy: {} });
  });

  it('Allow to customize the invisible reducer', () => {
    const invisibleReducer = createReducer(
      {},
      { INCREMENT: state => ({ ...state, counter: (state.counter || 0) + 1 }) }
    );
    const store = configureStore(invisibleReducer);
    const $ = createExternalActions('foo', ['INCREMENT']);
    store.dispatch({ type: $.INCREMENT });

    const $$ = createExternalActions('dummy', ['INCREMENT']);
    store.dispatch({ type: $$.INCREMENT });

    expect(store.getState()).toEqual({
      foo: { NSLoading: false, counter: 1 },
      dummy: { counter: 1 }
    });
  });
});
