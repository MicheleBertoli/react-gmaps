import React from 'react';
import {InfoWindowEvents} from './events';
import Listener from './listener';

let InfoWindow = React.createClass({

  mixins: [Listener],
  infoWindow: null,

  componentDidMount() {
    this.infoWindow = new google.maps.InfoWindow({
      content: this.props.content,
      position: new google.maps.LatLng(this.props.lat, this.props.lng),
    });

    if (this.props.open) {
      this.open();
    }
    this.addListeners(this.infoWindow, InfoWindowEvents);
  },

  componentWillUnmount() {
    this.removeListeners();
  },

  open() {
    this.infoWindow.open(this.props.map);
  },

  close() {
    this.infoWindow.close();
  },

  render() {
    return null;
  }

});

export default InfoWindow;
