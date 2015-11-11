import React from 'react';
import ReactDOM from 'react-dom';
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
    Utils.loadMaps(this.props.params, this.mapsCallback);
  },

  componentWillUnmount() {
    this.removeListeners();
  },

  componentWillReceiveProps(nextProps) {
    if (this.map) {
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
    this.map = new google.maps.Map(node, {
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
