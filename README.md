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
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

const coords = {
  lat: 51.5258541,
  lng: -0.08040660000006028
};

const params = {v: '3.exp', key: 'YOUR_API_KEY'};

class App extends React.Component {

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }

  onDragEnd(e) {
    console.log('onDragEnd', e);
  }

  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }

  render() {
    return (
      <Gmaps
        width={'800px'}
        height={'600px'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={12}
        loadingMessage={'Be happy'}
        params={params}
        onMapCreated={this.onMapCreated}>
        <Marker
          lat={coords.lat}
          lng={coords.lng}
          draggable={true}
          onDragEnd={this.onDragEnd} />
        <InfoWindow
          lat={coords.lat}
          lng={coords.lng}
          content={'Hello, React :)'}
          onCloseClick={this.onCloseClick} />
        <Circle
          lat={coords.lat}
          lng={coords.lng}
          radius={500}
          onClick={this.onClick} />
      </Gmaps>
    );
  }

};

ReactDOM.render(<App />, document.getElementById('gmaps'));
```

MarkerClusterer
----

You can cluster markers together (see [Google's docs](https://developers.google.com/maps/documentation/javascript/marker-clustering)) by setting the `clusterMarkers` prop on the `Gmaps` component. By default this will expect icons for the clusters named `m1.png, m2.png, m3.png, m4.png, m5.png` to reside at `your_web_root/images/`.

You can pass an options object to this prop, allowing you to specify a new location for these cluster icons. The root format will append `1.png`, `2.png`, etc to the supplied path.

For example if your images reside at `http://localhost:3000/cluster-icons/` and are still called `m1.png`, you would supply a path of `http://localhost:3000/cluster-icons/m` similar to:

```
<Gmaps
  clusterMarkers={{ imagePath: 'http://localhost:3000/cluster-icons/m' }}
  ...>
  ...
</Gmaps>
```

At current this is basic implementation and could be improved by adding Events to the clusters, another improvement would be to allow 'de-clustering' based on zoom level so when you have multiple markers with the exact same location you can still separate them and click on them ([stackoverlow example](https://stackoverflow.com/questions/15276908/google-markerclusterer-decluster-markers-below-a-certain-zoom-level?rq=1) or [OverlappingMarkerSpiderfier](https://github.com/jawj/OverlappingMarkerSpiderfier)).

Test
----

```sh
$ npm test
```
