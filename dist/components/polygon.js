'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _polygonentity = require('./polygonentity');

var _polygonentity2 = _interopRequireDefault(_polygonentity);

var _eventsPolygon = require('../events/polygon');

var _eventsPolygon2 = _interopRequireDefault(_eventsPolygon);

exports['default'] = (0, _polygonentity2['default'])('Polygon', 'path', _eventsPolygon2['default']);
module.exports = exports['default'];