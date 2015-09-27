'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {

  callbacks: [],

  added: false,

  loadMaps: function loadMaps(libraries, callback) {
    if (!window.google) {
      this.callbacks.push(callback);
      if (!this.added) {
        window.mapsCallback = this.mapsCallback.bind(this);
        this.addScript(libraries);
      }
    } else {
      setTimeout(callback);
    }
  },

  addScript: function addScript(libraries) {
    var src = 'https://maps.googleapis.com/maps/api/js';
    src += '?callback=mapsCallback';
    src += '&libraries=' + (libraries || '');
    var script = document.createElement('script');
    script.setAttribute('src', src);
    document.head.appendChild(script);
    this.added = true;
  },

  mapsCallback: function mapsCallback() {
    delete window.mapsCallback;
    this.callbacks.forEach(function (callback) {
      return callback();
    });
    this.callbacks = [];
  }

};
module.exports = exports['default'];