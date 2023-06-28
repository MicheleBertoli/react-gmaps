import { utils } from "../utils";
import { clampLatLng } from "./location";
import { findShapeCenter } from "./shape";

export const interpolatePoint = (
  source: google.maps.LatLng | google.maps.LatLngLiteral,
  target: google.maps.LatLng | google.maps.LatLngLiteral,
  t: number
): google.maps.LatLngLiteral => {
  const sourceLat = utils.unwrapGetter(source?.lat) ?? 0;
  const sourceLng = utils.unwrapGetter(source?.lng) ?? 0;
  const targetLat = utils.unwrapGetter(target?.lat) ?? 0;
  const targetLng = utils.unwrapGetter(target?.lng) ?? 0;

  const lngIncrDistance = (360 + (180 + sourceLng) - (180 + targetLng)) % 360;
  const lngDecrDistance = (360 + (180 + targetLng) - (180 + sourceLng)) % 360;
  const latIncrDistance = (180 + (90 + sourceLat) - (90 + targetLat)) % 180;
  const latDecrDistance = (180 + (90 + targetLat) - (90 + sourceLat)) % 180;

  const lngDistance = Math.min(lngIncrDistance, lngDecrDistance);
  const latDistance = Math.min(latIncrDistance, latDecrDistance);

  // factors are used to determine if we should increment or decrement
  // so we always take the shortest path
  const lngFactor = lngIncrDistance >= lngDecrDistance ? 1 : -1;
  const latFactor = latIncrDistance >= latDecrDistance ? 1 : -1;

  const lat = sourceLat + latDistance * t * latFactor;
  const lng = sourceLng + lngDistance * t * lngFactor;

  return clampLatLng({
    lat,
    lng,
  });
};

const convulseShape = (
  shape: (google.maps.LatLng | google.maps.LatLngLiteral)[],
  t: number
): google.maps.LatLngLiteral[] => {
  const center = findShapeCenter(shape);

  return shape.map((point) => interpolatePoint(point, center, t));
};

const growShape = (
  shape: (google.maps.LatLng | google.maps.LatLngLiteral)[],
  t: number
): google.maps.LatLngLiteral[] => {
  const center = findShapeCenter(shape);

  return shape.map((point) => interpolatePoint(center, point, t));
};

export const interpolateLine = (
  source: (google.maps.LatLng | google.maps.LatLngLiteral)[],
  target: (google.maps.LatLng | google.maps.LatLngLiteral)[],
  t: number
): google.maps.LatLngLiteral[] => {
  const interpolatedLine = [];
  const length = Math.max(source.length, target.length);

  for (let i = 0; i < length; i++) {
    const sourcePoint = source[i] ?? source[source.length - 1];
    const targetPoint = target[i] ?? target[target.length - 1];

    if (!sourcePoint || !targetPoint) {
      continue;
    }

    interpolatedLine.push(interpolatePoint(sourcePoint, targetPoint, t));
  }

  return interpolatedLine;
};

export const interpolateShape = (
  source: (google.maps.LatLng | google.maps.LatLngLiteral)[] | undefined,
  target: (google.maps.LatLng | google.maps.LatLngLiteral)[] | undefined,
  t: number
): google.maps.LatLngLiteral[] => {
  if (source && target) return interpolateLine(source, target, t);
  if (source) return convulseShape(source, t);
  if (target) return growShape(target, t);

  return [];
};

export const interpolateShapes = (
  source: (google.maps.LatLng | google.maps.LatLngLiteral)[][],
  target: (google.maps.LatLng | google.maps.LatLngLiteral)[][],
  t: number
): google.maps.LatLngLiteral[][] => {
  const interpolatedLines = [];
  const length = Math.max(source.length, target.length);

  for (let i = 0; i < length; i++) {
    interpolatedLines.push(interpolateShape(source[i], target[i], t));
  }

  return interpolatedLines;
};
