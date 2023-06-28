import { describe, expect, it } from "vitest";
import { findShapeCenter } from "./shape";

describe("findShapeCenter", () => {
  it("should find the center of a shape", () => {
    const shape = [
      { lat: 0, lng: 0 },
      { lat: 5, lng: 10 },
      { lat: 10, lng: 20 },
      { lat: 15, lng: 30 },
    ];

    expect(findShapeCenter(shape)).toEqual({ lat: 7.5, lng: 15 });
  });

  it("should handle negative coordinates", () => {
    const shape1 = [
      { lat: -5, lng: -10 },
      { lat: 0, lng: 0 },
      { lat: 5, lng: 10 },
    ];
    const shape2 = [
      { lat: -5, lng: -10 },
      { lat: 0, lng: -20 },
      { lat: 5, lng: -30 },
    ];

    expect(findShapeCenter(shape1)).toEqual({ lat: 0, lng: 0 });
    expect(findShapeCenter(shape2)).toEqual({ lat: 0, lng: -20 });
  });
});
