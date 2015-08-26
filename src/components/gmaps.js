import React from 'react';
import assign from 'react/lib/Object.assign';
import MapEvents from '../events/map';
import Listener from '../mixins/listener';

const Gmaps = React.createClass({

  mixins: [Listener],

  map: null,

  getInitialState() {
    return {
      isMapCreated: false
    };
  },

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
      let src = 'https://maps.googleapis.com/maps/api/js';
      src += '?callback=mapsCallback';
      src += `&libraries=${this.props.libraries || ''}`;
      const script = document.createElement('script');
      script.setAttribute('src', src);
      document.head.appendChild(script);
    } else {
      setTimeout(this.mapsCallback);
    }
  },

  mapsCallback() {
    delete window.mapsCallback;
    this.createMap();
    this.addListeners(this.map, MapEvents);
  },

  createMap() {
    this.map = new google.maps.Map(this.getDOMNode(), {
      center: new google.maps.LatLng(this.props.lat, this.props.lng),
      zoom: this.props.zoom
    });
    this.setState({
      isMapCreated: true
    });
    if (this.props.onMapCreated) {
      this.props.onMapCreated(this.map, google.maps);
    }
  },

  getChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }
      return React.cloneElement(child, {
        ref: child.ref,
        map: this.map
      });
    });
  },

  render() {
    const style = assign({
      width: this.props.width,
      height: this.props.height
    }, this.props.style);
    return (
      <div style={style} className={this.props.className}>
        {this.props.loadingMessage || 'Loading...'}
        {this.state.isMapCreated ? this.getChildren() : null}
      </div>
    );
  },

});

export default Gmaps;
