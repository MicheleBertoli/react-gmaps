import React from 'react';
import Listener from '../mixins/listener';
import compareProps from '../utils/compare-props';

export default (name, latLngProp, events) => {
  return React.createClass({

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
      let i;
      const result = [];
      for (i in props.path){
        result.push({lat: props.path[i].lat, lng: props.path[i].lng});
      }

      return {
        ...props,
        [latLngProp]: result
      };
    },

    render() {
      return null;
    }

  });
};
