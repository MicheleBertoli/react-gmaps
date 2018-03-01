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
      console.log('props at entity-getOptions-ComponentWillReceiveProps:', props)
      console.log('latLngProp at entity-getOptions-ComponentWillReceiveProps:', latLngProp)
      return {
        ...props,
        [latLngProp]: new google.maps.LatLng(props.lat, props.lng)
      };
    },

    render() {
      return null;
    }

  });
};
