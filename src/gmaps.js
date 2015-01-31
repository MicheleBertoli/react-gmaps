var React = require('react'),
  Events = require('../src/events');

var map = null, 
  events = [];

var Gmaps = React.createClass({

  componentDidMount() {
    this.loadMaps();
  },

  componentWillUnmount() {
    this.unbindEvents();
  },
  
  render() {
    var style = {
      width: this.props.width,
      height: this.props.height
    };
    return <div style={style}>Loading...</div>;
  },

  loadMaps() {
    window.mapsCallback = this.mapsCallback;
    var script = document.createElement('script');
    script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?callback=mapsCallback');
    document.head.appendChild(script);
  },
  
  mapsCallback() {
    this.createMap();
    this.bindEvents();
  },

  createMap() {
    var mapOptions = {
      center: {
        lat: this.props.lat,
        lng: this.props.lng
      },
      zoom: this.props.zoom
    };
    map = new google.maps.Map(this.getDOMNode(), mapOptions);
  },

  bindEvents() {
    for (prop in this.props) {
      if (this.props.hasOwnProperty(prop) && Events[prop]) {
        var e = google.maps.event.addListener(map, Events[prop], this.props[prop]);
        events.push(e);
      }
    }
  },

  unbindEvents() {
    events.forEach(function(e) {
      google.maps.event.removeListener(e);
    });
  }

});

module.exports = Gmaps;
