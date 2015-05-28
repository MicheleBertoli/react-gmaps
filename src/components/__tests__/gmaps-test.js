jest.dontMock('../listener');
jest.dontMock('../gmaps');

describe('Gmaps', () => {

  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;
  let Gmaps = require('../gmaps');

  let gmaps;
  let width = '100%';
  let height = '100%';
  let style = {
    backgroundColor: 'black'
  };
  let className = 'className';
  let onMapCreated = jest.genMockFunction();

  beforeEach(() => {
    delete window.google;
    gmaps = TestUtils.renderIntoDocument(
      <Gmaps 
        width={width}
        height={height} 
        style={style}
        className={className}
        onMapCreated={onMapCreated}
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
    };
    window.mapsCallback();
  });

  it('applies the style', () => {
    expect(gmaps.getDOMNode().style.width).toBe(width);
    expect(gmaps.getDOMNode().style.height).toBe(height);
    expect(gmaps.getDOMNode().style.backgroundColor).toBe(style.backgroundColor);
  });

  it('applies the class name', () => {
    expect(gmaps.getDOMNode().className).toBe(className);
  });

  it('loads maps once', () => {
    gmaps.componentDidMount();
    expect(window.mapsCallback).not.toBeDefined();
  });

  it('creates a map', () => {
    expect(gmaps.getMap()).not.toBe(null);
  });

  it('calls `onMapCreated`', () => {
    expect(onMapCreated).toBeCalled();
  });

  it('binds events', () => {
    expect(window.google.maps.event.addListener).toBeCalled();
  });

  it('unbinds events', () => {
    gmaps.componentWillUnmount();
    expect(window.google.maps.event.removeListener).toBeCalled();
  });

});
