// SOURCE: https://easings.net/

export type EasingFunction = (t: number) => number;

export const linear: EasingFunction = (t) => t;

export const easeInOutCubic: EasingFunction = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
