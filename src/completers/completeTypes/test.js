import completeTypes from '.';

describe('completeTypes', () => {
  it('Completes from an array\'s element', () => {
    const arrTypes = ['AN_ACTION'];
    expect(completeTypes({ primaryActions: arrTypes })).toEqual(['AN_ACTION', 'AN_ACTION_SUCCESS', 'AN_ACTION_FAILURE']);
  });
  it('Completes from an array of multiple elements', () => {
    const arrTypes = ['AN_ACTION', 'OTHER_ACTION', 'ANOTHER_ACTION'];
    expect(completeTypes({ primaryActions: arrTypes })).toEqual([
      'AN_ACTION',
      'AN_ACTION_SUCCESS',
      'AN_ACTION_FAILURE',
      'OTHER_ACTION',
      'OTHER_ACTION_SUCCESS',
      'OTHER_ACTION_FAILURE',
      'ANOTHER_ACTION',
      'ANOTHER_ACTION_SUCCESS',
      'ANOTHER_ACTION_FAILURE'
    ]);
  });
  it('Does not complete from exception cases', () => {
    const arrActions = ['AN_ACTION'];
    const exceptionCases = ['EXCEPT_ACTION'];
    expect(completeTypes({ primaryActions: arrActions, ignoredActions: exceptionCases })).toEqual([
      'AN_ACTION',
      'AN_ACTION_SUCCESS',
      'AN_ACTION_FAILURE',
      'EXCEPT_ACTION'
    ]);
  });
  it('Custom completers completes all types passed', () => {
    const primaryActions = [];
    const ignoredActions = [];
    const completer = type => [type, `${type}_SUCCESS`, `${type}_FAILURE`];
    const customCompleters = [
      { completer, actions: ['CUSTOM_ACTION'] }
    ];
    expect(completeTypes({ primaryActions, ignoredActions, customCompleters })).toEqual([
      'CUSTOM_ACTION',
      'CUSTOM_ACTION_SUCCESS',
      'CUSTOM_ACTION_FAILURE'
    ]);
  });
  it('Throws if parameters are not the expected ones', () => {
    expect(() => completeTypes({ primaryActions: null })).toThrow(new Error('Primary actions must be an array of strings'));
    expect(() => completeTypes({ primaryActions: ['ONE'], ignoredActions: null })).toThrow(new Error('Ignored actions must be an array of strings'));
    expect(() => completeTypes({
      primaryActions: ['ONE'],
      ignoredActions: ['TWO'],
      customCompleters: [{
        actions: null
      }]
    })).toThrow(new Error('Exception cases from actions must be an array of strings'));
    expect(() => completeTypes({
      primaryActions: ['ONE'],
      ignoredActions: ['TWO'],
      customCompleters: [{
        actions: ['THREE'],
        completer: null
      }]
    })).toThrow(new Error('Completer must be a function'));
  });
});
