'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _listener = require('./listener');

var _listener2 = _interopRequireDefault(_listener);

exports['default'] = function (name, events) {
  return _react2['default'].createClass({

    mixins: [_listener2['default']],

    entity: null,

    componentDidMount: function componentDidMount() {
      var options = this.getOptions(this.props);
      this.entity = new google.maps[name](options);
      this.addListeners(this.entity, events);
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      var options = this.getOptions(nextProps);
      this.entity.setOptions(options);
    },

    componentWillUnmount: function componentWillUnmount() {
      this.entity.setMap(null);
      this.removeListeners();
      this.entity = null;
    },

    getOptions: function getOptions(props) {
      return _extends({}, props, {
        position: new google.maps.LatLng(props.lat, props.lng)
      });
    },

    render: function render() {
      return null;
    }

  });
};

module.exports = exports['default'];