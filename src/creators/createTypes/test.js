import createTypes from '.';

describe('createTypes', () => {
  it('Creates an empty types object from an empty array', () => {
    const types = createTypes([], '@@NAMESPACE');
    expect(types).toEqual({});
  });
  it('Creates types object based on a string array', () => {
    const types = createTypes(['ONE', 'TWO'], '@@NAMESPACE');
    expect(types).toEqual({
      ONE: '@@NAMESPACE/ONE',
      TWO: '@@NAMESPACE/TWO'
    });
  });
  it('It throws if does not receive an array', () => {
    expect(() => createTypes({}, 'none')).toThrow(Error, 'Action names must be an array of strings.');
  });
  it('It throws if does not receive a string array', () => {
    expect(() => createTypes(['s', {}], 'none')).toThrow(Error, 'Action names must be an array of strings.');
  });
});
