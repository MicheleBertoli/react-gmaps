import React from 'react';
import ReactDOM from 'react-dom';
import { Gmaps } from '../../dist';
import MapEvents from '../../dist/events/map';

const styles = {
  item: {
    backgroundColor: 'white',
    transition: 'background-color 0.2s linear',
  },
  cols: {
    float: 'left',
  },
};

const App = React.createClass({

  handler(event) {
    const item = ReactDOM.findDOMNode(this.refs[event]);
    item.style.backgroundColor = '#99ccff';
    setTimeout(() => {
      item.style.backgroundColor = styles.item.backgroundColor;
    }, 500);
  },

  render() {
    const events = [];
    const handlers = {};
    for (const event in MapEvents) {
      if (MapEvents.hasOwnProperty(event)) {
        events.push(
          <li key={MapEvents[event]} ref={MapEvents[event]} style={styles.item}>
            {MapEvents[event]}
          </li>
        );
        handlers[event] = this.handler.bind(this, MapEvents[event]);
      }
    }

    return (
      <div>
        <Gmaps
          width={'50%'}
          height={500}
          style={styles.cols}
          lat={51.5258541}
          lng={-0.08040660000006028}
          zoom={12}
          {...handlers}
        />
        <ul style={styles.cols}>
          {events}
        </ul>
      </div>
    );
  },

});

ReactDOM.render(<App />, document.getElementById('gmaps'));
