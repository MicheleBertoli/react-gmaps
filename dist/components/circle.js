'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _eventsCircle = require('../events/circle');

var _eventsCircle2 = _interopRequireDefault(_eventsCircle);

exports['default'] = (0, _entity2['default'])('Circle', 'center', _eventsCircle2['default']);
module.exports = exports['default'];