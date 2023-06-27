# `<GMapsMarker />`

<p align="center"><img src="/docs/assets/marker.png" /></p>

Creates a new marker on the map with the provided `lat`/`lng`.

```jsx
<GMapsMarker location={{ lat: 40.73061, lng: -73.935242 }}>
  <p style={{ backgroundColor: "red" }}>Hello World</p>
</GMapsMarker>
```

<details>
<summary>Full example</summary>

```jsx
const location = { lat: 40.73061, lng: -73.935242 };

function MyMap() {
  return (
    <div style={{ height: "100vh" }}>
      <GMaps center={location} zoom={12}>
        <GMapsMarker location={location}>
          <p style={{ backgroundColor: "red" }}>Hello World</p>
        </GMapsMarker>
      </GMaps>
    </div>
  );
}
```

</details>

<details>
<summary>Updating the marker programmatically</summary>

```jsx
const location = { lat: 40.73061, lng: -73.935242 };

function App() {
  const marker = useGMapsMarker();

  const updateMarkerLocation = () => {
    // random new lat/lng near the base `location`
    const newLocation = {
      lat: location.lat + Math.random() * 0.08,
      lng: location.lng + Math.random() * 0.08,
    };

    marker.current?.update({ location: newLocation });
  };

  return (
    <div style={{ height: "100vh" }}>
      <button type="button" onClick={updateMarkerLocation}>
        update marker location
      </button>

      <GMaps center={location} zoom={12}>
        <GMapsMarker ref={marker} location={location}>
          <p style={{ backgroundColor: "red" }}>Hello World</p>
        </GMapsMarker>
      </GMaps>
    </div>
  );
}
```

</details>

## Props

| Name        | Type                             | Description                                                                                                                          |
| ----------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| location    | `{ lat: number, lng: number }`   | The marker's location on the Map.                                                                                                    |
| zIndex      | `number`                         | The marker's z-index.                                                                                                                |
| draggable   | `boolean`                        | If the marker can be dragged or not (see `onDrag` prop).                                                                             |
| onClick     | `(event: MapMouseEvent) => void` | On click event. See [`MapMouseEvent`](https://developers.google.com/maps/documentation/javascript/reference/map#MapMouseEvent).      |
| onDrag      | `(event: MapMouseEvent) => void` | On drag event. See [`MapMouseEvent`](https://developers.google.com/maps/documentation/javascript/reference/map#MapMouseEvent).       |
| onDragStart | `(event: MapMouseEvent) => void` | On drag start event. See [`MapMouseEvent`](https://developers.google.com/maps/documentation/javascript/reference/map#MapMouseEvent). |
| onDragEnd   | `(event: MapMouseEvent) => void` | On drag end event. See [`MapMouseEvent`](https://developers.google.com/maps/documentation/javascript/reference/map#MapMouseEvent).   |

## Related Hooks

- [`useGMapsMarker`](/docs/hooks/use-gmaps-marker.md)

## Related Components

- [`<GMapsAnimatedMarker />`](/docs/components/gmaps-animated-marker.md)
