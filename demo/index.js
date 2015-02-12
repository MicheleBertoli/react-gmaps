var React = require('react'),
  ReactGmaps = require('../dist'),
  Events = require('../dist/components/events');
var { Gmaps, Marker } = ReactGmaps;

var styles = {
  item: {
    backgroundColor: 'white',
    transition: 'background-color 0.2s linear'
  },
  cols: {
    float: 'left'
  }
};

var App = React.createClass({

  render() {

    var events = [];
    var handlers = {};
    for (var _event in Events) {
      if (Events.hasOwnProperty(_event)) {
        events.push(
          <li ref={Events[_event]} style={styles.item}>
            {Events[_event]}
          </li>
        );
        handlers[_event] = this.handler.bind(this, Events[_event]);
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

  },

  handler(_event) {
    var item = this.refs[_event].getDOMNode();
    item.style.backgroundColor = '#99ccff';
    setTimeout(function() {
      item.style.backgroundColor = styles.item.backgroundColor;
    }, 500);
  },

});

React.render(<App />, document.getElementById('gmaps'));
