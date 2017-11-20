import createAction from '.';

describe('createAction', () => {
  it('Throws if a type is not specified', () => {
    expect(() => createAction(null, 'target', 'payload')).toThrowError(Error, 'Action must require a type');
  });
  it('Creates the action', () => {
    expect(createAction('type', 'target', 'payload')).toEqual({
      type: 'type',
      target: 'target',
      payload: 'payload'
    });
  });
});
