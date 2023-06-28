import { describe, expect, it } from "vitest";
import {
  interpolateLine,
  interpolatePoint,
  interpolateShape,
} from "./interpolation";

describe("interpolatePoint", () => {
  it("should interpolate a point", () => {
    const point = {
      start: { lat: 0, lng: 0 },
      middle: { lat: 22.5, lng: 45 },
      end: { lat: 45, lng: 90 },
    };

    expect(interpolatePoint(point.start, point.end, 0)).toEqual(point.start);
    expect(interpolatePoint(point.start, point.end, 0.5)).toEqual(point.middle);
    expect(interpolatePoint(point.start, point.end, 1)).toEqual(point.end);
  });

  it("should interpolate using the shortest path", () => {
    const positive = {
      start: { lat: 0, lng: 0 },
      middle: { lat: 22.5, lng: 45 },
      end: { lat: 45, lng: 90 },
    };
    const negative = {
      start: { lat: 0, lng: 0 },
      middle: { lat: -22.5, lng: -45 },
      end: { lat: -45, lng: -90 },
    };

    expect(interpolatePoint(positive.start, positive.end, 0.5)).toEqual(
      positive.middle
    );
    expect(interpolatePoint(negative.start, negative.end, 0.5)).toEqual(
      negative.middle
    );
  });

  it("should clamp the result", () => {
    const point = {
      start: { lat: 80, lng: 170 },
      end: { lat: -80, lng: -170 },
    };

    expect(interpolatePoint(point.start, point.end, 0.5)).toEqual({
      lat: 90,
      lng: 180,
    });
    expect(interpolatePoint(point.start, point.end, 0.75)).toEqual({
      lat: -85,
      lng: -175,
    });
  });
});

describe("interpolateLine", () => {
  it("should interpolate a line", () => {
    const source = [
      { lat: 0, lng: 0 },
      { lat: 5, lng: 10 },
      { lat: 10, lng: 20 },
      { lat: 15, lng: 30 },
    ];
    const target = [
      { lat: 5, lng: 10 },
      { lat: 10, lng: 20 },
      { lat: 15, lng: 30 },
      { lat: 20, lng: 40 },
    ];
    const interpolated = [
      { lat: 2.5, lng: 5 },
      { lat: 7.5, lng: 15 },
      { lat: 12.5, lng: 25 },
      { lat: 17.5, lng: 35 },
    ];

    expect(interpolateLine(source, target, 0)).toEqual(source);
    expect(interpolateLine(source, target, 0.5)).toEqual(interpolated);
    expect(interpolateLine(source, target, 1)).toEqual(target);
  });

  it("should regroup removed points", () => {
    const source = [
      { lat: 0, lng: 0 },
      { lat: 5, lng: 10 },
      { lat: 10, lng: 20 },
      { lat: 15, lng: 30 },
    ];
    const target = [
      { lat: 5, lng: 10 },
      { lat: 10, lng: 20 },
    ];
    const interpolated = [
      { lat: 2.5, lng: 5 },
      { lat: 7.5, lng: 15 },
      { lat: 10, lng: 20 },
      { lat: 12.5, lng: 25 },
    ];

    expect(interpolateLine(source, target, 0)).toEqual(source);
    expect(interpolateLine(source, target, 0.5)).toEqual(interpolated);
    expect(interpolateLine(source, target, 1)).toEqual([
      ...target,
      // regrouped points should be the same as the last point of the target
      source[2],
      source[2],
    ]);
  });

  it("should grow-out added points", () => {
    const source = [
      { lat: 0, lng: 0 },
      { lat: 5, lng: 10 },
    ];
    const target = [
      { lat: 5, lng: 10 },
      { lat: 10, lng: 20 },
      { lat: 10, lng: 20 },
      { lat: 15, lng: 30 },
    ];
    const interpolated = [
      { lat: 2.5, lng: 5 },
      { lat: 7.5, lng: 15 },
      { lat: 7.5, lng: 15 },
      { lat: 10, lng: 20 },
    ];

    expect(interpolateLine(source, target, 0)).toEqual([
      ...source,
      source[1],
      source[1],
    ]);
    expect(interpolateLine(source, target, 0.5)).toEqual(interpolated);
    expect(interpolateLine(source, target, 1)).toEqual(target);
  });
});

describe("interpolateShape", () => {
  it("should interpolate a shape", () => {
    const source = [
      { lat: 0, lng: 0 },
      { lat: 5, lng: 10 },
      { lat: 10, lng: 20 },
      { lat: 15, lng: 30 },
    ];
    const target = [
      { lat: 5, lng: 10 },
      { lat: 10, lng: 20 },
      { lat: 15, lng: 30 },
      { lat: 20, lng: 40 },
    ];
    const interpolated = [
      { lat: 2.5, lng: 5 },
      { lat: 7.5, lng: 15 },
      { lat: 12.5, lng: 25 },
      { lat: 17.5, lng: 35 },
    ];

    expect(interpolateShape(source, target, 0)).toEqual(source);
    expect(interpolateShape(source, target, 0.5)).toEqual(interpolated);
    expect(interpolateShape(source, target, 1)).toEqual(target);
  });

  it("should convulse when no target is given", () => {
    const source = [
      { lat: 0, lng: 0 },
      { lat: 5, lng: 10 },
      { lat: 10, lng: 20 },
      { lat: 15, lng: 30 },
    ];
    const target = [
      { lat: 7.5, lng: 15 },
      { lat: 7.5, lng: 15 },
      { lat: 7.5, lng: 15 },
      { lat: 7.5, lng: 15 },
    ];
    const interpolated = [
      { lat: 3.75, lng: 7.5 },
      { lat: 6.25, lng: 12.5 },
      { lat: 8.75, lng: 17.5 },
      { lat: 11.25, lng: 22.5 },
    ];

    expect(interpolateShape(source, undefined, 0)).toEqual(source);
    expect(interpolateShape(source, undefined, 0.5)).toEqual(interpolated);
    expect(interpolateShape(source, undefined, 1)).toEqual(target);
  });

  it("should grow-out when no source is given", () => {
    const source = [
      { lat: 7.5, lng: 15 },
      { lat: 7.5, lng: 15 },
      { lat: 7.5, lng: 15 },
      { lat: 7.5, lng: 15 },
    ];
    const target = [
      { lat: 0, lng: 0 },
      { lat: 5, lng: 10 },
      { lat: 10, lng: 20 },
      { lat: 15, lng: 30 },
    ];
    const interpolated = [
      { lat: 3.75, lng: 7.5 },
      { lat: 6.25, lng: 12.5 },
      { lat: 8.75, lng: 17.5 },
      { lat: 11.25, lng: 22.5 },
    ];

    expect(interpolateShape(undefined, target, 0)).toEqual(source);
    expect(interpolateShape(undefined, target, 0.5)).toEqual(interpolated);
    expect(interpolateShape(undefined, target, 1)).toEqual(target);
  });
});
