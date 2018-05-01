'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _entity2 = require('./entity2');

var _entity22 = _interopRequireDefault(_entity2);

var _eventsCircle = require('../events/circle');

var _eventsCircle2 = _interopRequireDefault(_eventsCircle);

exports['default'] = (0, _entity22['default'])('Circle', 'center', _eventsCircle2['default']);
module.exports = exports['default'];