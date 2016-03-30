jest.unmock('../../utils/google-maps-pool');

describe('GoogleMapsPool', () => {
  let element;
  let GoogleMapsPool;

  beforeEach(() => {
    element = document.createElement('div');
    element.appendChild = jest.genMockFunction();
    GoogleMapsPool = require('../../utils/google-maps-pool').default;
    window.__gmapsPool = [];
    window.google = {
      maps: {
        Map: jest.genMockFunction(),
        LatLng: jest.genMockFunction(),
      },
    };
  });

  describe('getFirstAvailableIndex', () => {
    it('returns -1 if no maps have been created', () => {
      const result = GoogleMapsPool.getFirstAvailableIndex();
      expect(result).toBe(-1);
    });

    it('returns -1 if no maps are available', () => {
      window.__gmapsPool.push({
        available: false,
      });
      const result = GoogleMapsPool.getFirstAvailableIndex();
      expect(result).toBe(-1);
    });

    it('returns the index of the first available map', () => {
      window.__gmapsPool.push({
        available: true,
      });
      const result = GoogleMapsPool.getFirstAvailableIndex();
      expect(result).toEqual(0);
    });
  });

  describe('useAvailableMap', () => {
    let index;
    let item;

    beforeEach(() => {
      index = 0;
      item = {
        available: true,
        map: {
          getDiv: jest.genMockFunction(),
          setOptions: jest.genMockFunction(),
        },
      };
      window.__gmapsPool.push(item);
    });

    it('appends the map div to the components\' node', () => {
      GoogleMapsPool.useAvailableMap(index, element, {});
      expect(element.appendChild).toBeCalled();
    });

    it('sets the item\'s availability to false', () => {
      GoogleMapsPool.useAvailableMap(index, element, {});
      expect(item.available).toBe(false);
    });

    it('returns the index of the map', () => {
      const result = GoogleMapsPool.useAvailableMap(index, element, {});
      expect(result).toBe(index);
    });
  });

  describe('createElement', () => {
    it('creates and returns a new element', () => {
      const result = GoogleMapsPool.createElement();
      expect(result.style.width).toBe('100%');
      expect(result.style.height).toBe('100%');
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
    it('uses the available map if there is one', () => {
      window.__gmapsPool = [{
        available: true,
        map: {
          getDiv: jest.genMockFunction(),
          setOptions: jest.genMockFunction(),
        },
      }];
      const result = GoogleMapsPool.create(element, {});
      expect(result).toBe(0);
    });

    it('creates a new map if none is available', () => {
      window.__gmapsPool = [{
        available: false,
      }];
      const result = GoogleMapsPool.create(element, {});
      expect(result).toBe(1);
    });
  });

  describe('free', () => {
    it('sets the available flag to true', () => {
      const item = {
        available: false,
      };
      window.__gmapsPool.push(item);
      GoogleMapsPool.free(0);
      expect(item.available).toBe(true);
    });
  });

  describe('getMap', () => {
    it('returns the map at the given index', () => {
      const item = {
        map: {},
      };
      window.__gmapsPool.push(item);
      const result = GoogleMapsPool.getMap(0);
      expect(result).toBe(item.map);
    });
  });

  describe('update', () => {
    it('updates the map options', () => {
      const item = {
        map: {
          setOptions: jest.genMockFunction(),
        },
      };
      window.__gmapsPool.push(item);
      GoogleMapsPool.update(0, {});
      expect(item.map.setOptions).toBeCalled();
    });
  });
});
