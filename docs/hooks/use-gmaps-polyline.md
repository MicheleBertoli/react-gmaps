# `useGMapsPolyline`

This hooks enables you to access the [`<GMapsPolyline />`](/docs/components/gmaps-polyline.md) `ref` to update the polyline programmatically.

```jsx
const polyline = useGMapsPolyline();
<GMapsPolyline ref={polyline} />;

// get an option's current state
const path = polyline.current?.get("path");

// update the polyline
polyline.current?.update({ path });

// listen to an event
const unsub = polyline.current?.on("click", () => {
  console.log("clicked");
});
unsub(); // remove the event listenner
```

## Methods

| Name             | Type                                                                                    | Description                                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `<ref>.get()`    | `<T extends keyof PolylineOptions>(name: T) => PolylineOptions[T]`                      | See [`PolylineOptions`](https://developers.google.com/maps/documentation/javascript/reference/polyline#PolylineOptions). |
| `<ref>.update()` | `(opts: PolylineOptions) => void`                                                       | See [`PolylineOptions`](https://developers.google.com/maps/documentation/javascript/reference/polyline#PolylineOptions). |
| `<ref>.on()`     | `(event: "click" \| "drag" \| "dragend" \| "dragstart", handler: Function) => Function` | Listen to an event. Returns a function to remove the listenner.                                                          |

## Related Hooks

- [`useGMapsAnimatedPolyline`](/docs/hooks/use-gmaps-animated-polyline.md)

## Related Components

- [`<GMapsPolyline />`](/docs/components/gmaps-polyline.md)
