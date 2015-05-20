import React from 'react';
import {MarkerEvents} from './events';
import Listener from './listener';

let Marker = React.createClass({

  mixins: [Listener],

  componentDidMount() {
    let marker = new google.maps.Marker({
      map: this.props.map,
      position: new google.maps.LatLng(this.props.lat, this.props.lng),
      icon: this.props.icon
    });
    this.addListeners(marker, MarkerEvents);
  },

  componentWillUnmount() {
    this.removeListeners();
  },

  render() {
    return null;
  }

});

export default Marker;
