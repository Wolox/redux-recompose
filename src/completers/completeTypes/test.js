import completeTypes from '.';

describe('completeTypes', () => {
  it("Completes from an array's element", () => {
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
  it('Polling actions completes', () => {
    const pollingActions = ['FETCH_1', 'FETCH_2'];
    expect(completeTypes({ pollingActions })).toEqual([
      'FETCH_1',
      'FETCH_1_SUCCESS',
      'FETCH_1_FAILURE',
      'FETCH_1_RETRY',
      'FETCH_1_CANCEL',
      'FETCH_2',
      'FETCH_2_SUCCESS',
      'FETCH_2_FAILURE',
      'FETCH_2_RETRY',
      'FETCH_2_CANCEL'
    ]);
  });
  it('Throws if parameters are not the expected ones', () => {
    expect(() => completeTypes({ primaryActions: null })).toThrow(new Error('primaryActions should be an array'));
    expect(() => completeTypes({ primaryActions: [null] })).toThrow(new Error('primaryActions should be an array of strings'));
    expect(() => completeTypes({ primaryActions: ['ONE'], ignoredActions: null })).toThrow(new Error('ignoredActions should be an array'));
    expect(() => completeTypes({ primaryActions: ['ONE'], ignoredActions: [null] })).toThrow(new Error('ignoredActions should be an array of strings'));
    expect(() => completeTypes({
      primaryActions: ['ONE'],
      ignoredActions: ['TWO'],
      customCompleters: [{
        actions: null
      }]
    })).toThrow(new Error('actions should be an array'));
    expect(() => completeTypes({
      primaryActions: ['ONE'],
      ignoredActions: ['TWO'],
      customCompleters: [{
        actions: [null]
      }]
    })).toThrow(new Error('actions should be an array of strings'));
    expect(() => completeTypes({
      primaryActions: ['ONE'],
      ignoredActions: ['TWO'],
      customCompleters: [{
        actions: ['THREE'],
        completer: null
      }]
    })).toThrow();
    expect(() => completeTypes({ pollingActions: null }).toThrow(new Error('pollingActions should be an array')));
    expect(() => completeTypes({ pollingActions: [null] }).toThrow(new Error('pollingActions should be an array of strings')));
  });
});
