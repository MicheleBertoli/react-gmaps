var React = require('react'),
  cloneWithProps = require('react/lib/cloneWithProps'),
  Events = require('../src/events');

var Gmaps = React.createClass({

  map: null,
  events: [],

  getMap() {
    return this.map;
  },

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
    return (
      <div style={style}>
        Loading...
        {this.state ? this.state.children : null}
      </div>
    );
  },

  loadMaps() {
    window.mapsCallback = this.mapsCallback;
    var script = document.createElement('script');
    script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?callback=mapsCallback');
    document.head.appendChild(script);
  },
  
  mapsCallback() {
    this.createMap();
    this.createMarkers();
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
    this.map = new google.maps.Map(this.getDOMNode(), mapOptions);
  },

  createMarkers() {
    var children = React.Children.map(this.props.children, (child) => {
      return cloneWithProps(child, {
        map: this.map
      })
    });
    this.setState({
      children: children
    });
  },

  bindEvents() {
    for (prop in this.props) {
      if (this.props.hasOwnProperty(prop) && Events[prop]) {
        var e = google.maps.event.addListener(this.map, Events[prop], this.props[prop]);
        this.events.push(e);
      }
    }
  },

  unbindEvents() {
    this.events.forEach((e) => {
      google.maps.event.removeListener(e);
    });
  }

});

module.exports = Gmaps;
