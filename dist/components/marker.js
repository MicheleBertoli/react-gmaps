"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var Marker = React.createClass({
  displayName: "Marker",

  componentDidMount: function componentDidMount() {
    var marker = new google.maps.Marker({
      map: this.props.map,
      position: new google.maps.LatLng(this.props.lat, this.props.lng),
      icon: this.props.icon,
      draggable: this.props.draggable
    });
  },

  render: function render() {
    return null;
  }

});

module.exports = Marker;