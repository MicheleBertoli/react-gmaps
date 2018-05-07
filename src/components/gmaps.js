import React from 'react';
import ReactDOM from 'react-dom';
// import createReactClass from 'create-react-class';
import objectAssign from 'object-assign';
import MapEvents from '../events/map';
// import Listener from '../mixins/listener';
import GoogleMaps from '../utils/google-maps';
import compareProps from '../utils/compare-props';

// refactored to React class, then to React +16.3

export default class Gmaps extends React.Component {
  state = {
    isMapCreated: false
  };

  componentDidMount() {
    this.setState({
      callbackIndex: GoogleMaps.load(this.props.params, this.mapsCallback)
    });
  }

  componentWillUnmount() {
    GoogleMaps.removeCallback(this.state.callbackIndex);
    this.removeListeners();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.map && !compareProps(this.props, nextProps)) {
      this.state.map.setOptions({
        ...nextProps,
        center: new google.maps.LatLng(nextProps.lat, nextProps.lng)
      });
    }
  }

  getMap() {
    // is this used anywhere else...?
    return this.state.map;
  }

  mapsCallback = () => {
    this.createMap();
    this.addListeners(this.state.map, MapEvents);
  };

  createMap = () => {
    const node = ReactDOM.findDOMNode(this);
    const myMap = new google.maps.Map(node, {
      ...this.props,
      center: new google.maps.LatLng(this.props.lat, this.props.lng)
    });
    this.setState({ map: myMap, isMapCreated: true });
    if (this.props.onMapCreated) {
      this.props.onMapCreated(this.state.map);
    }
  };

  getChildren() {
    return React.Children.map(this.props.children, child => {
      if (!React.isValidElement(child)) {
        return child;
      }
      return React.cloneElement(child, {
        ref: child.ref,
        map: this.state.map
      });
    });
  }

  addListeners(entity, events) {
    for (let prop in this.props) {
      if (this.props.hasOwnProperty(prop) && events[prop]) {
        const addListener = google.maps.event.addListener;
        const listener = addListener(entity, events[prop], this.props[prop]);
        if (!this.listeners) {
          this.listeners = [];
        }
        this.listeners.push(listener);
      }
    }
  }

  removeListeners() {
    if (window.google && this.listeners) {
      this.listeners.forEach(listener => {
        google.maps.event.removeListener(listener);
      });
    }
  }

  render() {
    const style = objectAssign(
      {
        width: this.props.width,
        height: this.props.height
      },
      this.props.style
    );
    return (
      <div style={style} className={this.props.className}>
        {this.props.loadingMessage || 'Loading...'}
        {this.state.isMapCreated ? this.getChildren() : null}
      </div>
    );
  }
}
