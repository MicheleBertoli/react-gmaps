# `useGMapsInstance`

This hooks returns the [`google.maps.Map`](https://developers.google.com/maps/documentation/javascript/reference/map#Map) instance that is created by the `<GMaps />` component. It can be used to programmatically set the center, zoom, rotation, etc. of the map.

```jsx
// !! will only work inside a children component of <GMaps /> !!
const map = useGMapsInstance();

map.setCenter({ lat: 0, lng: 0 }})
```
