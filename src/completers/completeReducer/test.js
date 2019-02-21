import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';
import createModalActions from '../../creators/createModalActions';
import onFailure from '../../effects/onFailure';

import completeReducer from '.';

const initialState = {
  target: 1,
  targetLoading: false,
  targetError: null,
  modalIsOpen: false,
  modalContent: null
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('completeReducer', () => {
  it('Throws if a reducer description is not present', () => {
    expect(() => completeReducer(null)).toThrow(new Error('Reducer description is incomplete, should contain at least an actions field to complete'));
  });
  it('Throws if a reducer description has not a primaryActions field', () => {
    expect(() => completeReducer({ a: 1 })).toThrow(new Error('Reducer description is incomplete, should contain at least an actions field to complete'));
  });
  it('Throws if primary actions is not an array of strings', () => {
    const reducerDescription = {
      primaryActions: [null, 'thing']
    };
    expect(() => completeReducer(reducerDescription)).toThrow(new Error('Primary actions must be a string array'));
  });
  it('Extends correctly the primary actions', () => {
    const reducerDescription = {
      primaryActions: ['@NAMESPACE/ACTION']
    };
    const reducer = createReducer(setUp.state, completeReducer(reducerDescription));
    // onLoading for common action
    setUp.state = reducer(setUp.state, { type: '@NAMESPACE/ACTION', target: 'target' });
    expect(setUp.state.targetLoading).toBe(true);
    expect(setUp.state.targetError).toBeNull();
    expect(setUp.state.target).toBe(1);

    // onSuccess behavior
    setUp.state = reducer(setUp.state, { type: '@NAMESPACE/ACTION_SUCCESS', target: 'target', payload: 42 });
    expect(setUp.state.targetLoading).toBe(false);
    expect(setUp.state.targetError).toBeNull();
    expect(setUp.state.target).toBe(42);

    // yet another onLoading
    setUp.state = reducer(setUp.state, { type: '@NAMESPACE/ACTION', target: 'target' });
    expect(setUp.state.targetLoading).toBe(true);
    expect(setUp.state.targetError).toBeNull();
    expect(setUp.state.target).toBe(42);

    // onFailure behavior
    setUp.state = reducer(setUp.state, { type: '@NAMESPACE/ACTION_FAILURE', target: 'target', payload: 'Oops !' });
    expect(setUp.state.targetLoading).toBe(false);
    expect(setUp.state.targetError).toBe('Oops !');
    expect(setUp.state.target).toBe(42);
  });
  it('Overrides actions correctly', () => {
    const reducerDescription = {
      primaryActions: ['@NAMESPACE/ACTION'],
      override: {
        '@NAMESPACE/ACTION_FAILURE': onFailure(action => action.payload.message),
        '@NAMESPACE/ANOTHER': onFailure()
      }
    };
    const reducer = createReducer(setUp.state, completeReducer(reducerDescription));
    setUp.state = reducer(setUp.state, { type: '@NAMESPACE/ACTION_FAILURE', target: 'target', payload: { message: 'ERror MACro' } });
    expect(setUp.state.targetError).toBe('ERror MACro');
    setUp.state = reducer(setUp.state, { type: '@NAMESPACE/ANOTHER', target: 'target', payload: 'Also known as Ermac' });
    expect(setUp.state.targetError).toBe('Also known as Ermac');
    // Flawless victory
  });
  it('Completes modal actions', () => {
    const reducerDescription = {
      modalActions: ['@NAMESPACE/MODAL']
    };
    const reducer = createReducer(setUp.state, completeReducer(reducerDescription));
    const modal = createModalActions({ type: '@NAMESPACE/MODAL', target: 'modalIsOpen', contentTarget: 'modalContent' });
    setUp.state = reducer(setUp.state, modal.open('Title'));
    expect(setUp.state.modalIsOpen).toBe(true);
    expect(setUp.state.modalContent).toBe('Title');
    setUp.state = reducer(setUp.state, modal.close());
    expect(setUp.state.modalIsOpen).toBe(false);
    expect(setUp.state.modalContent).toBe(null);
  });
});
