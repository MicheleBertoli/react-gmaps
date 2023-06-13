import * as React from "react";
import { useGMapsInstance } from "../../hooks/use-gmaps-instance";
import { useGMapsSDK } from "../../hooks/use-gmaps-sdk";
import { animation } from "../../lib/animation";
import { Animate } from "../../lib/animation/animate";
import { geo } from "../../lib/geo";
import { EasingFunction } from "../../lib/animation/easings";
import { GMapsPolygon } from "../gmaps-polygon";
import { useGMapsPolygon } from "../../hooks/use-gmaps-polygon";

export namespace GMapsAnimatedPolygon {
  type Options = Pick<GMapsPolygon.Options, "path" | "paths" | "zIndex"> & {
    duration?: number;
    easing?: EasingFunction;
  };

  export type Props = React.PropsWithChildren<GMapsPolygon.Props & Options>;

  export type Animate = (options: Options) => void;

  export type Ref = GMapsPolygon.Ref & {
    animate: Animate;
  };
}

export const GMapsAnimatedPolygon = React.forwardRef<
  GMapsAnimatedPolygon.Ref,
  GMapsAnimatedPolygon.Props
>(({ path, zIndex, duration = 1000, ...props }, ref) => {
  const map = useGMapsInstance();
  const google = useGMapsSDK();
  const polyline = useGMapsPolygon();

  const initialPath = React.useRef(path);
  const runningAnimation = React.useRef<Animate | null>(null);

  const animate = React.useCallback<GMapsAnimatedPolygon.Animate>(
    (opts) => {
      const sourcePath = polyline.current?.get("path");
      const targetPath = opts.path;

      const sourcePaths = polyline.current?.get("paths");
      const targetPaths = opts.paths;

      const canAnimatePath = sourcePath && targetPath;
      const canAnimatePaths = sourcePaths?.length && targetPaths?.length;

      // nothing to animate
      if (!canAnimatePath && !canAnimatePaths) {
        polyline.current?.update(opts);
        return;
      }

      runningAnimation.current?.stop();
      runningAnimation.current = animation.animate({
        duration: opts.duration || duration,
        easing: opts.easing || animation.easings.easeInOutCubic,
        tick: (t) => {
          const lastFrame = t >= 1;
          if (lastFrame) {
            // make sure we end up with exact coordinates
            polyline.current?.update(opts);
            return;
          }

          if (canAnimatePath) {
            polyline.current?.update({
              ...opts,
              path: geo.interpolateLine(sourcePath, targetPath, t),
            });
          }

          if (canAnimatePaths) {
            polyline.current?.update({
              ...opts,
              paths: geo.interpolateLines(sourcePaths, targetPaths, t),
            });
          }
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
    ...(polyline.current as GMapsPolygon.Ref),
    animate,
  }));

  return <GMapsPolygon ref={polyline} path={initialPath.current} {...props} />;
});
