# `useGMapsSDK`

This hooks returns the [`google`](https://developers.google.com/maps/documentation/javascript/reference#top-level) instance that is loaded in the GMaps context and used to create the Map.

```jsx
// !! will only work inside a children component of <GMaps /> !!
const google = useGMapsSDK();

const { DirectionsService } = await google.maps.importLibrary("routes");
```

⚠️ Note that `useGMapsSDK` is just a wrapper around [`useContext`](https://react.dev/reference/react/useContext). The provider for this context is created by the `<GMaps />` component. It means, you're only going to be able to access the `google` instance using `useGMapsSDK` from a children of `<GMaps />`.

<details>
<summary>Full example</summary>

```jsx
function MyRoute({ origin, destination }) {
  const google = useGMapsSDK();

  const [path, setPath] = useState(null);

  onMount(async () => {
    const { DirectionsService } = await google.maps.importLibrary("routes");

    const directionsService = new DirectionsService();
    const route = await directionsService.route({ origin, destination, travelMode: "DRIVING" });

    setPath(routeToPath(route));
  });

  if (!route) return null;

  return <Poyline path={path} />;
}

function MyMap() {
  return (
    <div style={{ height: "100vh" }}>
      <GMaps>
        <MyRoute origin={...} destination={...} />
      </GMaps>
    </div>
  );
}
```

</details>
