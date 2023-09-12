# `useGMapsAnimatedMarker`

This hooks extends [`useGMapsMarker`](/docs/hooks/use-gmaps-marker.md) and adds a new `.animate()` method.

```jsx
const marker = useGMapsAnimatedMarker();
<GMapsAnimatedMarker ref={marker} />;

// update and animate the marker
marker.current?.animate({
  location: { lat, lng },
  duration: 1000,
});
```

## Methods

| Name              | Type                                                                           | Description                                                      |
| ----------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `<ref>.animate()` | `(opts: GMapsMarker.Options & { duration: number; easing: Function }) => void` | Update and animate the marker options.                           |
| `...rest`         | `GMapsMarker.Ref`                                                              | See [`useGMapsMarker`](/docs/hooks/use-gmaps-marker.md#methods). |

## Related Hooks

- [`useGMapsMarker`](/docs/hooks/use-gmaps-marker.md)

## Related Components

- [`<GMapsAnimatedMarker />`](/docs/components/gmaps-animated-marker.md)
