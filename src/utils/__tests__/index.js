jest.dontMock('../../utils');

describe('Utils', () => {

  let Utils;

  beforeEach(() => {
    delete window.google;
    delete window.mapsCallback;
    Utils = require('../../utils');
  });

  it('registers the callbacks if google does not exist', () => {
    expect(Utils.callbacks.length).toBe(0);
    Utils.loadMaps(null, () => {});
    expect(Utils.callbacks.length).toBe(1);
  });

  it('adds the script if not added', () => {
    expect(Utils.added).toBe(false);
    Utils.loadMaps(null, () => {});
    expect(Utils.added).toBe(true);
  });

  it('fires the callback if google exists', () => {
    window.google = {};
    const callback = jest.genMockFunction();
    Utils.loadMaps(null, callback);
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });

  it('fires the callbacks on mapsCallback', () => {
    const callback = jest.genMockFunction();
    Utils.loadMaps(null, callback);
    window.mapsCallback();
    expect(callback).toBeCalled();
  });

  it('deletes the global mapsCallback', () => {
    window.mapsCallback = {};
    Utils.mapsCallback();
    expect(window.mapsCallback).toBeUndefined();
  });

});

