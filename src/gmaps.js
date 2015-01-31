var React = require('react');

var Gmaps = React.createClass({

  componentDidMount() {
    window.mapsCallback = this.mapsCallback;
    var script = document.createElement('script');
    script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?callback=mapsCallback');
    document.head.appendChild(script);
  },
  
  render() {
    return <div>Loading...</div>;
  },
  
  mapsCallback() {
    var mapOptions = {
      center: {
        lat: this.props.lat,
        lng: this.props.lng
      },
      zoom: this.props.zoom
    };
    var map = new google.maps.Map(this.getDOMNode(), mapOptions);
  }
  
});

module.exports = Gmaps;
