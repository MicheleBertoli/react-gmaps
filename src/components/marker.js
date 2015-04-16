import React from 'react';

let Marker = React.createClass({

  componentDidMount() {
    let marker = new google.maps.Marker({
      map: this.props.map,
      position: new google.maps.LatLng(this.props.lat, this.props.lng),
      icon: this.props.icon,
      draggable: this.props.draggable
    });
  },

  render() {
    return null;
  }

});

export default Marker;
