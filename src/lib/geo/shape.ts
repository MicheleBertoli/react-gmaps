import { utils } from "../utils";
import { clampLatLng } from "./location";

export const findShapeCenter = (
  shape: (google.maps.LatLng | google.maps.LatLngLiteral)[]
) => {
  let north = -90;
  let south = 90;
  let east = -180;
  let west = 180;

  for (const point of shape) {
    const { lat, lng } = clampLatLng(utils.unwrapLatLng(point));

    if (lat > north) north = lat;
    if (lat < south) south = lat;
    if (lng > east) east = lng;
    if (lng < west) west = lng;
  }

  return {
    lat: (north + south) / 2,
    lng: (east + west) / 2,
  };
};
