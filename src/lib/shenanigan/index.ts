// This file is mainly composed of functions for dealing with
// weird google-map's SDK APIs

type Primitive = string | number | boolean | null | undefined;

const unwrapGetter = <T extends Primitive>(
  getter: T | ((...args: any[]) => T)
): T => {
  return typeof getter === "function" ? getter() : getter;
};

const unwrapLatLng = (
  latLng:
    | google.maps.LatLng
    | google.maps.LatLngLiteral
    | {
        lat(): number;
        lng(): number;
      }
): google.maps.LatLngLiteral => ({
  lat: unwrapGetter(latLng.lat),
  lng: unwrapGetter(latLng.lng),
});

const unwrapMVCArray = <T>(array: google.maps.MVCArray<T> | T[] = []): T[] => {
  if (array instanceof google.maps.MVCArray) {
    return array.getArray();
  }

  return array;
};

export const shenanigan = {
  unwrapGetter,
  unwrapLatLng,
  unwrapMVCArray,
};
