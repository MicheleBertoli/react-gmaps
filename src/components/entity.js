import React from 'react';
// import createReactClass from 'create-react-class';
// import Listener from '../mixins/listener';
import compareProps from '../utils/compare-props';

// refactored to React class, then to React +16.3

export default (name, latLngProp, events) => {
	return class CreateEntity extends React.Component {
		state = {
			entity: null,
		};

		componentDidMount() {
			const options = this.getOptions(this.props);
			console.log('options', options);
			this.setState({ entity: new google.maps[name](options) });
			console.log('this.state.entity', this.state.entity);
			this.addListeners(this.state.entity, events);
		}

		componentWillReceiveProps(nextProps) {
			if (!compareProps(this.props, nextProps)) {
				const options = this.getOptions(nextProps);
				this.state.entity.setOptions(options);
			}
		}

		componentWillUnmount() {
			this.state.entity.setMap(null);
			this.removeListeners();
			this.setState({ entity: null });
		}

		getOptions(props) {
			return {
				...props,
				[latLngProp]: this.switchPaths(name, props),
			};
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

		getEntity() {
			return this.state.entity;
		}

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
