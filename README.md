# React GMaps

A modern Google Maps integration for ReactJS

## Features

- Marker, Polyline, Polygon components and more
- Hook based
- Highly extensible
- Interpolation animations for everything (markers, polygons, etc.)

## Documentation

[See our documentation](/docs/index.md)

## Why yet another Google Maps integration for ReactJS?

Why choose React GMaps when there's already [react-google-maps-api](https://github.com/JustFly1984/react-google-maps-api), [google-maps-react](https://github.com/fullstackreact/google-maps-react), [google-map-react](https://github.com/google-map-react/google-map-react), etc. ?
The current landscape doesn't really provide a smooth integration for GoogleMaps in a ReactJS application with hooks and modern patterns.
Existing implementations tends to be old/unmaintained, outdated, lacking features, and/or a bit wobbly.

React GMaps aims to be more flexible, extensible, and composable by exposing simple primitives that can be used in various ways.
It utilizes modern GoogleMaps features such as [AdvancedMarkers](https://developers.google.com/maps/documentation/javascript/reference/advanced-markers) to avoid wacky hacks and unstable integrations.
Plus its context base architecture, ables users to easly access GMaps fonctionallities programmaticaly and create GoogleMaps related libraries for others to use (such as Animated components for example).

## TODOs

Wanna help? See our [`contributing.md`](/CONTRIBUTING.md).

- [x] Marker component (displays ReactJS components)
- [ ] LegacyMarker component (displays images only)
- [x] Polyline component
- [x] Polygon component
- [ ] Circle component
- [ ] Rectangle component
- [ ] Overlays
