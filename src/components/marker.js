import React from 'react';
import {MarkerEvents} from './events';
import Listener from './listener';

const Marker = React.createClass({

  mixins: [Listener],

  componentDidMount() {
    const marker = new google.maps.Marker({
      map: this.props.map,
      position: new google.maps.LatLng(this.props.lat, this.props.lng),
      icon: this.props.icon,
      draggable: this.props.draggable
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
