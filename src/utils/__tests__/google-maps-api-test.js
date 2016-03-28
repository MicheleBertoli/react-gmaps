jest.dontMock('querystring');
jest.dontMock('../../utils/google-maps-api');

describe('GoogleMapsApi', () => {

  let GoogleMapsApi;

  beforeEach(() => {
    window.google = undefined;
    window.mapsCallback = undefined;
    GoogleMapsApi = require('../../utils/google-maps-api');
  });

  it('registers the callbacks if google does not exist', () => {
    expect(GoogleMapsApi.callbacks.length).toBe(0);
    GoogleMapsApi.load(null, () => {});
    expect(GoogleMapsApi.callbacks.length).toBe(1);
  });

  it('appends the script if not appended', () => {
    expect(GoogleMapsApi.appended).toBe(false);
    GoogleMapsApi.load(null, () => {});
    expect(GoogleMapsApi.appended).toBe(true);
  });

  it('fires the callback if google exists', () => {
    window.google = {};
    const callback = jest.genMockFunction();
    GoogleMapsApi.load(null, callback);
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });

  it('fires the callbacks on mapsCallback', () => {
    const callback = jest.genMockFunction();
    GoogleMapsApi.load(null, callback);
    window.mapsCallback();
    expect(callback).toBeCalled();
  });

  it('returns the src', () => {
    const expected = GoogleMapsApi.getSrc({
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
    GoogleMapsApi.mapsCallback();
    expect(window.mapsCallback).toBeUndefined();
  });

});

