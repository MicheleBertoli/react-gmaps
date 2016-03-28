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
    this.setState({
      callbackIndex: GoogleMapsApi.load(this.props.params, this.mapsCallback)
    });
  },

  componentWillUnmount() {
    GoogleMapsApi.removeCallback(this.state.callbackIndex);
    GoogleMapsPool.free(this.state.mapIndex);
    this.removeListeners();
  },

  componentWillReceiveProps(nextProps) {
    if (this.state.isMapCreated && !compareProps(this.props, nextProps)) {
      GoogleMapsPool.update(this.state.mapIndex, nextProps);
    }
  },

  mapsCallback() {
    const node = ReactDOM.findDOMNode(this);
    this.setState({
      isMapCreated: true,
      mapIndex: GoogleMapsPool.create(node, this.props)
    });
    this.addListeners(this.getMap(), MapEvents);
    if (this.props.onMapCreated) {
      this.props.onMapCreated(this.getMap());
    }
  },

  getMap() {
    return GoogleMapsPool.get(this.state.mapIndex);;
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
