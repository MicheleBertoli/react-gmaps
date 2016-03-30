jest.unmock('querystring');
jest.unmock('../../utils/google-maps-api');

describe('GoogleMapsApi', () => {
  const noop = () => {};
  let GoogleMapsApi;

  beforeEach(() => {
    window.google = undefined;
    window.mapsCallback = undefined;
    GoogleMapsApi = require('../../utils/google-maps-api').default;
  });

  describe('load', () => {
    it('registers the callback', () => {
      GoogleMapsApi.load(null, noop);
      expect(GoogleMapsApi.callbacks.length).toBe(1);
    });

    it('fires the callbacks if google exists', () => {
      window.google = {};
      const callback = jest.genMockFunction();
      GoogleMapsApi.load(null, callback);
      jest.runAllTimers();
      expect(callback).toBeCalled();
    });

    it('sets the global callback if not appended', () => {
      GoogleMapsApi.load(null, noop);
      expect(window.mapsCallback).toBeDefined();
    });

    it('appends the script if not appended', () => {
      GoogleMapsApi.load(null, noop);
      expect(GoogleMapsApi.appended).toBe(true);
    });

    it('returns the callback index', () => {
      const result = GoogleMapsApi.load(null, noop);
      expect(result).toBe(0);
    });
  });

  describe('getSrc', () => {
    it('returns the src with params', () => {
      const actual = GoogleMapsApi.getSrc({
        param0: 'param0',
        param1: 'param1',
      });
      let expected = 'https://maps.googleapis.com/maps/api/js';
      expected += '?callback=mapsCallback&';
      expected += 'param0=param0&param1=param1';
      expect(actual).toBe(expected);
    });
  });

  describe('appendScript', () => {
    it('appends the script', () => {
      document.head.appendChild = jest.genMockFunction();
      GoogleMapsApi.appendScript(null);
      expect(document.head.appendChild).toBeCalled();
    });

    it('sets the appended flag to true', () => {
      GoogleMapsApi.appendScript(null);
      expect(GoogleMapsApi.appended).toBe(true);
    });
  });

  describe('mapsCallback', () => {
    it('resets the global callback', () => {
      window.mapsCallback = noop;
      GoogleMapsApi.mapsCallback();
      expect(window.mapsCallback).toBeUndefined();
    });

    it('fires all the callbacks', () => {
      const callback = jest.genMockFunction();
      GoogleMapsApi.callbacks.push(callback);
      GoogleMapsApi.mapsCallback();
      expect(callback).toBeCalled();
    });
  });

  describe('fireCallbacks', () => {
    it('fires all the callbacks', () => {
      const callback = jest.genMockFunction();
      GoogleMapsApi.callbacks.push(callback);
      GoogleMapsApi.fireCallbacks();
      expect(callback).toBeCalled();
    });

    it('resets the callbacks', () => {
      GoogleMapsApi.callbacks.push(noop);
      GoogleMapsApi.fireCallbacks();
      expect(GoogleMapsApi.callbacks.length).toBe(0);
    });
  });

  describe('removeCallback', () => {
    it('removes a callback at the given index', () => {
      GoogleMapsApi.callbacks.push(noop);
      GoogleMapsApi.removeCallback(0);
      expect(GoogleMapsApi.callbacks.length).toBe(0);
    });
  });
});
