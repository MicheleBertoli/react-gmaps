'use strict';

jest.dontMock('../../utils/compare-props');

describe('compareProps', function () {

  var compareProps = require('../../utils/compare-props');

  it('returns false if the objects have a different number of keys', function () {
    var result = compareProps({ a: 1 }, { a: 1, b: 2 });
    expect(result).toBe(false);
  });

  it('returns false if the objects have different keys', function () {
    var result = compareProps({ a: 1 }, { b: 2 });
    expect(result).toBe(false);
  });

  it('returns false if the objects have different values', function () {
    var result = compareProps({ a: 1 }, { a: 2 });
    expect(result).toBe(false);
  });

  it('returns true if the objects have the same keys/values', function () {
    var result = compareProps({ a: 1 }, { a: 1 });
    expect(result).toBe(true);
  });

  it('ignores the `children` property', function () {
    var result = compareProps({ a: 1, children: 1 }, { a: 1, children: 2 });
    expect(result).toBe(true);
  });
});