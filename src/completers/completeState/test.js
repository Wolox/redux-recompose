import Immutable from 'seamless-immutable';

import completeState from '.';

const initialState = {
  target: 1,
  otherTarget: 2
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('completeState', () => {
  it('Extends all fields by default', () => {
    expect(completeState(setUp.state)).toEqual({
      target: 1,
      targetLoading: false,
      targetError: null,
      otherTarget: 2,
      otherTargetLoading: false,
      otherTargetError: null
    });
  });
  it('Extends only fields that are not excluded', () => {
    expect(completeState(setUp.state, ['otherTarget'])).toEqual({
      target: 1,
      targetLoading: false,
      targetError: null,
      otherTarget: 2
    });
  });
  it('Throws if an initial state is not provided', () => {
    expect(() => completeState(null)).toThrow(new Error('Expected an object as a state to complete'));
  });
  it('Throws if ignored targets is not a list', () => {
    expect(() => completeState({}, {})).toThrow(new Error('Expected an array of strings as ignored targets'));
  });
  it('Throws if ignored targets is not a pure string array', () => {
    expect(() => completeState({}, ['1', {}])).toThrow(new Error('Expected an array of strings as ignored targets'));
  });
});
