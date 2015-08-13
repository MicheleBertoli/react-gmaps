'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _eventsInfoWindow = require('../events/info-window');

var _eventsInfoWindow2 = _interopRequireDefault(_eventsInfoWindow);

exports['default'] = (0, _entity2['default'])('InfoWindow', 'position', _eventsInfoWindow2['default']);
module.exports = exports['default'];