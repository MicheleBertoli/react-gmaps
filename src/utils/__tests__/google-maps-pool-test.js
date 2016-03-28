jest.dontMock('../../utils/google-maps-pool');

describe('GoogleMapsPool', () => {

  let element;
  let GoogleMapsPool;

  beforeEach(() => {
    element = document.createElement('div');
    element.appendChild = jest.genMockFunction();
    GoogleMapsPool = require('../../utils/google-maps-pool');
    window.__gmapsPool = [];
    window.google = {
      maps: {
        Map: jest.genMockFunction(),
        LatLng: jest.genMockFunction()
      }
    };
  });

  describe('getFirstAvailableMap', () => {

    it('returns null if no maps have been created', () => {
      const result = GoogleMapsPool.getFirstAvailableMap();
      expect(result).toBe(null);
    });

    it('returns null if no maps are available', () => {
      window.__gmapsPool.push({
        map: {},
        available: false
      });
      const result = GoogleMapsPool.getFirstAvailableMap();
      expect(result).toBe(null);
    });

    it('returns null if no maps are available', () => {
      const item = {
        map: {},
        available: true
      };
      window.__gmapsPool.push(item);
      const result = GoogleMapsPool.getFirstAvailableMap();
      expect(result).toEqual({
        index: 0,
        map: item.map
      });
    });

  });

  describe('useAvailableMap', () => {

    let firstAvailableMap;

    beforeEach(() => {
      firstAvailableMap = {
        available: true,
        index: 0,
        map: {
          getDiv: jest.genMockFunction(),
          setOptions: jest.genMockFunction()
        },
      };
      window.__gmapsPool.push(firstAvailableMap);
    });

    it('appends the map div to the components\' node', () => {
      GoogleMapsPool.useAvailableMap(firstAvailableMap, element, {});
      expect(element.appendChild).toBeCalled();
    });

    it('sets the new options to the map', () => {
      GoogleMapsPool.useAvailableMap(firstAvailableMap, element, {});
      expect(firstAvailableMap.map.setOptions).toBeCalled();
    });

    it('sets the availability back to false', () => {
      GoogleMapsPool.useAvailableMap(firstAvailableMap, element, {});
      expect(firstAvailableMap.available).toBe(false);
    });

    it('returns the index of the map', () => {
      const result = GoogleMapsPool.useAvailableMap(
        firstAvailableMap, element, {});
      expect(result).toBe(firstAvailableMap.index);
    });

  });

  describe('createNewMap', () => {

    it('appends the map div to the components\' node', () => {
      GoogleMapsPool.createNewMap(element, {});
      expect(element.appendChild).toBeCalled();
    });

    it('creates a new map instance', () => {
      GoogleMapsPool.createNewMap(element, {});
      expect(window.google.maps.Map).toBeCalled();
    });

    it('pushes a new element into the pool', () => {
      GoogleMapsPool.createNewMap(element, {});
      expect(window.__gmapsPool.length).toBe(1);
    });

    it('returns the index of the element', () => {
      const result = GoogleMapsPool.createNewMap(element, {});
      expect(result).toBe(0);
    });

  });

  describe('create', () => {

    it('uses the available map if available', () => {
      GoogleMapsPool.useAvailableMap = jest.genMockFunction();
      GoogleMapsPool.getFirstAvailableMap = jest.genMockFunction()
        .mockReturnValueOnce({});
      GoogleMapsPool.create(element, {});
      expect(GoogleMapsPool.useAvailableMap).toBeCalled();
    });

    it('creates a new map if none is available', () => {
      GoogleMapsPool.createNewMap = jest.genMockFunction();
      GoogleMapsPool.create(element, {});
      expect(GoogleMapsPool.createNewMap).toBeCalled();
    });

  });

  describe('free', () => {

    it('sets the available flag to true', () => {
      const item = {
        available: false
      };
      window.__gmapsPool.push(item);
      GoogleMapsPool.free(0);
      expect(item.available).toBe(true);
    });

  });

  describe('get', () => {

    it('returns the map at index', () => {
      const item = {
        map: {}
      };
      window.__gmapsPool.push(item);
      const result = GoogleMapsPool.get(0);
      expect(result).toBe(item.map);
    });

  });

  describe('update', () => {

    it('updates the map options', () => {
      const item = {
        map: {
          setOptions: jest.genMockFunction()
        }
      };
      window.__gmapsPool.push(item);
      GoogleMapsPool.update(0, {});
      expect(item.map.setOptions).toBeCalled();
    });

  });

});
