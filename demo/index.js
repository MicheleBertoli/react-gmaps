var React = require('react'),
  Gmaps = require('../src/gmaps');

function onClick() {
  console.log('onClick');
}

var gmaps = (
  <Gmaps 
    width={'100%'}
    height={'100%'}
    lat={-34.397} 
    lng={150.644} 
    zoom={8} 
    onClick={onClick} />
);

React.render(gmaps, document.getElementById('gmaps'));
