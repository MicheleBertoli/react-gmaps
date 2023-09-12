# `<GMapsPolyline />`

<p align="center"><img src="/docs/assets/polyline.png" /></p>

Creates a new polyline on the map with the provided path.

```jsx
<GMapsPolyline
  path={[
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 },
  ]}
/>
```

<details>
<summary>Full example</summary>

```jsx
const path = [
  { lat: 37.772, lng: -122.214 },
  { lat: 21.291, lng: -157.821 },
  { lat: -18.142, lng: 178.431 },
  { lat: -27.467, lng: 153.027 },
];

function MyMap() {
  return (
    <div style={{ height: "100vh" }}>
      <GMaps center={{ lat: 0, lng: -180 }} zoom={3}>
        <GMapsPolyline path={path} />
      </GMaps>
    </div>
  );
}
```

</details>

<details>
<summary>Updating the polyline programmatically</summary>

```jsx
const path = [
  { lat: 37.772, lng: -122.214 },
  { lat: 21.291, lng: -157.821 },
  { lat: -18.142, lng: 178.431 },
  { lat: -27.467, lng: 153.027 },
];

function App() {
  const polyline = useGMapsPolyline();

  const updatePolylinePath = () => {
    // random new lat/lng near the base `path` for each point
    const newPath = path.map((point) => ({
      lat: point.lat + Math.random() * 0.08,
      lng: point.lng + Math.random() * 0.08,
    }));

    marker.current?.update({ path: newPath });
  };

  return (
    <div style={{ height: "100vh" }}>
      <button type="button" onClick={updatePolylinePath}>
        update polyline path
      </button>

      <GMaps center={{ lat: 0, lng: -180 }} zoom={3}>
        <GMapsPolyline ref={polyline} path={path} />
      </GMaps>
    </div>
  );
}
```

</details>

## Props

| Name        | Type                                  | Description                                                                                                                          |
| ----------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| path        | `Array<{ lat: number, lng: number }>` | The path of the polyline.                                                                                                            |
| onClick     | `(event: MapMouseEvent) => void`      | On click event. See [`MapMouseEvent`](https://developers.google.com/maps/documentation/javascript/reference/map#MapMouseEvent).      |
| onDrag      | `(event: MapMouseEvent) => void`      | On drag event. See [`MapMouseEvent`](https://developers.google.com/maps/documentation/javascript/reference/map#MapMouseEvent).       |
| onDragStart | `(event: MapMouseEvent) => void`      | On drag start event. See [`MapMouseEvent`](https://developers.google.com/maps/documentation/javascript/reference/map#MapMouseEvent). |
| onDragEnd   | `(event: MapMouseEvent) => void`      | On drag end event. See [`MapMouseEvent`](https://developers.google.com/maps/documentation/javascript/reference/map#MapMouseEvent).   |
| ...rest     | `PolylineOptions`                     | See [`PolylineOptions`](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions)               |

## Related Hooks

- [`useGMapsPolyline`](/docs/hooks/use-gmaps-polyline.md)

## Related Components

- [`<GMapsAnimatedPolyline />`](/docs/components/gmaps-animated-polyline.md)
