import React from 'react';
import ReactDOM from 'react-dom';
import objectAssign from 'object-assign';
import MapEvents from '../events/map';
import Listener from '../mixins/listener';
import compareProps from '../utils/compare-props';
import GoogleMapsApi from '../utils/google-maps-api';
import GoogleMapsPool from '../utils/google-maps-pool';

const Gmaps = React.createClass({

  mixins: [Listener],

  getInitialState() {
    return {
      isMapCreated: false
    };
  },

  componentDidMount() {
    this.callbackIndex = GoogleMapsApi.load(
      this.props.params,
      this.mapsCallback
    );
  },

  componentWillUnmount() {
    if (this.callbackIndex > -1) {
      GoogleMapsApi.removeCallback(this.callbackIndex);
    }
    if (this.mapIndex > -1) {
      GoogleMapsPool.free(this.mapIndex);
    }
    this.removeListeners();
  },

  componentWillReceiveProps(nextProps) {
    if (this.state.isMapCreated && !compareProps(this.props, nextProps)) {
      GoogleMapsPool.update(this.mapIndex, nextProps);
    }
  },

  mapsCallback() {
    const node = ReactDOM.findDOMNode(this);
    this.mapIndex = GoogleMapsPool.create(node, this.props);
    this.setState({
      isMapCreated: true
    });
    this.addListeners(this.getMap(), MapEvents);
    if (this.props.onMapCreated) {
      this.props.onMapCreated(this.getMap());
    }
  },

  getMap() {
    return GoogleMapsPool.getMap(this.mapIndex);
  },

  getChildren() {
    return React.Children.map(this.props.children, child => {
      if (!React.isValidElement(child)) {
        return child;
      }
      return React.cloneElement(child, {
        ref: child.ref,
        map: this.getMap()
      });
    });
  },

  render() {
    const style = objectAssign({
      width: this.props.width,
      height: this.props.height
    }, this.props.style);
    return (
      <div className={this.props.className} style={style}>
        {!this.state.isMapCreated && this.props.loadingMessage}
        {this.state.isMapCreated && this.getChildren()}
      </div>
    );
  },

});

export default Gmaps;
