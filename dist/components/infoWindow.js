"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var InfoWindowEvents = require("./events").InfoWindowEvents;

var Listener = _interopRequire(require("./listener"));

var InfoWindow = React.createClass({
  displayName: "InfoWindow",

  mixins: [Listener],
  infoWindow: null,

  componentDidMount: function componentDidMount() {
    this.infoWindow = new google.maps.InfoWindow({
      content: this.props.content,
      position: new google.maps.LatLng(this.props.lat, this.props.lng) });

    if (this.props.open === true) {
      this.open();
    }
    this.addListeners(this.infoWindow, InfoWindowEvents);
  },

  componentWillUnmount: function componentWillUnmount() {
    this.removeListeners();
  },

  open: function open() {
    this.infoWindow.open(this.props.map);
  },

  close: function close() {
    this.infoWindow.close();
  },

  render: function render() {
    return null;
  }

});

module.exports = InfoWindow;