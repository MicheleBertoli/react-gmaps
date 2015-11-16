'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

exports['default'] = {

  callbacks: [],

  appended: false,

  load: function load(params, callback) {
    if (!window.google) {
      this.callbacks.push(callback);
      if (!this.appended) {
        window.mapsCallback = this.mapsCallback.bind(this);
        this.appendScript(params);
      }
    } else {
      setTimeout(callback);
    }
  },

  getSrc: function getSrc(params) {
    var src = 'https://maps.googleapis.com/maps/api/js';
    src += '?callback=mapsCallback&';
    src += _querystring2['default'].stringify(params);
    return src;
  },

  appendScript: function appendScript(params) {
    var src = this.getSrc(params);
    var script = document.createElement('script');
    script.setAttribute('src', src);
    document.head.appendChild(script);
    this.appended = true;
  },

  mapsCallback: function mapsCallback() {
    window.mapsCallback = undefined;;
    this.callbacks.forEach(function (callback) {
      return callback();
    });
    this.callbacks = [];
  }

};
module.exports = exports['default'];