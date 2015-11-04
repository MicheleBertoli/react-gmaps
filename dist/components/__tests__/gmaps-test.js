'use strict';

jest.dontMock('../../mixins/listener');
jest.dontMock('../../utils');
jest.dontMock('../gmaps');

describe('Gmaps', function () {

  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var Utils = require('../../utils');
  Utils.addScript = function () {};
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
      var node = gmaps.getDOMNode();
      expect(node.style.width).toBe(width);
      expect(node.style.height).toBe(height);
      expect(node.style.backgroundColor).toBe(style.backgroundColor);
    });

    it('applies the class name', function () {
      expect(gmaps.getDOMNode().className).toBe(className);
    });

    it('show the loading message', function () {
      expect(gmaps.getDOMNode().textContent).toBe(loadingMessage);
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
            content: '1'
          };
        },
        render: function render() {
          return React.createElement(Gmaps, { ref: 'gmaps' });
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
        content: '2'
      });
      expect(parent.refs.gmaps.getMap().setOptions).toBeCalled();
    });
  });
});