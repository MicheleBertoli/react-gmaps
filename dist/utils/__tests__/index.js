'use strict';

jest.dontMock('querystring');
jest.dontMock('../../utils');

describe('Utils', function () {

  var Utils = undefined;

  beforeEach(function () {
    window.google = undefined;
    window.mapsCallback = undefined;
    Utils = require('../../utils');
  });

  it('registers the callbacks if google does not exist', function () {
    expect(Utils.callbacks.length).toBe(0);
    Utils.loadMaps(null, function () {});
    expect(Utils.callbacks.length).toBe(1);
  });

  it('adds the script if not added', function () {
    expect(Utils.added).toBe(false);
    Utils.loadMaps(null, function () {});
    expect(Utils.added).toBe(true);
  });

  it('fires the callback if google exists', function () {
    window.google = {};
    var callback = jest.genMockFunction();
    Utils.loadMaps(null, callback);
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });

  it('fires the callbacks on mapsCallback', function () {
    var callback = jest.genMockFunction();
    Utils.loadMaps(null, callback);
    window.mapsCallback();
    expect(callback).toBeCalled();
  });

  it('returns the src', function () {
    var expected = Utils.getSrc({
      param0: 'param0',
      param1: 'param1'
    });
    var actual = 'https://maps.googleapis.com/maps/api/js';
    actual += '?callback=mapsCallback&';
    actual += 'param0=param0&param1=param1';
    expect(expected).toBe(actual);
  });

  it('deletes the global mapsCallback', function () {
    window.mapsCallback = {};
    Utils.mapsCallback();
    expect(window.mapsCallback).toBeUndefined();
  });
});