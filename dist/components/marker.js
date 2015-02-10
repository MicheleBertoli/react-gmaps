var React = require('react');

var Marker = React.createClass({displayName: "Marker",

  componentDidMount:function() {
    var marker = new google.maps.Marker({
      map: this.props.map,
      position: new google.maps.LatLng(this.props.lat, this.props.lng),
      icon: this.props.icon
    });
  },

  render:function() {
    return null;
  }

});

module.exports = Marker;
