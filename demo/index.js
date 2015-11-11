import React from 'react';
import ReactDOM from 'react-dom';
import {Gmaps} from '../dist';
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

const App = React.createClass({

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
          lat={51.5258541}
          lng={-0.08040660000006028}
          zoom={12}
          {...handlers} />
        <ul style={styles.cols}>
          {events}
        </ul>
      </div>
    );

  }

});

ReactDOM.render(<App />, document.getElementById('gmaps'));
