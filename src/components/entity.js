import React from 'react';
import createReactClass from 'create-react-class';
import Listener from '../mixins/listener';
import compareProps from '../utils/compare-props';

export default (name, latLngProp, events) => {
  return createReactClass({

    mixins: [Listener],

    entity: null,

    componentDidMount() {
      const options = this.getOptions(this.props);
      this.entity = new google.maps[name](options);
      this.addListeners(this.entity, events);
    },

    componentWillReceiveProps(nextProps) {
      if (!compareProps(this.props, nextProps)) {
        const options = this.getOptions(nextProps);
        this.entity.setOptions(options);
      }
    },

    componentWillUnmount() {
      this.entity.setMap(null);
      this.removeListeners();
      this.entity = null;
    },

    getEntity() {
      return this.entity;
    },

    getOptions(props) {
      return {
        ...props,
        [latLngProp]: this.switchPaths(name, props)
      };
    },

    switchPaths(name, props) {
      switch (name) {
        case 'Polyline':
          return props.path;
          break;
        case 'Polygon':
          return props.paths;
          break;
        default:
          return new google.maps.LatLng(props.lat, props.lng);
          break;
      }
    },
  
    render() {
      return null;
    }
  });
};
