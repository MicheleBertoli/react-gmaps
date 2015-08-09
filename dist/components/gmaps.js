'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLibCloneWithProps = require('react/lib/cloneWithProps');

var _reactLibCloneWithProps2 = _interopRequireDefault(_reactLibCloneWithProps);

var _reactLibObjectAssign = require('react/lib/Object.assign');

var _reactLibObjectAssign2 = _interopRequireDefault(_reactLibObjectAssign);

var _events = require('./events');

var _listener = require('./listener');

var _listener2 = _interopRequireDefault(_listener);

var Gmaps = _react2['default'].createClass({
  displayName: 'Gmaps',

  mixins: [_listener2['default']],

  map: null,

  getInitialState: function getInitialState() {
    return {
      isMapCreated: false
    };
  },

  componentDidMount: function componentDidMount() {
    this.loadMaps();
  },

  componentWillUnmount: function componentWillUnmount() {
    this.removeListeners();
  },

  getMap: function getMap() {
    return this.map;
  },

  loadMaps: function loadMaps() {
    if (!window.google) {
      window.mapsCallback = this.mapsCallback;
      var src = 'https://maps.googleapis.com/maps/api/js';
      src += '?callback=mapsCallback';
      src += '&libraries=' + (this.props.libraries || '');
      var script = document.createElement('script');
      script.setAttribute('src', src);
      document.head.appendChild(script);
    } else {
      setTimeout(this.mapsCallback);
    }
  },

  mapsCallback: function mapsCallback() {
    delete window.mapsCallback;
    this.createMap();
    this.addListeners(this.map, _events.MapEvents);
  },

  createMap: function createMap() {
    this.map = new google.maps.Map(this.getDOMNode(), {
      center: new google.maps.LatLng(this.props.lat, this.props.lng),
      zoom: this.props.zoom
    });
    this.setState({
      isMapCreated: true
    });
    if (this.props.onMapCreated) {
      this.props.onMapCreated();
    }
  },

  getChildren: function getChildren() {
    var _this = this;

    return _react2['default'].Children.map(this.props.children, function (child) {
      if (!_react2['default'].isValidElement(child)) {
        return child;
      }
      return (0, _reactLibCloneWithProps2['default'])(child, {
        map: _this.map
      });
    });
  },

  render: function render() {
    var style = (0, _reactLibObjectAssign2['default'])({
      width: this.props.width,
      height: this.props.height
    }, this.props.style);
    return _react2['default'].createElement(
      'div',
      { style: style, className: this.props.className },
      'Loading...',
      this.state.isMapCreated ? this.getChildren() : null
    );
  }

});

exports['default'] = Gmaps;
module.exports = exports['default'];