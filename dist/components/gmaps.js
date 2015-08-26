'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLibObjectAssign = require('react/lib/Object.assign');

var _reactLibObjectAssign2 = _interopRequireDefault(_reactLibObjectAssign);

var _eventsMap = require('../events/map');

var _eventsMap2 = _interopRequireDefault(_eventsMap);

var _mixinsListener = require('../mixins/listener');

var _mixinsListener2 = _interopRequireDefault(_mixinsListener);

var Gmaps = _react2['default'].createClass({
  displayName: 'Gmaps',

  mixins: [_mixinsListener2['default']],

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
    this.addListeners(this.map, _eventsMap2['default']);
  },

  createMap: function createMap() {
    this.map = new google.maps.Map(this.getDOMNode(), _extends({}, this.props, {
      center: new google.maps.LatLng(this.props.lat, this.props.lng)
    }));
    this.setState({
      isMapCreated: true
    });
    if (this.props.onMapCreated) {
      this.props.onMapCreated(this.map, google.maps);
    }
  },

  getChildren: function getChildren() {
    var _this = this;

    return _react2['default'].Children.map(this.props.children, function (child) {
      if (!_react2['default'].isValidElement(child)) {
        return child;
      }
      return _react2['default'].cloneElement(child, {
        ref: child.ref,
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
      this.props.loadingMessage || 'Loading...',
      this.state.isMapCreated ? this.getChildren() : null
    );
  }

});

exports['default'] = Gmaps;
module.exports = exports['default'];