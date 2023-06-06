export const clampLat = (lat: number) => {
  if (lat > 90) return lat - 180;
  if (lat < -90) return lat + 180;
  return lat;
};

export const clampLng = (lng: number) => {
  if (lng > 180) return lng - 360;
  if (lng < -180) return lng + 360;
  return lng;
};

export const clampLatLng = (latLng: google.maps.LatLngLiteral) => ({
  lat: clampLat(latLng.lat),
  lng: clampLng(latLng.lng),
});
