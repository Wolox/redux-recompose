import Immutable from 'seamless-immutable';

import completeState, { customCompleter } from './';

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
    const completedState = completeState({ description: setUp.state });
    expect(completedState).toEqual({
      target: 1,
      targetLoading: false,
      targetError: null,
      otherTarget: 2,
      otherTargetLoading: false,
      otherTargetError: null
    });
  });

  it('Extends only fields that are not excluded', () => {
    const completedState = completeState({
      description: setUp.state,
      ignoredTargets: ['otherTarget']
    });
    expect(completedState).toEqual({
      target: 1,
      targetLoading: false,
      targetError: null,
      otherTarget: 2
    });
  });

  it('Throws if an initial state is not provided', () => {
    expect(() => completeState({ description: null })).toThrow(new Error('Expected an object as a description'));
  });

  it('Throws if ignored targets is not a list', () => {
    expect(() => completeState({ description: {}, ignoredTargets: {} })).toThrow(new Error('Expected an array of strings as ignored targets'));
  });

  it('Throws if ignored targets is not a pure string array', () => {
    expect(() => completeState({ description: {}, ignoredTargets: ['1', {}] })).toThrow(new Error('Expected an array of strings as ignored targets'));
  });

  it('Throws if targetCompleters is not an object array', () => {
    expect(() => completeState({ description: {}, targetCompleters: [{}, 1, null] }))
      .toThrow(new Error('Expected an array of objects as a target completers'));
  });

  it('Throws if targetCompleters has an invalid object', () => {
    expect(() => completeState({ description: {}, targetCompleters: [{}] }))
      .toThrow(new Error('Expected an objects with targets as string array and completers as valid object'));
  });

  it('Should complete in a custom way `otherTarget`', () => {
    const completedState = completeState({
      description: setUp.state,
      ignoredTargets: ['otherTarget'],
      targetCompleters: [
        {
          completers: {
            Custom: true
          },
          targets: ['otherTarget']
        }
      ]
    });
    expect(completedState).toEqual({
      target: 1,
      targetLoading: false,
      targetError: null,
      otherTarget: 2,
      otherTargetCustom: true
    });
  });

  it('Should return a custom completed object', () => {
    const result = customCompleter(['data'], {
      Completed: 100
    });
    expect(result).toEqual({
      dataCompleted: 100
    });
  });

  it('Should return an empty object', () => {
    const result = customCompleter(['data']);
    expect(result).toEqual({});
  });
});
