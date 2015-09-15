jest.dontMock('../../mixins/listener');
jest.dontMock('../../utils');
jest.dontMock('../gmaps');

describe('Gmaps', () => {

  let React;

  let gmaps;

  const width = '100%';
  const height = '100%';
  const style = {
    backgroundColor: 'black'
  };
  const className = 'className';
  const loadingMessage = 'loadingMessage';
  const onMapCreated = jest.genMockFunction();

  beforeEach(() => {
    React = require('react/addons');
    const TestUtils = React.addons.TestUtils;
    const Utils = require('../../utils');
    Utils.addScript = () => {};
    const Gmaps = require('../gmaps');
    delete window.google;
    const Child = React.createClass({
      render() {
        return null;
      }
    });
    gmaps = TestUtils.renderIntoDocument(
      <Gmaps
        width={width}
        height={height}
        style={style}
        className={className}
        loadingMessage={loadingMessage}
        onMapCreated={onMapCreated}
        onClick={jest.genMockFunction()}>
         <Child />
      </Gmaps>
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
    const node = gmaps.getDOMNode();
    expect(node.style.width).toBe(width);
    expect(node.style.height).toBe(height);
    expect(node.style.backgroundColor).toBe(style.backgroundColor);
  });

  it('applies the class name', () => {
    expect(gmaps.getDOMNode().className).toBe(className);
  });

  it('show the loading message', () => {
    expect(gmaps.getDOMNode().textContent).toBe(loadingMessage);
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

  it('clones children with map', () => {
    React.Children.forEach(gmaps.getChildren(), (child) => {
      expect(child.props.map).toBeDefined();
    });
  });

  it('binds events', () => {
    expect(window.google.maps.event.addListener).toBeCalled();
  });

  it('unbinds events', () => {
    gmaps.componentWillUnmount();
    expect(window.google.maps.event.removeListener).toBeCalled();
  });

});
