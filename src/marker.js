var React = require('react');

var Marker = React.createClass({

  render() {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.props.lat, this.props.lng),
      map: this.props.map,
      title: this.props.title
    });
    return null;
  }

});

module.exports = Marker;
