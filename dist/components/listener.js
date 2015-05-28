"use strict";

var Listener = {

  listeners: [],

  addListeners: function addListeners(entity, events) {
    for (var prop in this.props) {
      if (this.props.hasOwnProperty(prop) && events[prop]) {
        var listener = google.maps.event.addListener(entity, events[prop], this.props[prop]);
        this.listeners.push(listener);
      }
    }
  },

  removeListeners: function removeListeners() {
    this.listeners.forEach(function (listener) {
      google.maps.event.removeListener(listener);
    });
  }

};

module.exports = Listener;