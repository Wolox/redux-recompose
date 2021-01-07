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

  it('Only extends fields that are not ignored', () => {
    const completedState = completeState({
      description: setUp.state,
      ignoredTargets: { ignoredTargetsKey: 'ignoredTargetsValue' }
    });
    expect(completedState).toEqual({
      target: 1,
      targetLoading: false,
      targetError: null,
      otherTarget: 2,
      otherTargetLoading: false,
      otherTargetError: null,
      ignoredTargetsKey: 'ignoredTargetsValue'
    });
  });

  it('Extends all polling fields', () => {
    const completedState = completeState({ description: setUp.state, pollingTargets: { myPollingTarget: 3 } });
    expect(completedState).toEqual({
      target: 1,
      targetLoading: false,
      targetError: null,
      otherTarget: 2,
      otherTargetLoading: false,
      otherTargetError: null,
      myPollingTarget: 3,
      myPollingTargetLoading: false,
      myPollingTargetError: null,
      myPollingTargetIsRetrying: false,
      myPollingTargetRetryCount: 0,
      myPollingTargetTimeoutID: null
    });
  });

  it('Throws if an initial state is not a object', () => {
    expect(() => completeState({ description: null })).toThrow(new Error('description should be an object'));
    expect(() => completeState({ description: 3 })).toThrow(new Error('description should be an object'));
  });

  it('Throws if ignored targets is not a object', () => {
    expect(() => completeState({ description: {}, ignoredTargets: [] })).toThrow(new Error('ignoredTargets should be an object'));
    expect(() => completeState({ description: {}, ignoredTargets: 3 })).toThrow(new Error('ignoredTargets should be an object'));
  });

  it('Throws if polling targets is not a object', () => {
    expect(() => completeState({ description: {}, pollingTargets: [] })).toThrow(new Error('pollingTargets should be an object'));
    expect(() => completeState({ description: {}, pollingTargets: 3 })).toThrow(new Error('pollingTargets should be an object'));
  });

  it('Throws if targetCompleters is not an object array', () => {
    expect(() => completeState({ description: {}, targetCompleters: 3 }))
      .toThrow(new Error('targetCompleters should be an array'));
    expect(() => completeState({ description: {}, targetCompleters: [1, {}, 1, null] }))
      .toThrow(new Error('targetCompleters should be an array of objects'));
    expect(() => completeState({ description: {}, targetCompleters: [{ targets: ['1'], completer: 1 }] }))
      .toThrow();
  });

  it('Should complete in a custom way `otherTarget`', () => {
    const completedState = completeState({
      description: setUp.state,
      ignoredTargets: { ignoredTarget: 'ignoredTarget' },
      targetCompleters: [
        {
          completer: (target, index) => ({
            [target]: 100,
            [`${target}Customized${index}`]: true
          }),
          targets: ['firstTarget', 'secondTarget']
        },
        {
          completer: target => ({
            [target]: 200,
            [`${target}CustomizedAgain`]: true
          }),
          targets: ['thirdTarget']
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
      firstTarget: 100,
      firstTargetCustomized0: true,
      secondTarget: 100,
      secondTargetCustomized1: true,
      thirdTarget: 200,
      thirdTargetCustomizedAgain: true
    });
  });
});
