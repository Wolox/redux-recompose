import Immutable from 'seamless-immutable';

import completeState from './';

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
      ignoredTargets: { ignoredTargets: 'ignoredTargets' }
    });
    expect(completedState).toEqual({
      target: 1,
      targetLoading: false,
      targetError: null,
      otherTarget: 2,
      otherTargetLoading: false,
      otherTargetError: null,
      ignoredTargets: 'ignoredTargets'
    });
  });

  it('Throws if an initial state is not provided', () => {
    expect(() => completeState({ description: null })).toThrow(new Error('Expected an object as a description'));
  });

  it('Throws if ignored targets is not a object', () => {
    expect(() => completeState({ description: {}, ignoredTargets: [] })).toThrow(new Error('Expected an objects as ignored targets'));
  });

  it('Throws if targetCompleters is not an object array', () => {
    expect(() => completeState({ description: {}, targetCompleters: [{}, 1, null] }))
      .toThrow(new Error('Expected an array of objects as a target completers'));
  });

  it('Throws if targetCompleters has an invalid object', () => {
    expect(() => completeState({ description: {}, targetCompleters: [{}] }))
      .toThrow(new Error('Expected an object with targets as string array and completer as valid function'));
  });

  it('Should complete in a custom way `otherTarget`', () => {
    const completedState = completeState({
      description: setUp.state,
      ignoredTargets: { ignoredTarget: 'ignoredTarget' },
      targetCompleters: [
        {
          completer: target => ({
            [target]: 100,
            [`${target}Customized`]: true
          }),
          targets: ['value']
        }
      ]
    });
    expect(completedState).toEqual({
      target: 1,
      targetLoading: false,
      targetError: null,
      otherTarget: 2,
      otherTargetLoading: false,
      otherTargetError: null,
      ignoredTarget: 'ignoredTarget',
      value: 100,
      valueCustomized: true
    });
  });
});
