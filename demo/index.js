var React = require('react'),
  Gmaps = require('../src/gmaps'),
  Marker = require('../src/marker');

var App = React.createClass({

  render() {
    return (
      <Gmaps 
        ref='Gmaps'
        width={'100%'}
        height={'100%'}
        lat={-34.397} 
        lng={150.644} 
        zoom={8} 
        onClick={this.onClick}>
        <Marker 
          lat={-34.397} 
          lng={150.644} 
          title={'Hello, React!'} />
      </Gmaps>
    );
  },

  onClick() {
    console.log('onClick');
  }

});

React.render(<App />, document.getElementById('gmaps'));
