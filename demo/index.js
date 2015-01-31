var React = require('react'),
  Gmaps = require('../src/gmaps');

React.render(<Gmaps lat={-34.397} lng={150.644} zoom={8} />, document.getElementById('gmaps'));
