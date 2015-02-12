[![Build Status](https://travis-ci.org/MicheleBertoli/react-gmaps.svg?branch=master)](https://travis-ci.org/MicheleBertoli/react-gmaps)

React Gmaps
===========

A [Google Maps](https://developers.google.com/maps/documentation/javascript/) component for [React.js](http://facebook.github.io/react/)

Features
--------

- Lazy Google Maps loading
- Easy to use

Installation
------------

```sh
$ npm install react-gmaps --save
```

Demo
------------

[http://react-gmaps.herokuapp.com/](http://react-gmaps.herokuapp.com/)

Usage
-----

```javascript
var React = require('react'),
  ReactGmaps = require('react-gmaps');
var { Gmaps, Marker } = ReactGmaps;

var coords = {
  lat: 51.5258541,
  lng: -0.08040660000006028 
}

var App = React.createClass({

  render() {
    return (
      <Gmaps 
        ref='Gmaps'
        width={'100%'}
        height={'100%'}
        lat={coords.lat} 
        lng={coords.lng} 
        zoom={12} 
        onMapCreated={this.onMapCreated}
        onClick={this.onClick}>
        <Marker 
          lat={coords.lat} 
          lng={coords.lng} />
      </Gmaps>
    );
  },

  onMapCreated() {
    console.log('onMapCreated', this.refs.Gmaps.getMap());
    this.refs.Gmaps.getMap().setOptions({
      disableDefaultUI: true
    });
  },

  onClick() {
    console.log('onClick');
  }

});

React.render(<App />, document.getElementById('gmaps'));
```

Test
----

```sh
$ npm test
```
