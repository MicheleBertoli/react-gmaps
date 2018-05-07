import React from "react";
// import createReactClass from 'create-react-class';
// import Listener from '../mixins/listener';
import compareProps from "../utils/compare-props";

// refactored to React class, then to React +16.3

export default (name, latLngProp, events) => {
  return class CreateEntity extends React.Component {
    entity = null;

    componentDidMount() {
      const options = this.getOptions(this.props);
      this.entity = new google.maps[name](options);
      this.addListeners(this.entity, events);
    }

    componentWillReceiveProps(nextProps) {
      if (!compareProps(this.props, nextProps)) {
        const options = this.getOptions(nextProps);
        this.entity.setOptions(options);
      }
    }

    componentWillUnmount() {
      this.entity.setMap(null);
      this.removeListeners();
      this.entity = null;
    }

    getEntity() {
      return this.entity;
    }

    getOptions(props) {
      return {
        ...props,
        [latLngProp]: this.switchPaths(name, props)
      };
    }

    switchPaths(name, props) {
      switch (name) {
        case "Polyline":
          return props.path;
          break;
        case "Polygon":
          return props.paths;
          break;
        default:
          return new google.maps.LatLng(props.lat, props.lng);
          break;
      }
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
      return null;
    }
  };
};
