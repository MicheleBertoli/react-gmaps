"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var MarkerEvents = require("./events").MarkerEvents;

var Listener = _interopRequire(require("./listener"));

var Marker = React.createClass({
  displayName: "Marker",

  mixins: [Listener],

  componentDidMount: function componentDidMount() {
    var marker = new google.maps.Marker({
      map: this.props.map,
      position: new google.maps.LatLng(this.props.lat, this.props.lng),
      icon: this.props.icon,
      draggable: this.props.draggable
    });
    this.addListeners(marker, MarkerEvents);
  },

  componentWillUnmount: function componentWillUnmount() {
    this.removeListeners();
  },

  render: function render() {
    return null;
  }

});

module.exports = Marker;