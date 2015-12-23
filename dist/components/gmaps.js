'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _eventsMap = require('../events/map');

var _eventsMap2 = _interopRequireDefault(_eventsMap);

var _mixinsListener = require('../mixins/listener');

var _mixinsListener2 = _interopRequireDefault(_mixinsListener);

var _utilsGoogleMaps = require('../utils/google-maps');

var _utilsGoogleMaps2 = _interopRequireDefault(_utilsGoogleMaps);

var _utilsCompareProps = require('../utils/compare-props');

var _utilsCompareProps2 = _interopRequireDefault(_utilsCompareProps);

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
    this.setState({
      callbackIndex: _utilsGoogleMaps2['default'].load(this.props.params, this.mapsCallback)
    });
  },

  componentWillUnmount: function componentWillUnmount() {
    _utilsGoogleMaps2['default'].removeCallback(this.state.callbackIndex);
    this.removeListeners();
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.map && !(0, _utilsCompareProps2['default'])(this.props, nextProps)) {
      this.map.setOptions(_extends({}, nextProps, {
        center: new google.maps.LatLng(nextProps.lat, nextProps.lng)
      }));
    }
  },

  getMap: function getMap() {
    return this.map;
  },

  mapsCallback: function mapsCallback() {
    this.createMap();
    this.addListeners(this.map, _eventsMap2['default']);
  },

  createMap: function createMap() {
    var node = _reactDom2['default'].findDOMNode(this);
    this.map = new google.maps.Map(node, _extends({}, this.props, {
      center: new google.maps.LatLng(this.props.lat, this.props.lng)
    }));
    this.setState({
      isMapCreated: true
    });
    if (this.props.onMapCreated) {
      this.props.onMapCreated(this.map);
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
    var style = (0, _objectAssign2['default'])({
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