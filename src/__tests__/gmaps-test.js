jest.dontMock('../gmaps');

describe('Gmaps', () => {

  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var Gmaps = require('../gmaps');

  var gmaps;
  var width = '100%';
  var height = '100%';

  beforeEach(() => {
    delete window.google;
    gmaps = TestUtils.renderIntoDocument(
      <Gmaps 
        width={width}
        height={height} 
        onClick={jest.genMockFunction()} />
    );
    window.google = {
      maps: {
        Map: jest.genMockFunction(),
        LatLng: jest.genMockFunction(),
        event: {
          addListener: jest.genMockFunction(),
          removeListener: jest.genMockFunction()
        }
      }
    }
    window.mapsCallback();
  });

  it('applies the style', () => {
    expect(gmaps.getDOMNode().style.width).toBe(width);
    expect(gmaps.getDOMNode().style.height).toBe(height);
  });

  it('loads maps once', () => {
    gmaps.componentDidMount();
    expect(window.mapsCallback).not.toBeDefined();
  });

  it('creates a map', () => {
    expect(gmaps.getMap()).not.toBe(null);
  });

  it('binds events', () => {
    expect(window.google.maps.event.addListener).toBeCalled();
  });

  it('unbinds events', () => {
    gmaps.componentWillUnmount();
    expect(window.google.maps.event.removeListener).toBeCalled();
  });

});
