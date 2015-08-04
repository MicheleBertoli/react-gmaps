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
    var options = this.getOptions(this.props);
    this.infoWindow = new google.maps.InfoWindow(options);
    this.addListeners(this.infoWindow, InfoWindowEvents);
    if (this.props.open) {
      this.open();
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.removeListeners();
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var options = this.getOptions(nextProps);
    this.infoWindow.setOptions(options);
  },

  getOptions: function getOptions(props) {
    return {
      content: props.content,
      disableAutoPan: props.disableAutoPan,
      maxWidth: props.maxWidth,
      pixelOffset: props.pixelOffset,
      position: new google.maps.LatLng(props.lat, props.lng),
      zIndex: props.zIndex
    };
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