# `useGMapsAnimatedPolyline`

This hooks extends [`useGMapsPolyline`](/docs/hooks/use-gmaps-polyline.md) and adds a new `.animate()` method.

```jsx
const polyline = useGMapsAnimatedPolyline();
<GMapsAnimatedPolyline ref={polyline} />;

// update and animate the polyline
polyline.current?.animate({
  path,
  duration: 1000,
});
```

## Methods

| Name              | Type                                                                             | Description                                                          |
| ----------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `<ref>.animate()` | `(opts: GMapsPolyline.Options & { duration: number; easing: Function }) => void` | Update and animate the polyline options.                             |
| `...rest`         | `GMapsPolyline.Ref`                                                              | See [`useGMapsPolyline`](/docs/hooks/use-gmaps-polyline.md#methods). |

## Related Hooks

- [`useGMapsPolyline`](/docs/hooks/use-gmaps-polyline.md)

## Related Components

- [`<GMapsAnimatedPolyline />`](/docs/components/gmaps-animated-polyline.md)
