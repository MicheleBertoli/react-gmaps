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
import React from 'react';
import {Gmaps, Marker, InfoWindow} from 'react-gmaps';

const coords = {
  lat: 51.5258541,
  lng: -0.08040660000006028
}

const App = React.createClass({

  onMapCreated() {
    console.log('onMapCreated', this.refs.Gmaps.getMap());
    this.refs.Gmaps.getMap().setOptions({
      disableDefaultUI: true
    });
  },

  onClick(e) {
    console.log('onClick', e);
  },

  onDragEnd(e) {
    console.log('onDragEnd', e);
  },

  onCloseClick() {
    console.log('onCloseClick');
  },

  render() {
    return (
      <Gmaps
        ref='Gmaps'
        width={'800px'}
        height={'600px'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={12}
        loadingMessage={'Be happy'}
        onMapCreated={this.onMapCreated}
        onClick={this.onClick}>
        <Marker
          lat={coords.lat}
          lng={coords.lng}
          draggable={true}
          onDragEnd={this.onDragEnd} />
        <InfoWindow
          content={'Hello, React :)'}
          lat={coords.lat}
          lng={coords.lng}
          onCloseClick={this.onCloseClick} />
      </Gmaps>
    );
  }

});

React.render(<App />, document.getElementById('gmaps'));
```

Test
----

```sh
$ npm test
```
