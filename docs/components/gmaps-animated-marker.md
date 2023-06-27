# `<GMapsAnimatedMarker />`

<p align="center"><img width="800" src="/docs/assets/marker-animated.gif" /></p>

Creates a new marker with animated interpolation when updating the `lat`/`lnt`. This components extends [`<GMapsMarker />`](/docs/components/gmaps-marker.md).

```jsx
<GMapsAnimatedMarker location={{ lat: 40.73061, lng: -73.935242 }} duration={1000}>
  <p style={{ backgroundColor: "red" }}>Hello World</p>
</GMapsMarker>
```

<details>
<summary>Full example</summary>

```jsx

function MyMap() {
    const [location, setLocation] = useState({ lat: 40.73061, lng: -73.935242 });

  return (
    <div style={{ height: "100vh" }}>
      <GMaps center={location} zoom={12}>
        <GMapsAnimatedMarker location={{ lat: 40.73061, lng: -73.935242 }} duration={1000}>
          <p style={{ backgroundColor: "red" }}>Hello World</p>
        </GMapsMarker>
      </GMaps>
    </div>
  );
}
```

</details>

<details>
<summary>Animating the marker programmatically</summary>

```typescript
const location = { lat: 40.73061, lng: -73.935242 };

function App() {
  const marker = useGMapsAnimatedMarker();

  const updateMarkerLocation = () => {
    // random new lat/lng near the base `location`
    const newLocation = {
      lat: location.lat + Math.random() * 0.08,
      lng: location.lng + Math.random() * 0.08,
    };

    marker.current?.animate({
      location: newLocation,
      duration: 1000,
    });
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

| Name     | Type                    | Description                                                           |
| -------- | ----------------------- | --------------------------------------------------------------------- |
| duration | `number`                | The duration in milliseconds of the interpolation animation.          |
| easing   | `(n: number) => number` | The easing function to use for the animation. See [`Easing`](#TODO).  |
| ...rest  | `GMapsMarker.Props`     | See [`<GMapsMarker />` Props](/docs/components/gmaps-marker.md#props) |

## Related Hooks

- [`useGMapsAnimatedMarker`](/docs/hooks/use-gmaps-animated-marker.md)

## Related Components

- [`<GMapsMarker />`](/docs/components/gmaps-marker.md)
