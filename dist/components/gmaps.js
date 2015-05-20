"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var cloneWithProps = _interopRequire(require("react/lib/cloneWithProps"));

var assign = _interopRequire(require("react/lib/Object.assign"));

var MapEvents = require("./events").MapEvents;

var Gmaps = React.createClass({
  displayName: "Gmaps",

  map: null,
  events: [],

  getMap: function getMap() {
    return this.map;
  },

  componentDidMount: function componentDidMount() {
    this.loadMaps();
  },

  componentWillUnmount: function componentWillUnmount() {
    this.unbindEvents();
  },

  render: function render() {
    var style = assign({
      width: this.props.width,
      height: this.props.height
    }, this.props.style);
    return React.createElement(
      "div",
      { style: style, className: this.props.className },
      "Loading...",
      this.state ? this.state.children : null
    );
  },

  loadMaps: function loadMaps() {
    if (!window.google) {
      window.mapsCallback = this.mapsCallback;
      var src = "https://maps.googleapis.com/maps/api/js?callback=mapsCallback&libraries=" + (this.props.libraries || "");
      var script = document.createElement("script");
      script.setAttribute("src", src);
      document.head.appendChild(script);
    } else {
      this.mapsCallback();
    }
  },

  mapsCallback: function mapsCallback() {
    delete window.mapsCallback;
    this.createMap();
    this.createChildren();
    this.bindEvents();
  },

  createMap: function createMap() {
    this.map = new google.maps.Map(this.getDOMNode(), {
      center: new google.maps.LatLng(this.props.lat, this.props.lng),
      zoom: this.props.zoom
    });
    if (this.props.onMapCreated) {
      this.props.onMapCreated();
    }
  },

  createChildren: function createChildren() {
    var _this = this;

    var children = React.Children.map(this.props.children, function (child) {
      if (!React.isValidElement(child)) {
        return child;
      }
      return cloneWithProps(child, {
        map: _this.map
      });
    });
    this.setState({
      children: children
    });
  },

  bindEvents: function bindEvents() {
    for (var prop in this.props) {
      if (this.props.hasOwnProperty(prop) && MapEvents[prop]) {
        var e = google.maps.event.addListener(this.map, MapEvents[prop], this.props[prop]);
        this.events.push(e);
      }
    }
  },

  unbindEvents: function unbindEvents() {
    this.events.forEach(function (e) {
      google.maps.event.removeListener(e);
    });
  }

});

module.exports = Gmaps;