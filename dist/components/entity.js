'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// import createReactClass from 'create-react-class';
// import Listener from '../mixins/listener';

var _utilsCompareProps = require('../utils/compare-props');

var _utilsCompareProps2 = _interopRequireDefault(_utilsCompareProps);

// refactored to React class, then to React +16.3

exports['default'] = function (name, latLngProp, events) {
	return (function (_React$Component) {
		_inherits(CreateEntity, _React$Component);

		function CreateEntity() {
			_classCallCheck(this, CreateEntity);

			_get(Object.getPrototypeOf(CreateEntity.prototype), 'constructor', this).apply(this, arguments);

			this.state = {
				entity: null
			};
		}

		_createClass(CreateEntity, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var options = this.getOptions(this.props);
				console.log('options', options);
				this.setState({ entity: new google.maps[name](options) });
				console.log('this.state.entity', this.state.entity);
				this.addListeners(this.state.entity, events);
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if (!(0, _utilsCompareProps2['default'])(this.props, nextProps)) {
					var options = this.getOptions(nextProps);
					this.state.entity.setOptions(options);
				}
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.state.entity.setMap(null);
				this.removeListeners();
				this.setState({ entity: null });
			}
		}, {
			key: 'getOptions',
			value: function getOptions(props) {
				return _extends({}, props, _defineProperty({}, latLngProp, this.switchPaths(name, props)));
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
			key: 'getEntity',
			value: function getEntity() {
				return this.state.entity;
			}
		}, {
			key: 'switchPaths',
			value: function switchPaths(name, props) {
				switch (name) {
					case 'Polyline':
						return props.path;
						break;
					case 'Polygon':
						return props.paths;
						break;
					default:
						return new google.maps.LatLng(props.lat, props.lng);
						break;
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
				return null;
			}
		}]);

		return CreateEntity;
	})(_react2['default'].Component);
};

module.exports = exports['default'];