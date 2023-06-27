# `<GMapsPolygon />`

<p align="center"><img src="/docs/assets/polygon.png" /></p>

Creates a new polygon on the map with the provided path(s).

```jsx
<GMapsPolygon
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
        <GMapsPolygon path={path} />
      </GMaps>
    </div>
  );
}
```

</details>

<details>
<summary>With holes</summary>

```jsx
const path = [
  { lat: 37.772, lng: -122.214 },
  { lat: 21.291, lng: -157.821 },
  { lat: -18.142, lng: 178.431 },
  { lat: -27.467, lng: 153.027 },
];
const hole = [
  { lat: 26.745, lng: -72.579 },
  { lat: 27.57, lng: -69.514 },
  { lat: 25.339, lng: -68.668 },
];

function MyMap() {
  return (
    <div style={{ height: "100vh" }}>
      <GMaps center={{ lat: 0, lng: -180 }} zoom={3}>
        <GMapsPolygon paths={[path, hole /* ...more holes here */]} />
      </GMaps>
    </div>
  );
}
```

</details>

<details>
<summary>Updating the polygon programmatically</summary>

```jsx
const path = [
  { lat: 37.772, lng: -122.214 },
  { lat: 21.291, lng: -157.821 },
  { lat: -18.142, lng: 178.431 },
  { lat: -27.467, lng: 153.027 },
];

function App() {
  const polygon = useGMapsPolygon();

  const updatePolygonPath = () => {
    // random new lat/lng near the base `path` for each point
    const newPath = path.map((point) => ({
      lat: point.lat + Math.random() * 0.08,
      lng: point.lng + Math.random() * 0.08,
    }));

    marker.current?.update({ path: newPath });
  };

  return (
    <div style={{ height: "100vh" }}>
      <button type="button" onClick={updatePolygonPath}>
        update polygon path
      </button>

      <GMaps center={{ lat: 0, lng: -180 }} zoom={3}>
        <GMapsPolygon ref={polygon} path={path} />
      </GMaps>
    </div>
  );
}
```

</details>

## Props

| Name        | Type                                         | Description                                                                                                                          |
| ----------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| path        | `Array<{ lat: number, lng: number }>`        | The path of the polygon.                                                                                                             |
| paths       | `Array<Array<{ lat: number, lng: number }>>` | List of paths for the polygon. The first one being the outter path, and the others inner polygon holes.                              |
| onClick     | `(event: MapMouseEvent) => void`             | On click event. See [`MapMouseEvent`](https://developers.google.com/maps/documentation/javascript/reference/map#MapMouseEvent).      |
| onDrag      | `(event: MapMouseEvent) => void`             | On drag event. See [`MapMouseEvent`](https://developers.google.com/maps/documentation/javascript/reference/map#MapMouseEvent).       |
| onDragStart | `(event: MapMouseEvent) => void`             | On drag start event. See [`MapMouseEvent`](https://developers.google.com/maps/documentation/javascript/reference/map#MapMouseEvent). |
| onDragEnd   | `(event: MapMouseEvent) => void`             | On drag end event. See [`MapMouseEvent`](https://developers.google.com/maps/documentation/javascript/reference/map#MapMouseEvent).   |
| ...rest     | `PolylgonOptions`                            | See [`PolylgonOptions`](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolygonOptions)                |

## Related Hooks

- [`useGMapsPolygon`](/docs/hooks/use-gmaps-polygon.md)

## Related Components

- [`<GMapsAnimatedPolygon />`](/docs/components/gmaps-animated-polygon.md)
