# `useGMapsMarker`

This hooks enables you to access the [`<GMapsMarker />`](/docs/components/gmaps-marker.md) `ref` to update the marker programmatically.

```jsx
const marker = useGMapsMarker();
<GMapsMarker ref={marker} />;

// get the lat/lng of the marker
const lat = marker.current?.location.lat();
const lng = marker.current?.location.lng();

// update the marker
marker.current?.update({ location: { lat, lng } });

// listen to an event
const unsub = marker.current?.on("click", () => {
  console.log("clicked");
});
unsub(); // remove the event listenner
```

## Methods

| Name                   | Type                                                                                    | Description                                                     |
| ---------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `<ref>.location.lat()` | `() => number`                                                                          | Get the current latitude of the marker.                         |
| `<ref>.location.lng()` | `() => number`                                                                          | Get the current longitude of the marker.                        |
| `<ref>.update()`       | `(opts: { location: LatLng, draggable: boolean, zIndex: number; }) => void`             | Update the marker options.                                      |
| `<ref>.on()`           | `(event: "click" \| "drag" \| "dragend" \| "dragstart", handler: Function) => Function` | Listen to an event. Returns a function to remove the listenner. |

## Related Hooks

- [`useGMapsAnimatedMarker`](/docs/hooks/use-gmaps-animated-marker.md)

## Related Components

- [`<GMapsMarker />`](/docs/components/gmaps-marker.md)
