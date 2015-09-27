import React from 'react';
import assign from 'react/lib/Object.assign';
import MapEvents from '../events/map';
import Listener from '../mixins/listener';
import Utils from '../utils';

const Gmaps = React.createClass({

  mixins: [Listener],

  map: null,

  getInitialState() {
    return {
      isMapCreated: false
    };
  },

  componentDidMount() {
    Utils.loadMaps(this.props.libraries, this.mapsCallback);
  },

  componentWillUnmount() {
    this.removeListeners();
  },

  componentWillReceiveProps(nextProps) {
    this.map.setOptions({
      ...nextProps,
      center: new google.maps.LatLng(nextProps.lat, nextProps.lng)
    });
  },

  getMap() {
    return this.map;
  },

  mapsCallback() {
    this.createMap();
    this.addListeners(this.map, MapEvents);
  },

  createMap() {
    this.map = new google.maps.Map(this.getDOMNode(), {
      ...this.props,
      center: new google.maps.LatLng(this.props.lat, this.props.lng)
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
