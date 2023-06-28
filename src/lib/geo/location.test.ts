import { describe, expect, it } from "vitest";
import { clampLatLng } from "./location";

describe("clampLatLng", () => {
  it("should clamp lat", () => {
    expect(clampLatLng({ lat: 100, lng: 0 })).toEqual({ lat: -80, lng: 0 });
    expect(clampLatLng({ lat: -100, lng: 0 })).toEqual({ lat: 80, lng: 0 });
  });

  it("should clamp lng", () => {
    expect(clampLatLng({ lat: 0, lng: 200 })).toEqual({ lat: 0, lng: -160 });
    expect(clampLatLng({ lat: 0, lng: -200 })).toEqual({ lat: 0, lng: 160 });
  });
});
