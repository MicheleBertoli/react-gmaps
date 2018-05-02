'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

// import createReactClass from 'create-react-class';

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _eventsMap = require('../events/map');

var _eventsMap2 = _interopRequireDefault(_eventsMap);

// import Listener from '../mixins/listener';

var _utilsGoogleMaps = require('../utils/google-maps');

var _utilsGoogleMaps2 = _interopRequireDefault(_utilsGoogleMaps);

var _utilsCompareProps = require('../utils/compare-props');

var _utilsCompareProps2 = _interopRequireDefault(_utilsCompareProps);

// refactored to React class, then to React +16.3

var Gmaps = (function (_React$Component) {
	_inherits(Gmaps, _React$Component);

	function Gmaps() {
		var _this = this;

		_classCallCheck(this, Gmaps);

		_get(Object.getPrototypeOf(Gmaps.prototype), 'constructor', this).apply(this, arguments);

		this.state = {
			isMapCreated: false
		};

		this.mapsCallback = function () {
			_this.createMap();
			_this.addListeners(_this.state.map, _eventsMap2['default']);
		};

		this.createMap = function () {
			var node = _reactDom2['default'].findDOMNode(_this);
			var myMap = new google.maps.Map(node, _extends({}, _this.props, {
				center: new google.maps.LatLng(_this.props.lat, _this.props.lng)
			}));
			_this.setState({ map: myMap, isMapCreated: true });
			if (_this.props.onMapCreated) {
				_this.props.onMapCreated(_this.state.map);
			}
		};
	}

	_createClass(Gmaps, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.setState({
				callbackIndex: _utilsGoogleMaps2['default'].load(this.props.params, this.mapsCallback)
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			_utilsGoogleMaps2['default'].removeCallback(this.state.callbackIndex);
			this.removeListeners();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.state.map && !(0, _utilsCompareProps2['default'])(this.props, nextProps)) {
				this.state.map.setOptions(_extends({}, nextProps, {
					center: new google.maps.LatLng(nextProps.lat, nextProps.lng)
				}));
			}
		}
	}, {
		key: 'getMap',
		value: function getMap() {
			// is this used anywhere else...?
			return this.state.map;
		}
	}, {
		key: 'getChildren',
		value: function getChildren() {
			var _this2 = this;

			return _react2['default'].Children.map(this.props.children, function (child) {
				if (!_react2['default'].isValidElement(child)) {
					return child;
				}
				return _react2['default'].cloneElement(child, {
					ref: child.ref,
					map: _this2.state.map
				});
			});
		}
	}, {
		key: 'addListeners',
		value: function addListeners(entity, events) {
			for (var prop in this.props) {
				if (this.props.hasOwnProperty(prop) && events[prop]) {
					var addListener = google.maps.event.addListener;
					var listener = addListener(entity, events[prop], this.props[prop]);
					if (!this.listeners) {
						this.listeners = [];
					}
					this.listeners.push(listener);
				}
			}
		}
	}, {
		key: 'removeListeners',
		value: function removeListeners() {
			if (window.google && this.listeners) {
				this.listeners.forEach(function (listener) {
					google.maps.event.removeListener(listener);
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
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
	}]);

	return Gmaps;
})(_react2['default'].Component);

exports['default'] = Gmaps;
module.exports = exports['default'];