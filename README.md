<h1 align="center">React GMaps</h1>

<h4 align="center">A modern Google Maps integration for ReactJS.</h4>

---

| Marker                                | Polyline                                | Polygon                                |
| ------------------------------------- | --------------------------------------- | -------------------------------------- |
| ![](/docs/assets/marker-animated.gif) | ![](/docs/assets/polyline-animated.gif) | ![](/docs/assets/polygon-animated.gif) |

```jsx
const location = { lat: 40.73061, lng: -73.935242 };

function MyMarker() {
  return (
    <GMapsMarker location={location}>
      <p style={{ backgroundColor: "red" }}>Hello World</p>
    </GMapsMarker>
  );
}

function MyMap() {
  return (
    <div style={{ height: "100vh" }}>
      <GMaps center={location} zoom={12}>
        <MyMarker />
      </GMaps>
    </div>
  );
}
```

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
Plus its context base architecture, enables users to easly access GMaps functionalities programmaticaly and create GoogleMaps related libraries for others to use (similarly to the built-in [Animated components](/docs/components/gmaps-animated-marker.md)).

## TODOs

Wanna help? See our [`contributing.md`](/CONTRIBUTING.md).

- [x] Marker component (displays ReactJS components)
- [ ] LegacyMarker component (displays images only)
- [x] Polyline component
- [x] Polygon component
- [ ] Circle component
- [ ] Rectangle component
- [ ] Overlays
- [ ] Hooks to access the `google` sdk and `google.maps.Map` instance using a `ref` to `<GMaps />`
