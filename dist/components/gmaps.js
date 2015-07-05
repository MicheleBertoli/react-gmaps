"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var cloneWithProps = _interopRequire(require("react/lib/cloneWithProps"));

var assign = _interopRequire(require("react/lib/Object.assign"));

var MapEvents = require("./events").MapEvents;

var Listener = _interopRequire(require("./listener"));

var Gmaps = React.createClass({
  displayName: "Gmaps",

  mixins: [Listener],

  map: null,

  componentDidMount: function componentDidMount() {
    this.loadMaps();
  },

  componentWillUnmount: function componentWillUnmount() {
    this.removeListeners();
  },

  getMap: function getMap() {
    return this.map;
  },

  loadMaps: function loadMaps() {
    if (!window.google) {
      window.mapsCallback = this.mapsCallback;
      var src = "https://maps.googleapis.com/maps/api/js?callback=mapsCallback&libraries=" + (this.props.libraries || "");
      var script = document.createElement("script");
      script.setAttribute("src", src);
      document.head.appendChild(script);
    } else {
      setTimeout(this.mapsCallback);
    }
  },

  mapsCallback: function mapsCallback() {
    delete window.mapsCallback;
    this.createMap();
    this.createChildren();
    this.addListeners(this.map, MapEvents);
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
  } });

module.exports = Gmaps;