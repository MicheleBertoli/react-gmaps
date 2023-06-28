import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { animate } from "./animate";

describe("animate", () => {
  const newAnimate = (config: Parameters<typeof animate>[0]) => {
    let resolve: (value: null) => void;

    const animation = animate({
      ...config,
      end: () => {
        config.end?.();
        resolve(null);
      },
    });

    const promise = new Promise((r) => {
      resolve = r;
    });

    return Object.assign(promise, animation);
  };

  beforeAll(() => {
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      setTimeout(cb, 0);
      return 0;
    });
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("tick", () => {
    it("should tick", async () => {
      let lastT = 0;

      await newAnimate({
        duration: 100,
        tick: (t) => {
          expect(t).toBeGreaterThanOrEqual(lastT);
          lastT = t;
        },
      });
    });
  });

  describe("easing", () => {
    it("should apply easing", async () => {
      const easing = vi.fn();

      await newAnimate({
        duration: 100,
        easing,
        tick: () => {},
      });

      expect(easing).toHaveBeenCalled();
    });
  });

  describe("end", () => {
    it("should call 'end' synchronously", async () => {
      const end = vi.fn();

      const animation = newAnimate({
        duration: 100,
        tick: () => {},
        end,
      });

      animation.stop();
      expect(end).toHaveBeenCalledOnce();

      await animation;

      expect(end).toHaveBeenCalledOnce();
    });
  });
});
