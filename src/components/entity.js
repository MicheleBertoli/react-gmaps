import React from 'react';
import Listener from '../mixins/listener';

export default (name, events) => {
  return React.createClass({

    mixins: [Listener],

    entity: null,

    componentDidMount() {
      const options = this.getOptions(this.props);
      this.entity = new google.maps[name](options);
      this.addListeners(this.entity, events);
    },

    componentWillReceiveProps(nextProps) {
      const options = this.getOptions(nextProps);
      this.entity.setOptions(options);
    },

    componentWillUnmount() {
      this.entity.setMap(null);
      this.removeListeners();
      this.entity = null;
    },

    getOptions(props) {
      return {
        ...props,
        position: new google.maps.LatLng(props.lat, props.lng)
      };
    },

    render() {
      return null;
    }

  });
}
