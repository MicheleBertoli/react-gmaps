var React = require('react'),
  cloneWithProps = require('react/lib/cloneWithProps'),
  assign = require('react/lib/Object.assign'),
  Events = require('./events');

var Gmaps = React.createClass({displayName: "Gmaps",

  map: null,
  events: [],

  getMap:function() {
    return this.map;
  },

  componentDidMount:function() {
    this.loadMaps();
  },

  componentWillUnmount:function() {
    this.unbindEvents();
  },
  
  render:function() {
    var style = assign({
      width: this.props.width,
      height: this.props.height
    }, this.props.style);
    return (
      React.createElement("div", {style: style}, 
        "Loading...", 
        this.state ? this.state.children : null
      )
    );
  },

  loadMaps:function() {
    if (!window.google) {
      window.mapsCallback = this.mapsCallback;
      var src = ("https://maps.googleapis.com/maps/api/js?callback=mapsCallback&libraries=" + (this.props.libraries || ''));
      var script = document.createElement('script');
      script.setAttribute('src', src);
      document.head.appendChild(script);
    } else {
      this.mapsCallback();
    }
  },
  
  mapsCallback:function() {
    delete window.mapsCallback;
    this.createMap();
    this.createChildren();
    this.bindEvents();
  },

  createMap:function() {
    this.map = new google.maps.Map(this.getDOMNode(), {
      center: new google.maps.LatLng(this.props.lat, this.props.lng),
      zoom: this.props.zoom
    });
    if (this.props.onMapCreated) {
      this.props.onMapCreated();
    }
  },

  createChildren:function() {
    var children = React.Children.map(this.props.children, function(child)  {
      if (!React.isValidElement(child)) {
        return child;
      }
      return cloneWithProps(child, {
        map: this.map
      });
    }.bind(this));
    this.setState({
      children: children
    });
  },

  bindEvents:function() {
    for (var prop in this.props) {
      if (this.props.hasOwnProperty(prop) && Events[prop]) {
        var e = google.maps.event.addListener(this.map, Events[prop], this.props[prop]);
        this.events.push(e);
      }
    }
  },

  unbindEvents:function() {
    this.events.forEach(function(e)  {
      google.maps.event.removeListener(e);
    });
  }

});

module.exports = Gmaps;
