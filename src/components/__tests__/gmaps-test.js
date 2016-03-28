jest.dontMock('object-assign');
jest.dontMock('../../mixins/listener');
jest.dontMock('../../utils/compare-props');
jest.dontMock('../../utils/google-maps-api');
jest.dontMock('../../utils/google-maps-pool');
jest.dontMock('../gmaps');

describe('Gmaps', () => {

  const React = require('react');
  const ReactDOM = require('react-dom');
  const TestUtils = require('react-addons-test-utils');
  const GoogleMapsApi = require('../../utils/google-maps-api');
  GoogleMapsApi.appendScript = () => {};
  const Gmaps = require('../gmaps');

  beforeEach(() => {
    window.google = undefined;
    window.__gmapsPool = undefined;
  });

  describe('map not created', () => {

    it('shows the loading message', () => {
      const loadingMessage = 'loadingMessage';
      const gmaps = TestUtils.renderIntoDocument(
        <Gmaps loadingMessage={loadingMessage} />
      );
      const node = ReactDOM.findDOMNode(gmaps);
      expect(node.textContent).toBe(loadingMessage);
    });

  });

  describe('rendering', () => {

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
      const node = ReactDOM.findDOMNode(gmaps);
      expect(node.style.width).toBe(width);
      expect(node.style.height).toBe(height);
      expect(node.style.backgroundColor).toBe(style.backgroundColor);
    });

    it('applies the class name', () => {
      const node = ReactDOM.findDOMNode(gmaps);
      expect(node.className).toBe(className);
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

  describe('updating', () => {

    it('does not call `setOptions` if maps are not loaded', () => {
      const gmaps = TestUtils.renderIntoDocument(<Gmaps />);
      expect(() => {
        gmaps.componentWillReceiveProps({});
      }).not.toThrow();
    });

    it('calls `setOptions` when receive new props', () => {
      const Parent = React.createClass({
        getInitialState() {
          return {
            prop: '1'
          };
        },
        render() {
          const {prop} = this.state;
          return <Gmaps ref="gmaps" prop={prop} />;
        }
      });
      const parent = TestUtils.renderIntoDocument(<Parent />);
      window.google = {
        maps: {
          Map: () => {
            return {
              setOptions: jest.genMockFunction()
            };
          },
          LatLng: jest.genMockFunction()
        }
      };
      window.mapsCallback();
      parent.setState({
        prop: '2'
      });
      expect(parent.refs.gmaps.getMap().setOptions).toBeCalled();
    });

  });

  describe('unmounted', () => {

    beforeEach(() => {
      GoogleMapsApi.fireCallbacks = jest.genMockFunction();
    });

    it('does not fire the callback (unloaded)', () => {
      const gmaps = TestUtils.renderIntoDocument(<Gmaps />);
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(gmaps).parentNode);
      expect(GoogleMapsApi.fireCallbacks).not.toBeCalled();
    });

    it('does not fire the callback (loaded)', () => {
      window.google = {
        maps: {
          event: {
            removeListener: jest.genMockFunction()
          }
        }
      };
      const gmaps = TestUtils.renderIntoDocument(<Gmaps />);
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(gmaps).parentNode);
      expect(GoogleMapsApi.fireCallbacks).not.toBeCalled();
    });

  });

});
