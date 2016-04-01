jest.unmock('../google-maps-pool');
jest.unmock('../default-map-options');

import defaultMapOptions from '../default-map-options';

describe('GoogleMapsPool', () => {
  const noop = () => {};
  let element;
  let GoogleMapsPool;

  beforeEach(() => {
    element = document.createElement('div');
    element.appendChild = jest.genMockFunction();
    window.google = {
      maps: {
        ControlPosition: {},
        MapTypeId: {},
        MapTypeControlStyle: {},
        ScaleControlStyle: {},
        event: {
          trigger: jest.genMockFunction(),
        },
        Map: jest.genMockFunction(),
        LatLng: noop,
      },
    };
    GoogleMapsPool = require('../google-maps-pool').default;
  });

  describe('getFirstAvailableIndex', () => {
    it('returns -1 if no maps have been created', () => {
      const result = GoogleMapsPool.getFirstAvailableIndex();
      expect(result).toBe(-1);
    });

    it('returns -1 if no maps are available', () => {
      GoogleMapsPool.instances.push({
        available: false,
      });
      const result = GoogleMapsPool.getFirstAvailableIndex();
      expect(result).toBe(-1);
    });

    it('returns the index of the first available map', () => {
      GoogleMapsPool.instances.push({
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
          setOptions: jest.genMockFunction(),
          getDiv: noop,
          getZoom: noop,
          getCenter: noop,
          setZoom: noop,
          setCenter: noop,
        },
      };
      GoogleMapsPool.instances.push(item);
    });

    it('sets the item\'s availability to false', () => {
      GoogleMapsPool.useAvailableMap(index, element, {});
      expect(item.available).toBe(false);
    });

    it('appends the map div to the components\' node', () => {
      GoogleMapsPool.useAvailableMap(index, element, {});
      expect(element.appendChild).toBeCalled();
    });

    it('merges the options with the default ones', () => {
      const options = {};
      GoogleMapsPool.useAvailableMap(index, element, options);
      expect(item.map.setOptions).toBeCalledWith({
        ...defaultMapOptions(options),
        center: {},
      });
    });

    it('resets the map', () => {
      GoogleMapsPool.useAvailableMap(index, element, {});
      expect(window.google.maps.event.trigger).toBeCalled();
    });

    it('returns the index of the map', () => {
      const result = GoogleMapsPool.useAvailableMap(index, element, {});
      expect(result).toBe(index);
    });
  });

  describe('reset', () => {
    let map;

    beforeEach(() => {
      map = {
        setOptions: jest.genMockFunction(),
        getDiv: jest.genMockFunction(),
        getZoom: jest.genMockFunction(),
        getCenter: jest.genMockFunction(),
        setZoom: jest.genMockFunction(),
        setCenter: jest.genMockFunction(),
      };
    });

    it('gets the zoom and the center of the map', () => {
      GoogleMapsPool.reset(map);
      expect(map.getZoom).toBeCalled();
      expect(map.getCenter).toBeCalled();
    });

    it('triggers the resize event', () => {
      GoogleMapsPool.reset(map);
      expect(window.google.maps.event.trigger).toBeCalled();
    });

    it('sets the zoom and the center of the map', () => {
      GoogleMapsPool.reset(map);
      expect(map.setZoom).toBeCalled();
      expect(map.setCenter).toBeCalled();
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
      expect(GoogleMapsPool.instances.length).toBe(1);
    });

    it('returns the index of the element', () => {
      const result = GoogleMapsPool.createNewMap(element, {});
      expect(result).toBe(0);
    });
  });

  describe('create', () => {
    it('uses the available map if there is one', () => {
      GoogleMapsPool.instances = [{
        available: true,
        map: {
          setOptions: noop,
          getDiv: noop,
          getZoom: noop,
          getCenter: noop,
          setZoom: noop,
          setCenter: noop,
        },
      }];
      const result = GoogleMapsPool.create(element, {});
      expect(result).toBe(0);
    });

    it('creates a new map if none is available', () => {
      GoogleMapsPool.instances = [{
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
      GoogleMapsPool.instances.push(item);
      GoogleMapsPool.free(0);
      expect(item.available).toBe(true);
    });
  });

  describe('getMap', () => {
    it('returns the map at the given index', () => {
      const item = {
        map: {},
      };
      GoogleMapsPool.instances.push(item);
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
      GoogleMapsPool.instances.push(item);
      GoogleMapsPool.update(0, {});
      expect(item.map.setOptions).toBeCalled();
    });
  });
});
