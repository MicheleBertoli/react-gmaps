import { EasingFunction, linear } from "./easings";

type AnimateOptions = {
  duration?: number;
  easing?: EasingFunction;
  tick: (t: number) => void;
  end?: () => void;
};

export type Animate = {
  stop: () => void;
};

export const animate = (opts: AnimateOptions): Animate => {
  const duration = opts.duration || 1000;
  const easing = opts.easing || linear;

  let stopped = false;
  let progress = 0; // from 0 to 1

  let last = Date.now();

  const run = () => {
    if (stopped) return;

    const now = Date.now();
    const elapsed = now - last;

    progress += elapsed / duration;
    last = now;

    opts.tick(easing(progress));

    if (progress < 1) requestAnimationFrame(run);
    else opts.end?.();
  };

  requestAnimationFrame(run);

  return {
    stop: () => {
      stopped = true;
      opts.end?.();
    },
  };
};
