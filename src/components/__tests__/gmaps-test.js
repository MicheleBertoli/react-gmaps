jest.dontMock('object-assign');
jest.dontMock('../../utils/compare-props');
jest.dontMock('../gmaps');

describe('Gmaps', () => {

  const React = require('react');
  const ReactDOM = require('react-dom');
  const TestUtils = require('react-addons-test-utils');
  const Gmaps = require('../gmaps');
  const GoogleMapsApi = require('../../utils/google-maps-api');
  const GoogleMapsPool = require('../../utils/google-maps-pool');

  describe('componentDidMount', () => {

    it('loads the google maps api', () => {
      const gmaps = TestUtils.renderIntoDocument(
        <Gmaps />
      );
      expect(GoogleMapsApi.load).toBeCalled();
    });

    it('stores the callback index', () => {
      GoogleMapsApi.load.mockReturnValueOnce(1);
      const gmaps = TestUtils.renderIntoDocument(
        <Gmaps />
      );
      expect(gmaps.callbackIndex).toBe(1);
    });

  });

  describe('componentWillUnmount', () => {

    let gmaps;

    beforeEach(() => {
      GoogleMapsApi.removeCallback.mockClear();
      GoogleMapsPool.free.mockClear();
      gmaps = TestUtils.renderIntoDocument(
        <Gmaps />
      );
    });

    it('removes the callback', () => {
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(gmaps).parentNode);
      expect(GoogleMapsApi.removeCallback).toBeCalled();
    });

    it('frees the map', () => {
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(gmaps).parentNode);
      expect(GoogleMapsPool.free).toBeCalled();
    });

    it('removes the listeners', () => {
      gmaps.removeListeners = jest.genMockFunction();
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(gmaps).parentNode);
      expect(gmaps.removeListeners).toBeCalled();
    });

  });

  describe('componentWillReceiveProps', () => {

    let parent;

    beforeEach(() => {
      GoogleMapsPool.update.mockClear();
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
      parent = TestUtils.renderIntoDocument(<Parent />);
    });

    it('does not update the map if it does not exist', () => {
      parent.setState({
        prop: '2'
      });
      expect(GoogleMapsPool.update).not.toBeCalled();
    });

    it('does not update the map if the props are not changed', () => {
      parent.refs.gmaps.setState({
        isMapCreated: true
      });
      parent.setState({
        prop: '1'
      });
      expect(GoogleMapsPool.update).not.toBeCalled();
    });

    it('updates the map if it exists and the props are changed', () => {
      parent.refs.gmaps.setState({
        isMapCreated: true
      });
      parent.setState({
        prop: '2'
      });
      expect(GoogleMapsPool.update).toBeCalled();
    });

  });

  describe('mapsCallback', () => {

    it('creates a new map', () => {
      const gmaps = TestUtils.renderIntoDocument(
        <Gmaps />
      );
      gmaps.mapsCallback();
      expect(GoogleMapsPool.create).toBeCalled();
    });

    it('stores the map index', () => {
      const gmaps = TestUtils.renderIntoDocument(
        <Gmaps />
      );
      GoogleMapsPool.create.mockReturnValueOnce(1);
      gmaps.mapsCallback();
      expect(gmaps.mapIndex).toBe(1);
    });

    it('updates the state', () => {
      const gmaps = TestUtils.renderIntoDocument(
        <Gmaps />
      );
      gmaps.mapsCallback();
      expect(gmaps.state.isMapCreated).toBe(true);
    });

    it('adds the listeners', () => {
      const gmaps = TestUtils.renderIntoDocument(
        <Gmaps />
      );
      gmaps.addListeners = jest.genMockFunction();
      gmaps.mapsCallback();
      expect(gmaps.addListeners).toBeCalled();
    });

    it('fires the callback', () => {
      const callback = jest.genMockFunction();
      const gmaps = TestUtils.renderIntoDocument(
        <Gmaps onMapCreated={callback} />
      );
      gmaps.mapsCallback();
      expect(callback).toBeCalled();
    });

  });

  describe('getMap', () => {

    it('returns the map', () => {
      const gmaps = TestUtils.renderIntoDocument(
        <Gmaps />
      );
      gmaps.getMap();
      expect(GoogleMapsPool.getMap).toBeCalled();
    });

  });

  describe('getChildren', () => {

    it('clones children with map', () => {
      const gmaps = TestUtils.renderIntoDocument(
        <Gmaps />
      );
      React.Children.forEach(gmaps.getChildren(), (child) => {
        expect(child.props.map).toBeDefined();
      });
    });

  });

  describe('render', () => {

    it('sets the width and the height', () => {
      const width = '1px';
      const height = '2px';
      const gmaps = TestUtils.renderIntoDocument(
        <Gmaps width={width} height={height} />
      );
      const node = ReactDOM.findDOMNode(gmaps);
      expect(node.style.width).toBe(width);
      expect(node.style.height).toBe(height);
    });

    it('sets the class name', () => {
      const className = 'className';
      const gmaps = TestUtils.renderIntoDocument(
        <Gmaps className={className} />
      );
      const node = ReactDOM.findDOMNode(gmaps);
      expect(node.className).toBe(className);
    });

    it('shows the loading message', () => {
      const loadingMessage = 'loadingMessage';
      const gmaps = TestUtils.renderIntoDocument(
        <Gmaps loadingMessage={loadingMessage} />
      );
      const node = ReactDOM.findDOMNode(gmaps);
      expect(node.textContent).toBe(loadingMessage);
    });

  });

});
