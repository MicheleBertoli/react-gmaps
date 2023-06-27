# `<GMaps />`

This components is used to render a new Map.

⚠️ Similarly to using the official GoogleMaps SDK, **you MUST wrap the `<GMaps />` components in a DOM element with a defined height** (`auto`, `fit-content`, etc. won't work). See [Map DOM Element](https://developers.google.com/maps/documentation/javascript/overview#Map_DOM_Elements).

```jsx
function MyMap() {
  return (
    <div style={{ height: "100vh" }}>
      <GMaps />
    </div>
  );
}
```

## Props

| Name          | Type            | Description                                                                                                                     |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| loaderOptions | `LoaderOptions` | See [`LoaderOptions`](https://github.com/googlemaps/js-api-loader/blob/main/src/index.ts#L45) from `@googlemaps/js-api-loader`. |
| ...rest       | `MapOptions`    | See [`MapOptions`](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions) from GoogleMaps.       |

## Related Hooks

- [`useGMapsSDK`](/docs/hooks/use-gmaps-sdk.md)
- [`useGMapsInstance`](/docs/hooks/use-gmaps-instance.md)
