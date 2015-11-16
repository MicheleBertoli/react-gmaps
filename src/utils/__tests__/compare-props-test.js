jest.dontMock('../../utils/compare-props');

describe('compareProps', () => {

  const compareProps = require('../../utils/compare-props');

  it('returns false if the objects have a different number of keys', () => {
    const result = compareProps({a: 1}, {a: 1, b: 2});
    expect(result).toBe(false);
  });

  it('returns false if the objects have different keys', () => {
    const result = compareProps({a: 1}, {b: 2});
    expect(result).toBe(false);
  });

  it('returns false if the objects have different values', () => {
    const result = compareProps({a: 1}, {a: 2});
    expect(result).toBe(false);
  });

  it('returns true if the objects have the same keys/values', () => {
    const result = compareProps({a: 1}, {a: 1});
    expect(result).toBe(true);
  });

  it('ignores the `children` property', () => {
    const result = compareProps({a: 1, children: 1}, {a: 1, children: 2});
    expect(result).toBe(true);
  });

});

