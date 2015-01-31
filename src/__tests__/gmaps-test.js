jest.dontMock('../gmaps');

describe('Gmaps', function() {

  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var Gmaps = require('../gmaps');

  var gmaps;
  var width = '100%';
  var height = '100%';

  beforeEach(() => {
    gmaps = TestUtils.renderIntoDocument(
      <Gmaps 
        width={width}
        height={height} 
        onClick={jest.genMockFunction()} />
    );
    window.google = {
      maps: {
        Map: jest.genMockFunction(),
        event: {
          addListener: jest.genMockFunction(),
          removeListener: jest.genMockFunction()
        }
      }
    }
    gmaps.mapsCallback();
  });

  it('applies the style', function() {
    expect(gmaps.getDOMNode().style.width).toBe(width);
    expect(gmaps.getDOMNode().style.height).toBe(height);
  });

  it('creates a map', function() {
    expect(gmaps.getMap()).not.toBe(null);
  });

  it('binds events', function() {
    expect(window.google.maps.event.addListener).toBeCalled();
  });

  it('unbinds events', function() {
    gmaps.componentWillUnmount();
    expect(window.google.maps.event.removeListener).toBeCalled();
  });

});
