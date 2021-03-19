import withPreFetch from '../withPreFetch';
import mergeInjections from './index';

describe('mergeInjections', () => {
  it('Throws error when injections is not an array', () => {
    expect(() => mergeInjections(withPreFetch(() => {}))).toThrow(new TypeError('injections should be an array'));
  });
  it('Merges injections', () => {
    const mergedInjections = mergeInjections([withPreFetch(() => {})]);
    expect(mergedInjections).toEqual({ prebehavior: expect.any(Function) });
  });
});
