'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _eventsPolyline = require('../events/polyline');

var _eventsPolyline2 = _interopRequireDefault(_eventsPolyline);

exports['default'] = (0, _entity2['default'])('Polyline', 'path', _eventsPolyline2['default']);
module.exports = exports['default'];