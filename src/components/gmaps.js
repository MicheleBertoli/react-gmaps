import React from 'react';
import cloneWithProps from 'react/lib/cloneWithProps';
import assign from 'react/lib/Object.assign';
import {MapEvents, MarkerEvents} from './events';
import Listener from './listener';
import Marker from './marker';

let Gmaps = React.createClass({

  mixins: [Listener],

  map: null,

  componentDidMount() {
    this.loadMaps();
  },

  componentWillUnmount() {
    this.removeListeners();
  },

  getMap() {
    return this.map;
  },

  loadMaps() {
    if (!window.google) {
      window.mapsCallback = this.mapsCallback;
      let src = `https://maps.googleapis.com/maps/api/js?callback=mapsCallback&libraries=${this.props.libraries || ''}`;
      let script = document.createElement('script');
      script.setAttribute('src', src);
      document.head.appendChild(script);
    } else {
      this.mapsCallback();
    }
  },

  mapsCallback() {
    delete window.mapsCallback;
    this.createMap();
    this.createChildren();
    this.addListeners(this.map, MapEvents);
  },

  createMap() {
    this.map = new google.maps.Map(this.getDOMNode(), {
      center: new google.maps.LatLng(this.props.lat, this.props.lng),
      zoom: this.props.zoom
    });
    if (this.props.onMapCreated) {
      this.props.onMapCreated();
    }
  },

  createChildren() {
    let children = React.Children.map(this.props.children, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }
      return cloneWithProps(child, {
        map: this.map
      });
    });
    this.setState({
      children: children
    });
  },

  render() {
    let style = assign({
      width: this.props.width,
      height: this.props.height
    }, this.props.style);
    let markers = this.props.markers || [];
    let map = this.getMap();

    return (
        <div style={style} className={this.props.className}>
          Loading...
          {this.state ? this.state.children : null}

          {markers.map(function (markerProps) {
            return <Marker map={map} {...markerProps} />
          })}
        </div>
    );
  },

});

export default Gmaps;
