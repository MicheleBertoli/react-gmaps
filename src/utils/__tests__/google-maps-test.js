jest.dontMock('querystring');
jest.dontMock('../../utils/google-maps');

describe('GoogleMaps', () => {

  let GoogleMaps;

  beforeEach(() => {
    window.google = undefined;
    window.mapsCallback = undefined;
    GoogleMaps = require('../../utils/google-maps');
  });

  it('registers the callbacks if google does not exist', () => {
    expect(GoogleMaps.callbacks.length).toBe(0);
    GoogleMaps.load(null, () => {});
    expect(GoogleMaps.callbacks.length).toBe(1);
  });

  it('appends the script if not appended', () => {
    expect(GoogleMaps.appended).toBe(false);
    GoogleMaps.load(null, () => {});
    expect(GoogleMaps.appended).toBe(true);
  });

  it('fires the callback if google exists', () => {
    window.google = {};
    const callback = jest.genMockFunction();
    GoogleMaps.load(null, callback);
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });

  it('fires the callbacks on mapsCallback', () => {
    const callback = jest.genMockFunction();
    GoogleMaps.load(null, callback);
    window.mapsCallback();
    expect(callback).toBeCalled();
  });

  it('returns the src', () => {
    const expected = GoogleMaps.getSrc({
      param0: 'param0',
      param1: 'param1'
    });
    let actual = 'https://maps.googleapis.com/maps/api/js';
    actual += '?callback=mapsCallback&';
    actual += 'param0=param0&param1=param1';
    expect(expected).toBe(actual);
  });

  it('deletes the global mapsCallback', () => {
    window.mapsCallback = {};
    GoogleMaps.mapsCallback();
    expect(window.mapsCallback).toBeUndefined();
  });

});

