# `useGMapsAnimatedPolygon`

This hooks extends [`useGMapsPolygon`](/docs/hooks/use-gmaps-polygon.md) and adds a new `.animate()` method.

```jsx
const polygon = useGMapsAnimatedPolygon();
<GMapsAnimatedPolygon ref={polygon} />;

// update and animate the polygon
polygon.current?.animate({
  path,
  duration: 1000,
});
```

## Methods

| Name              | Type                                                                            | Description                                                        |
| ----------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `<ref>.animate()` | `(opts: GMapsPolygon.Options & { duration: number; easing: Function }) => void` | Update and animate the polygon options.                            |
| `...rest`         | `GMapsPolygon.Ref`                                                              | See [`useGMapsPolygon`](/docs/hooks/use-gmaps-polygon.md#methods). |

## Related Hooks

- [`useGMapsPolygon`](/docs/hooks/use-gmaps-polygon.md)

## Related Components

- [`<GMapsAnimatedPolygon />`](/docs/components/gmaps-animated-polygon.md)
