# Documentation

## Getting Started

Install React GMaps with your package manager of choice:

```
npm i react-gmaps@next
```

Before rendering our Map, we need to create a [Map DOM Element](https://developers.google.com/maps/documentation/javascript/overview#Map_DOM_Elements) which simply consists of a `<div>` **with a defined height**. Then we can use the `<GMaps />` component to render GoogleMaps in our component.

```jsx
function MyMap() {
  return (
    <div style={{ height: "100vh" }}>
      <GMaps />
    </div>
  );
}
```

## Components

- [`<GMaps />`](/docs/components/gmaps.md)
- [`<GMapsMarker />`](/docs/components/gmaps-marker.md)
- [`<GMapsPolygon />`](/docs/components/gmaps-polygon.md)
- [`<GMapsPolyline />`](/docs/components/gmaps-polyline.md)
- [`<GMapsAnimatedMarker />`](/docs/components/gmaps-animated-marker.md)
- [`<GMapsAnimatedPolygon />`](/docs/components/gmaps-animated-polygon.md)
- [`<GMapsAnimatedPolyline />`](/docs/components/gmaps-animated-polyline.md)

## Hooks

- [`useGMapsSDK`](/docs/hooks/use-gmaps-sdk.md)
- [`useGMapsInstance`](/docs/hooks/use-gmaps-instance.md)
- [`useGMapsMarker`](/docs/hooks/use-gmaps-marker.md)
- [`useGMapsPolygon`](/docs/hooks/use-gmaps-polygon.md)
- [`useGMapsPolyline`](/docs/hooks/use-gmaps-polyline.md)
- [`useGMapsAnimatedMarker`](/docs/hooks/use-gmaps-animated-marker.md)
- [`useGMapsAnimatedPolygon`](/docs/hooks/use-gmaps-animated-polygon.md)
- [`useGMapsAnimatedPolyline`](/docs/hooks/use-gmaps-animated-polyline.md)

## Misc

- [Animations](/docs/misc/animations.md)

## Examples

To run an example:

```
cd examples/<folder>
pnpm i
pnpm dev
```

- [Basic](/examples/basic)
- [Marker](/examples/marker)
- [Marker Animated](/examples/marker-animated)
- [Marker Methods](/examples/marker-methods)
- [Polygon](/examples/polygon)
- [Polygon Animated](/examples/polygon-animated)
- [Polygon Methods](/examples/polygon-methods)
- [Polyline](/examples/polyline)
- [Polyline Animated](/examples/polyline-animated)
- [Polyline Methods](/examples/polyline-methods)
