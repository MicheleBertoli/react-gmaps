import React from 'react';
import Listener from '../mixins/listener';
import compareProps from '../utils/compare-props';

export default (name, latLngProp, events) => {
  return React.createClass({

    mixins: [Listener],

    componentDidMount() {
      const options = this.getOptions(this.props);
      this.entity = new google.maps[name](options);
      this.addListeners(this.entity, events);
    },

    componentWillUnmount() {
      this.entity.setMap(null);
      this.removeListeners();
      this.entity = null;
    },

    componentWillReceiveProps(nextProps) {
      if (!compareProps(this.props, nextProps)) {
        const options = this.getOptions(nextProps);
        this.entity.setOptions(options);
      }
    },

    getOptions(props) {
      return {
        ...props,
        [latLngProp]: new google.maps.LatLng(props.lat, props.lng)
      };
    },

    getEntity() {
      return this.entity;
    },

    render() {
      return null;
    }

  });
};
