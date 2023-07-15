# Animations

React GMaps provides animated components for most GoogleMaps features (markers, polygons, etc.).

## Easings

While using an animated component, you can pass an [easing function](https://easings.net/) to change the rate of the animation over time.

```jsx
import { easings } from "react-gmaps";

const marker = useGMapsAnimatedMarker();

marker.current?.animate({
  location,
  duration: 1500,
  easing: easings.easeInOutCubic,
});

<GMapsAnimatedMarker ref={marker} />;
```
