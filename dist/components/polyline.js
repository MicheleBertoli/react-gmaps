'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _polygonentity = require('./polygonentity');

var _polygonentity2 = _interopRequireDefault(_polygonentity);

var _eventsPolyline = require('../events/polyline');

var _eventsPolyline2 = _interopRequireDefault(_eventsPolyline);

exports['default'] = (0, _polygonentity2['default'])('Polyline', 'paths', _eventsPolyline2['default']);
module.exports = exports['default'];