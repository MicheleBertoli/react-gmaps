import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import MapEvents from '../src/events/map';
import Gmaps from '../src/components/gmaps.js';
import Circle from '../src/components/circle2.js';
import InfoWindow from '../src/components/info-window2.js';
import Marker from '../src/components/marker2.js';
import Polyline from '../src/components/polyline2.js';
import Polygon from '../src/components/polygon2.js';

const styles = {
	item: {
		backgroundColor: 'white',
		transition: 'background-color 0.2s linear',
	},
	cols: {
		float: 'left',
	},
};

const App = createReactClass({
	handler(_event) {
		const item = ReactDOM.findDOMNode(this.refs[_event]);
		item.style.backgroundColor = '#99ccff';
		setTimeout(function() {
			item.style.backgroundColor = styles.item.backgroundColor;
		}, 500);
	},

	render() {
		const events = [];
		const handlers = {};
		for (let _event in MapEvents) {
			if (MapEvents.hasOwnProperty(_event)) {
				events.push(
          <li key={MapEvents[_event]} 
              ref={MapEvents[_event]} 
              style={styles.item}>
						{MapEvents[_event]}
					</li>
				);
				handlers[_event] = this.handler.bind(this, MapEvents[_event]);
			}
		}

		return (
			<div>
				<Gmaps
					width={'50%'}
					height={'500px'}
					style={styles.cols}
					lat={51.5258541}
					lng={-0.08040660000006028}
					zoom={12}
					{...handlers}>
					<Circle 
						lat={51.52}
						lng={-0.08}
						radius={5000}
						strokeColor={'#4F5FB7'}
						fillColor={'#4F5FB7'} />
					<InfoWindow 
						lat={51.52}
						lng={-0.08}
						content={'Hey there!'} />
					<Marker 
						lat={51.52}
						lng={-0.08} />
					<Polyline 
						path={[
							{lat: 51.5, lng: -0.11}, 
							{lat: 51.53, lng: -0.04}, 
							]} />
					<Polygon paths={[
						{lat: 51.52, lng: -0.125}, 
						{lat: 51.5, lng: -0.11}, 
						{lat: 51.51, lng: -0.06}, 
						{lat: 51.53, lng: -0.04}, 
						{lat: 51.53, lng: -0.09}]} />
				</Gmaps>
				<ul style={styles.cols}>{events}</ul>
			</div>
		);
	},
});

ReactDOM.render(<App />, document.getElementById('gmaps'));
