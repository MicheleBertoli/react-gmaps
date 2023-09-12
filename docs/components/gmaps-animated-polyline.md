# `<GMapsAnimatedPolyline />`

<p align="center"><img width="800" src="/docs/assets/polyline-animated.gif" /></p>

Creates a new polyline with animated interpolation when updating the path. This components extends [`<GMapsPolyline />`](/docs/components/gmaps-polyline.md).

```jsx
<GMapsAnimatedPolyline
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
        <GMapsAnimatedPolyline path={path} duration={1000} />
      </GMaps>
    </div>
  );
}
```

</details>

<details>
<summary>Animating the polyline programmatically</summary>

```jsx
const path = [
  { lat: 37.772, lng: -122.214 },
  { lat: 21.291, lng: -157.821 },
  { lat: -18.142, lng: 178.431 },
  { lat: -27.467, lng: 153.027 },
];

function App() {
  const polyline = useGMapsAnimatedPolyline();

  const updatePolylinePath = () => {
    // random new lat/lng near the base `path` for each point
    const newPath = path.map((point) => ({
      lat: point.lat + Math.random() * 0.08,
      lng: point.lng + Math.random() * 0.08,
    }));

    polyline.current?.animate({ path: newPath, duration: 1000 });
  };

  return (
    <div style={{ height: "100vh" }}>
      <button type="button" onClick={updatePolylinePath}>
        update polyline path
      </button>

      <GMaps center={{ lat: 0, lng: -180 }} zoom={3}>
        <GMapsAnimatedPolyline ref={polyline} path={path} />
      </GMaps>
    </div>
  );
}
```

</details>

## Props

| Name     | Type                    | Description                                                               |
| -------- | ----------------------- | ------------------------------------------------------------------------- |
| duration | `number`                | The duration in milliseconds of the interpolation animation.              |
| easing   | `(n: number) => number` | The easing function to use for the animation. See [`Easing`](#TODO).      |
| ...rest  | `GMapsPolyline.Props`   | See [`<GMapsPolyline />` Props](/docs/components/gmaps-polyline.md#props) |

## Related Hooks

- [`useGMapsAnimatedPolyline`](/docs/hooks/use-gmaps-animated-polyline.md)

## Related Components

- [`<GMapsPolyline />`](/docs/components/gmaps-polyline.md)
