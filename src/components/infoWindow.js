import React from 'react';
import {InfoWindowEvents} from './events';
import Listener from './listener';

const InfoWindow = React.createClass({

  mixins: [Listener],
  infoWindow: null,

  componentDidMount() {
    const options = this.getOptions(this.props);
    this.infoWindow = new google.maps.InfoWindow(options);
    this.addListeners(this.infoWindow, InfoWindowEvents);
    if (this.props.open) {
      this.open();
    }
  },

  componentWillUnmount() {
    this.removeListeners();
  },

  componentWillReceiveProps(nextProps) {
    const options = this.getOptions(nextProps);
    this.infoWindow.setOptions(options);
  },

  getOptions(props) {
    return {
      content: props.content,
      position: new google.maps.LatLng(props.lat, props.lng),
    };
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
