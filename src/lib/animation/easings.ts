// SOURCE: https://easings.net/

export type EasingFunction = (t: number) => number;

export const linear: EasingFunction = (t) => t;

export const easeInSine: EasingFunction = (x: number): number => {
  return 1 - Math.cos((x * Math.PI) / 2);
};

export const easeOutSine: EasingFunction = (x: number): number => {
  return Math.sin((x * Math.PI) / 2);
};

export const easeInOutSine: EasingFunction = (x: number): number => {
  return -(Math.cos(Math.PI * x) - 1) / 2;
};

export const easeInQuad: EasingFunction = (x: number): number => {
  return x * x;
};

export const easeOutQuad: EasingFunction = (x: number): number => {
  return 1 - (1 - x) * (1 - x);
};

export const easeInOutQuad: EasingFunction = (x: number): number => {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

export const easeInCubic: EasingFunction = (x: number): number => {
  return x * x * x;
};

export const easeOutCubic: EasingFunction = (x: number): number => {
  return 1 - Math.pow(1 - x, 3);
};

export const easeInOutCubic: EasingFunction = (x: number): number => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export const easeInQuart: EasingFunction = (x: number): number => {
  return x * x * x * x;
};

export const easeOutQuart: EasingFunction = (x: number): number => {
  return 1 - Math.pow(1 - x, 4);
};

export const easeInOutQuart: EasingFunction = (x: number): number => {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
};

export const easeInQuint: EasingFunction = (x: number): number => {
  return x * x * x * x * x;
};

export const easeOutQuint: EasingFunction = (x: number): number => {
  return 1 - Math.pow(1 - x, 5);
};

export const easeInOutQuint: EasingFunction = (x: number): number => {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
};

export const easeInExpo: EasingFunction = (x: number): number => {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
};

export const easeOutExpo: EasingFunction = (x: number): number => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

export const easeInOutExpo: EasingFunction = (x: number): number => {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
};

export const easeInCirc: EasingFunction = (x: number): number => {
  return 1 - Math.sqrt(1 - Math.pow(x, 2));
};

export const easeOutCirc: EasingFunction = (x: number): number => {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
};

export const easeInOutCirc: EasingFunction = (x: number): number => {
  return x < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
};

export function easeInBack(x: number): number {
  const c1 = 1.70158;
  return (c1 + 1) * x * x * x - c1 * x * x;
}

export function easeOutBack(x: number): number {
  const c1 = 1.70158;
  return 1 + (c1 + 1) * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

export function easeInOutBack(x: number): number {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  return x < 0.5
    ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

export const easeInElastic: EasingFunction = (x: number): number => {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : -Math.pow(2, 10 * x - 10) *
      Math.sin((x * 10 - 10.75) * ((2 * Math.PI) / 3));
};

export const easeOutElastic: EasingFunction = (x: number): number => {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * ((2 * Math.PI) / 3)) +
      1;
};

export function easeInOutElastic(x: number): number {
  const c5 = (2 * Math.PI) / 4.5;
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
    : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
}

export function easeOutBounce(x: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) return n1 * x * x;
  else if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
  else if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
  else return n1 * (x -= 2.625 / d1) * x + 0.984375;
}

export const easeInBounce: EasingFunction = (x: number): number => {
  return 1 - easeOutBounce(1 - x);
};

export const easeInOutBounce: EasingFunction = (x: number): number => {
  return x < 0.5
    ? (1 - easeOutBounce(1 - 2 * x)) / 2
    : (1 + easeOutBounce(2 * x - 1)) / 2;
};
