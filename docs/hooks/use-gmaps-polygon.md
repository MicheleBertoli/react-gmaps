# `useGMapsPolygon`

This hooks enables you to access the [`<GMapsPolygon />`](/docs/components/gmaps-polygon.md) `ref` to update the polygon programmatically.

```jsx
const polygon = useGMapsPolygon();
<GMapsPolygon ref={polygon} />;

// get an option's current state
const path = polygon.current?.get("path");

// update the polygon
polygon.current?.update({ path });

// listen to an event
const unsub = polygon.current?.on("click", () => {
  console.log("clicked");
});
unsub(); // remove the event listenner
```

## Methods

| Name             | Type                                                                                    | Description                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `<ref>.get()`    | `<T extends keyof PolygonOptions>(name: T) => PolygonOptions[T]`                        | See [`PolygonOptions`](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolygonOptions). |
| `<ref>.update()` | `(opts: PolygonOptions) => void`                                                        | See [`PolygonOptions`](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolygonOptions). |
| `<ref>.on()`     | `(event: "click" \| "drag" \| "dragend" \| "dragstart", handler: Function) => Function` | Listen to an event. Returns a function to remove the listenner.                                                       |

## Related Hooks

- [`useGMapsAnimatedPolygon`](/docs/hooks/use-gmaps-animated-polygon.md)

## Related Components

- [`<GMapsPolygon />`](/docs/components/gmaps-polygon.md)
