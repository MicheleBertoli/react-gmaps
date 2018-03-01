import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import { Gmaps } from '../dist';
import { Marker } from '../dist';
import { Circle } from '../dist';
import MapEvents from '../dist/events/map';

const styles = {
  item: {
    backgroundColor: 'white',
    transition: 'background-color 0.2s linear'
  },
  cols: {
    float: 'left'
  }
};

const params = {
  v: '3.exp',
  key: 'AIzaSyDOb-PSgY3KZm8g_gjIJ2at91bSfA21z84'
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
          <li key={MapEvents[_event]} ref={MapEvents[_event]} style={styles.item}>
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
          lat={51.5}
          lng={-0.08}
          zoom={12}
          params={params}
          {...handlers}
        >
          <Marker lat={51.5} lng={-0.08} icon={'https://cdn.filestackcontent.com/eAYlntJTS5yscafiMdf2'} />

          <Circle lat={51.5} lng={-0.08} radius={500} />

        </Gmaps>

        <ul style={styles.cols}>{events}</ul>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('gmaps'));
