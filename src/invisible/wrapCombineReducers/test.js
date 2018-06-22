import { combineReducers, createStore } from 'redux';

import wrapCombineReducers, { createExternalActions } from '.';

describe('wrapCombineReducers', () => {
  it('Wrap reducers can combine reducers and provide an invisible reducer', async () => {
    const reducersObject = { foo: (state = { NSLoading: false }) => state };
    const ownCombineReducers = wrapCombineReducers(combineReducers);
    const store = createStore(ownCombineReducers(reducersObject));
    const $ = createExternalActions('foo');
    await store.dispatch({ type: $.LOADING, target: 'NS' });
    expect(store.getState()).toEqual({ foo: { NSLoading: true } });
  });
});
