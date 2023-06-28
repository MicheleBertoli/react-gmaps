import * as React from "react";
import { useGMapsInstance } from "../../hooks/use-gmaps-instance";
import { useGMapsSDK } from "../../hooks/use-gmaps-sdk";
import { animation } from "../../lib/animation";
import { Animate } from "../../lib/animation/animate";
import { useGMapsPolyline } from "../../hooks/use-gmaps-polyline";
import { GMapsPolyline } from "../gmaps-polyline";
import { geo } from "../../lib/geo";
import { EasingFunction } from "../../lib/animation/easings";

export namespace GMapsAnimatedPolyline {
  type Options = Pick<GMapsPolyline.Options, "path" | "zIndex"> & {
    duration?: number;
    easing?: EasingFunction;
  };

  export type Props = React.PropsWithChildren<GMapsPolyline.Props & Options>;

  export type Animate = (options: Options) => void;

  export type Ref = GMapsPolyline.Ref & {
    animate: Animate;
  };
}

export const GMapsAnimatedPolyline = React.forwardRef<
  GMapsAnimatedPolyline.Ref,
  GMapsAnimatedPolyline.Props
>(({ path, zIndex, duration = 1000, ...props }, ref) => {
  const map = useGMapsInstance();
  const google = useGMapsSDK();
  const polyline = useGMapsPolyline();

  const initialPath = React.useRef(path);
  const runningAnimation = React.useRef<Animate | null>(null);

  const animate = React.useCallback<GMapsAnimatedPolyline.Animate>(
    (opts) => {
      runningAnimation.current?.stop();

      const sourcePath = polyline.current?.get("path");
      const targetPath = opts.path;

      // nothing to animate
      if (!sourcePath || !targetPath) {
        polyline.current?.update(opts);
        return;
      }

      runningAnimation.current = animation.animate({
        duration: opts.duration || duration,
        easing: opts.easing || animation.easings.easeInOutCubic,
        end: () => polyline.current?.update(opts),
        tick: (t) => {
          polyline.current?.update({
            ...opts,
            path: geo.interpolateLine(sourcePath, targetPath, t),
          });
        },
      });
    },
    [polyline.current]
  );

  // updates
  React.useEffect(() => {
    if (!map || !google || !polyline.current) return;

    animate({
      duration,
      path,
      zIndex,
    });
  }, [map, google, location, zIndex]);

  React.useImperativeHandle(ref, () => ({
    ...(polyline.current as GMapsPolyline.Ref),
    animate,
  }));

  return <GMapsPolyline ref={polyline} path={initialPath.current} {...props} />;
});
