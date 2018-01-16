import completeTypes from '.';

describe('completeTypes', () => {
  it('Completes from an array\'s element', () => {
    const arrTypes = ['AN_ACTION'];
    expect(completeTypes(arrTypes)).toEqual(['AN_ACTION', 'AN_ACTION_SUCCESS', 'AN_ACTION_FAILURE']);
  });
  it('Completes from an array of multiple elements', () => {
    const arrTypes = ['AN_ACTION', 'OTHER_ACTION', 'ANOTHER_ACTION'];
    expect(completeTypes(arrTypes)).toEqual([
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
    expect(completeTypes(arrActions, exceptionCases)).toEqual([
      'AN_ACTION',
      'AN_ACTION_SUCCESS',
      'AN_ACTION_FAILURE',
      'EXCEPT_ACTION'
    ]);
  });
  it('Throws if parameters are not string lists', () => {
    expect(() => completeTypes(null)).toThrow(Error, 'Types must be an array of strings');
    expect(() => completeTypes(['ONE'], null)).toThrow(Error, 'Exception cases from actions must be an array of strings');
  });
});
