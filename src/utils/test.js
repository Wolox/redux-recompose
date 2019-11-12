import { isObjectArray } from './typeUtils';

describe('Is object array', () => {
  it("Shouldn't receive number as param", () => {
    const result = isObjectArray(100);
    expect(result).toBe(false);
  });

  it('Should receive array', () => {
    const result = isObjectArray([]);
    expect(result).toBe(true);
  });

  it('Should receive only objects array', () => {
    const result = isObjectArray([{}]);
    expect(result).toBe(true);
    const result2 = isObjectArray([{}, {}, null]);
    expect(result2).toBe(false);
  });
});
