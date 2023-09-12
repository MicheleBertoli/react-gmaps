import * as React from "react";
import { useGMapsInstance } from "../../hooks/use-gmaps-instance";
import { useGMapsSDK } from "../../hooks/use-gmaps-sdk";
import { GMapsMarker } from "../gmaps-marker";
import { useGMapsMarker } from "../../hooks/use-gmaps-marker";
import { animation } from "../../lib/animation";
import { Animate } from "../../lib/animation/animate";
import { geo } from "../../lib/geo";
import { utils } from "../../lib/utils";
import { EasingFunction } from "../../lib/animation/easings";

export namespace GMapsAnimatedMarker {
  type Options = Pick<GMapsMarker.Options, "location" | "zIndex"> & {
    duration?: number;
    easing?: EasingFunction;
  };

  export type Props = React.PropsWithChildren<GMapsMarker.Props & Options>;

  export type Animate = (options: Options) => void;

  export type Ref = GMapsMarker.Ref & {
    animate: Animate;
  };
}

export const GMapsAnimatedMarker = React.forwardRef<
  GMapsAnimatedMarker.Ref,
  GMapsAnimatedMarker.Props
>(({ location, zIndex, duration = 1000, ...props }, ref) => {
  const map = useGMapsInstance();
  const google = useGMapsSDK();
  const marker = useGMapsMarker();

  const initialLocation = React.useRef(location);
  const runningAnimation = React.useRef<Animate | null>(null);

  const animate = React.useCallback<GMapsAnimatedMarker.Animate>(
    (opts) => {
      runningAnimation.current?.stop();

      if (!marker.current) return;

      const source = utils.unwrapLatLng(marker.current.location);
      const target = utils.unwrapLatLng(opts.location);

      runningAnimation.current = animation.animate({
        duration: opts.duration || duration,
        easing: opts.easing || animation.easings.easeInOutCubic,
        end: () => marker.current?.update(opts),
        tick: (t) => {
          marker.current?.update({
            ...opts,
            location: geo.interpolatePoint(source, target, t),
          });
        },
      });
    },
    [marker.current]
  );

  // updates
  React.useEffect(() => {
    if (!map || !google || !marker.current) return;

    animate({
      duration,
      location,
      zIndex,
    });
  }, [map, google, location, zIndex]);

  React.useImperativeHandle(ref, () => ({
    ...(marker.current as GMapsMarker.Ref),
    animate,
  }));

  return (
    <GMapsMarker ref={marker} location={initialLocation.current} {...props} />
  );
});
