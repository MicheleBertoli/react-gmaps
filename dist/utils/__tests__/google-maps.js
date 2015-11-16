'use strict';

jest.dontMock('querystring');
jest.dontMock('../../utils/google-maps');

describe('GoogleMaps', function () {

  var GoogleMaps = undefined;

  beforeEach(function () {
    window.google = undefined;
    window.mapsCallback = undefined;
    GoogleMaps = require('../../utils/google-maps');
  });

  it('registers the callbacks if google does not exist', function () {
    expect(GoogleMaps.callbacks.length).toBe(0);
    GoogleMaps.load(null, function () {});
    expect(GoogleMaps.callbacks.length).toBe(1);
  });

  it('adds the script if not added', function () {
    expect(GoogleMaps.added).toBe(false);
    GoogleMaps.load(null, function () {});
    expect(GoogleMaps.added).toBe(true);
  });

  it('fires the callback if google exists', function () {
    window.google = {};
    var callback = jest.genMockFunction();
    GoogleMaps.load(null, callback);
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });

  it('fires the callbacks on mapsCallback', function () {
    var callback = jest.genMockFunction();
    GoogleMaps.load(null, callback);
    window.mapsCallback();
    expect(callback).toBeCalled();
  });

  it('returns the src', function () {
    var expected = GoogleMaps.getSrc({
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
    GoogleMaps.mapsCallback();
    expect(window.mapsCallback).toBeUndefined();
  });
});