'use strict';

jest.dontMock('object-assign');
jest.dontMock('../../mixins/listener');
jest.dontMock('../../utils/google-maps');
jest.dontMock('../../utils/compare-props');
jest.dontMock('../gmaps');

describe('Gmaps', function () {

  var React = require('react');
  var ReactDOM = require('react-dom');
  var TestUtils = require('react-addons-test-utils');
  var GoogleMaps = require('../../utils/google-maps');
  GoogleMaps.appendScript = function () {};
  var Gmaps = require('../gmaps');

  beforeEach(function () {
    window.google = undefined;
  });

  describe('rendering', function () {

    var gmaps = undefined;
    var width = '100%';
    var height = '100%';
    var style = {
      backgroundColor: 'black'
    };
    var className = 'className';
    var loadingMessage = 'loadingMessage';
    var onMapCreated = jest.genMockFunction();

    beforeEach(function () {
      var Child = React.createClass({
        displayName: 'Child',

        render: function render() {
          return null;
        }
      });
      gmaps = TestUtils.renderIntoDocument(React.createElement(
        Gmaps,
        {
          width: width,
          height: height,
          style: style,
          className: className,
          loadingMessage: loadingMessage,
          onMapCreated: onMapCreated,
          onClick: jest.genMockFunction() },
        React.createElement(Child, null)
      ));
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

    it('applies the style', function () {
      var node = ReactDOM.findDOMNode(gmaps);
      expect(node.style.width).toBe(width);
      expect(node.style.height).toBe(height);
      expect(node.style.backgroundColor).toBe(style.backgroundColor);
    });

    it('applies the class name', function () {
      var node = ReactDOM.findDOMNode(gmaps);
      expect(node.className).toBe(className);
    });

    it('show the loading message', function () {
      var node = ReactDOM.findDOMNode(gmaps);
      expect(node.textContent).toBe(loadingMessage);
    });

    it('loads maps once', function () {
      gmaps.componentDidMount();
      expect(window.mapsCallback).not.toBeDefined();
    });

    it('creates a map', function () {
      expect(gmaps.getMap()).not.toBe(null);
    });

    it('calls `onMapCreated`', function () {
      expect(onMapCreated).toBeCalled();
    });

    it('clones children with map', function () {
      React.Children.forEach(gmaps.getChildren(), function (child) {
        expect(child.props.map).toBeDefined();
      });
    });

    it('binds events', function () {
      expect(window.google.maps.event.addListener).toBeCalled();
    });

    it('unbinds events', function () {
      gmaps.componentWillUnmount();
      expect(window.google.maps.event.removeListener).toBeCalled();
    });
  });

  describe('updating', function () {

    it('does not call `setOptions` if maps are not loaded', function () {
      var gmaps = TestUtils.renderIntoDocument(React.createElement(Gmaps, null));
      expect(function () {
        gmaps.componentWillReceiveProps({});
      }).not.toThrow();
    });

    it('calls `setOptions` when receive new props', function () {
      var Parent = React.createClass({
        displayName: 'Parent',

        getInitialState: function getInitialState() {
          return {
            prop: '1'
          };
        },
        render: function render() {
          var prop = this.state.prop;

          return React.createElement(Gmaps, { ref: 'gmaps', prop: prop });
        }
      });
      var parent = TestUtils.renderIntoDocument(React.createElement(Parent, null));
      window.google = {
        maps: {
          Map: function Map() {
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

  describe('unmounted', function () {

    beforeEach(function () {
      GoogleMaps.fireCallbacks = jest.genMockFunction();
    });

    it('does not fire the callback (unloaded)', function () {
      var gmaps = TestUtils.renderIntoDocument(React.createElement(Gmaps, null));
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(gmaps).parentNode);
      expect(GoogleMaps.fireCallbacks).not.toBeCalled();
    });

    it('does not fire the callback (loaded)', function () {
      window.google = {
        maps: {
          event: {
            removeListener: jest.genMockFunction()
          }
        }
      };
      var gmaps = TestUtils.renderIntoDocument(React.createElement(Gmaps, null));
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(gmaps).parentNode);
      expect(GoogleMaps.fireCallbacks).not.toBeCalled();
    });
  });
});