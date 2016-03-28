import React from 'react';
import ReactDOM from 'react-dom';
import objectAssign from 'object-assign';
import MapEvents from '../events/map';
import Listener from '../mixins/listener';
import GoogleMaps from '../utils/google-maps';
import compareProps from '../utils/compare-props';
import GoogleMapsPool from '../utils/google-maps-pool';

const Gmaps = React.createClass({

  mixins: [Listener],

  getInitialState() {
    return {
      isMapCreated: false
    };
  },

  componentDidMount() {
    this.setState({
      callbackIndex: GoogleMaps.load(this.props.params, this.mapsCallback)
    });
  },

  componentWillUnmount() {
    GoogleMaps.removeCallback(this.state.callbackIndex);
    GoogleMapsPool.free(this.state.mapIndex);
    this.removeListeners();
  },

  componentWillReceiveProps(nextProps) {
    if (this.map && !compareProps(this.props, nextProps)) {
      this.map.setOptions({
        ...nextProps,
        center: new google.maps.LatLng(nextProps.lat, nextProps.lng)
      });
    }
  },

  getMap() {
    return this.map;
  },

  mapsCallback() {
    this.createMap();
    this.addListeners(this.map, MapEvents);
  },

  createMap() {
    const node = ReactDOM.findDOMNode(this);
    const map = GoogleMapsPool.create(node, this.props);
    this.map = map.map;
    this.setState({
      isMapCreated: true,
      mapIndex: map.index
    });
    if (this.props.onMapCreated) {
      this.props.onMapCreated(this.map);
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
    const style = objectAssign({
      width: this.props.width,
      height: this.props.height
    }, this.props.style);
    const message = this.props.loadingMessage || 'Loading...';
    return (
      <div style={style} className={this.props.className}>
        {!this.state.isMapCreated && message}
        {this.state.isMapCreated && this.getChildren()}
      </div>
    );
  },

});

export default Gmaps;
