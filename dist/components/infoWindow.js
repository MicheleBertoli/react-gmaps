'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _events = require('./events');

exports['default'] = (0, _entity2['default'])('InfoWindow', _events.InfoWindowEvents);
module.exports = exports['default'];