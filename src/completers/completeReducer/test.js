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
  modalContent: null,
  pollingTarget: 5,
  pollingTargetLoading: false,
  pollingTargetError: null,
  pollingTargetRetryCount: 0,
  pollingTargetTimeoutID: null,
  pollingTargetIsRetrying: false
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('completeReducer', () => {
  it('Throws if a reducer description is not present', () => {
    expect(() => completeReducer(null)).toThrow(new Error('reducerDescription should be an object'));
    expect(() => completeReducer()).toThrow();
  });
  it('Throws if primary actions is not an array of strings', () => {
    expect(() => completeReducer({ primaryActions: 1 })).toThrow(new Error('primaryActions should be an array'));
    expect(() => completeReducer({ primaryActions: [null, 'thing'] })).toThrow(new Error('primaryActions should be an array of strings'));
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
  it('Completes polling successfully', () => {
    const reducerDescription = {
      pollingActions: ['@NAMESPACE/POLLING']
    };
    const reducer = createReducer(setUp.state, completeReducer(reducerDescription));

    const basePollingAction = {
      type: '@NAMESPACE/POLLING',
      target: 'pollingTarget',
      shouldRetry: () => false
    };

    setUp.state = reducer(setUp.state, basePollingAction);
    expect(setUp.state.pollingTargetIsRetrying).toBe(false);
    expect(setUp.state.pollingTargetLoading).toBe(true);
    expect(setUp.state.pollingTargetError).toBeNull();
    expect(setUp.state.pollingTarget).toBe(5);
    expect(setUp.state.pollingTargetRetryCount).toBe(0);
    expect(setUp.state.pollingTargetTimeoutID).toBeNull();

    // onRetry
    setUp.state = reducer(setUp.state, {
      type: '@NAMESPACE/POLLING_RETRY',
      target: 'pollingTarget',
      payload: {
        timeoutID: 1,
        error: 'Oopsie'
      }
    });
    expect(setUp.state.pollingTargetIsRetrying).toBe(true);
    expect(setUp.state.pollingTargetLoading).toBe(false);
    expect(setUp.state.pollingTargetError).toBe('Oopsie');
    expect(setUp.state.pollingTarget).toBe(5);
    expect(setUp.state.pollingTargetRetryCount).toBe(1);
    expect(setUp.state.pollingTargetTimeoutID).toBe(1);

    setUp.state = reducer(setUp.state, basePollingAction);
    expect(setUp.state.pollingTargetIsRetrying).toBe(true);
    expect(setUp.state.pollingTargetLoading).toBe(true);
    expect(setUp.state.pollingTargetError).toBe('Oopsie');
    expect(setUp.state.pollingTarget).toBe(5);
    expect(setUp.state.pollingTargetRetryCount).toBe(1);
    expect(setUp.state.pollingTargetTimeoutID).toBe(1);

    // onSuccess
    setUp.state = reducer(setUp.state, {
      type: '@NAMESPACE/POLLING_SUCCESS',
      target: 'pollingTarget',
      payload: 50,
      isPolling: true
    });
    expect(setUp.state.pollingTargetIsRetrying).toBe(false);
    expect(setUp.state.pollingTargetLoading).toBe(false);
    expect(setUp.state.pollingTargetError).toBeNull();
    expect(setUp.state.pollingTarget).toBe(50);
    expect(setUp.state.pollingTargetRetryCount).toBe(0);
    expect(setUp.state.pollingTargetTimeoutID).toBe(1);
  });
  it('Completes polling unsuccessfully', () => {
    const reducerDescription = {
      pollingActions: ['@NAMESPACE/POLLING']
    };
    const reducer = createReducer(setUp.state, completeReducer(reducerDescription));

    const basePollingAction = {
      type: '@NAMESPACE/POLLING',
      target: 'pollingTarget',
      shouldRetry: () => false
    };

    setUp.state = reducer(setUp.state, basePollingAction);
    expect(setUp.state.pollingTargetIsRetrying).toBe(false);
    expect(setUp.state.pollingTargetLoading).toBe(true);
    expect(setUp.state.pollingTargetError).toBeNull();
    expect(setUp.state.pollingTarget).toBe(5);
    expect(setUp.state.pollingTargetRetryCount).toBe(0);
    expect(setUp.state.pollingTargetTimeoutID).toBeNull();

    // onRetry
    setUp.state = reducer(setUp.state, {
      type: '@NAMESPACE/POLLING_RETRY',
      target: 'pollingTarget',
      payload: {
        timeoutID: 1,
        error: 'Oopsie'
      }
    });
    expect(setUp.state.pollingTargetIsRetrying).toBe(true);
    expect(setUp.state.pollingTargetLoading).toBe(false);
    expect(setUp.state.pollingTargetError).toBe('Oopsie');
    expect(setUp.state.pollingTarget).toBe(5);
    expect(setUp.state.pollingTargetRetryCount).toBe(1);
    expect(setUp.state.pollingTargetTimeoutID).toBe(1);

    setUp.state = reducer(setUp.state, basePollingAction);
    expect(setUp.state.pollingTargetIsRetrying).toBe(true);
    expect(setUp.state.pollingTargetLoading).toBe(true);
    expect(setUp.state.pollingTargetError).toBe('Oopsie');
    expect(setUp.state.pollingTarget).toBe(5);
    expect(setUp.state.pollingTargetRetryCount).toBe(1);
    expect(setUp.state.pollingTargetTimeoutID).toBe(1);

    // onFailure
    setUp.state = reducer(setUp.state, {
      type: '@NAMESPACE/POLLING_FAILURE',
      target: 'pollingTarget',
      payload: 33,
      isPolling: true
    });
    expect(setUp.state.pollingTargetIsRetrying).toBe(false);
    expect(setUp.state.pollingTargetLoading).toBe(false);
    expect(setUp.state.pollingTargetError).toBe(33);
    expect(setUp.state.pollingTarget).toBe(5);
    expect(setUp.state.pollingTargetRetryCount).toBe(0);
    expect(setUp.state.pollingTargetTimeoutID).toBe(1);
  });
});
