# `<GMapsAnimatedPolygon />`

<p align="center"><img width="800" src="/docs/assets/polygon-animated.gif" /></p>

Creates a new polygon with animated interpolation when updating the path. This components extends [`<GMapsPolygon />`](/docs/components/gmaps-polygon.md).

```jsx
<GMapsAnimatedPolygon
  path={[
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 },
  ]}
  duration={1000}
/>
```

<details>
<summary>Full example</summary>

```jsx
function MyMap() {
  const [path, setPath] = useState([
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 },
  ]);

  return (
    <div style={{ height: "100vh" }}>
      <GMaps center={{ lat: 0, lng: -180 }} zoom={3}>
        <GMapsAnimatedPolygon path={path} duration={1000} />
      </GMaps>
    </div>
  );
}
```

</details>

<details>
<summary>Animating the polygon programmatically</summary>

```jsx
const path = [
  { lat: 37.772, lng: -122.214 },
  { lat: 21.291, lng: -157.821 },
  { lat: -18.142, lng: 178.431 },
  { lat: -27.467, lng: 153.027 },
];

function App() {
  const polygon = useGMapsAnimatedPolygon();

  const updatePolygonPath = () => {
    // random new lat/lng near the base `path` for each point
    const newPath = path.map((point) => ({
      lat: point.lat + Math.random() * 0.08,
      lng: point.lng + Math.random() * 0.08,
    }));

    polygon.current?.animate({ path: newPath, duration: 1000 });
  };

  return (
    <div style={{ height: "100vh" }}>
      <button type="button" onClick={updatePolygonPath}>
        update polygon path
      </button>

      <GMaps center={{ lat: 0, lng: -180 }} zoom={3}>
        <GMapsAnimatedPolygon ref={polygon} path={path} />
      </GMaps>
    </div>
  );
}
```

</details>

## Props

| Name     | Type                    | Description                                                             |
| -------- | ----------------------- | ----------------------------------------------------------------------- |
| duration | `number`                | The duration in milliseconds of the interpolation animation.            |
| easing   | `(n: number) => number` | The easing function to use for the animation. See [`Easing`](#TODO).    |
| ...rest  | `GMapsPolygon.Props`    | See [`<GMapsPolygon />` Props](/docs/components/gmaps-polygon.md#props) |

## Related Hooks

- [`useGMapsAnimatedPolygon`](/docs/hooks/use-gmaps-animated-polygon.md)

## Related Components

- [`<GMapsPolygon />`](/docs/components/gmaps-polygon.md)
