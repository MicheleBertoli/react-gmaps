"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));
var Events = _interopRequire(require("./events"));

var Marker = React.createClass({
  displayName: "Marker",
  marker: null,
  events: [],

  componentDidMount: function componentDidMount() {
    this.marker = new google.maps.Marker({
      map: this.props.map,
      position: new google.maps.LatLng(this.props.lat, this.props.lng),
      icon: this.props.icon,
      draggable: this.props.draggable
    });

    this.bindEvents();
  },

  componentWillUnmount: function componentWillUnmount() {
    this.unbindEvents();
  },

  bindEvents: function bindEvents() {
    for (var prop in this.props) {
      if (this.props.hasOwnProperty(prop) && Events[prop]) {
        var e = google.maps.event.addListener(this.marker, Events[prop], this.props[prop]);
        this.events.push(e);
      }
    }
  },

  unbindEvents: function unbindEvents() {
    this.events.forEach(function (e) {
      google.maps.event.removeListener(e);
    });
  },

  render: function render() {
    return null;
  }

});

module.exports = Marker;