import * as React from "react";
import { useGMapInstance } from "../../hooks/use-gmap-instance";
import { useGMapSDK } from "../../hooks/use-gmap-sdk";
import { GMapMarker } from "../gmap-marker";
import { useGMapMarker } from "../../hooks/use-gmap-marker";
import { animation } from "../../lib/animation";
import { Animate } from "../../lib/animation/animate";

export namespace GMapAnimatedMarker {
  type Options = Pick<GMapMarker.Options, "location" | "zIndex"> & {
    duration?: number;
  };

  export type Props = React.PropsWithChildren<GMapMarker.Props & Options>;

  export type Animate = (options: Options) => void;

  export type Ref = GMapMarker.Ref & {
    animate: Animate;
  };
}

export const GMapAnimatedMarker = React.forwardRef<
  GMapAnimatedMarker.Ref,
  GMapAnimatedMarker.Props
>(({ location, zIndex, duration = 1000, ...props }, ref) => {
  const map = useGMapInstance();
  const google = useGMapSDK();
  const marker = useGMapMarker();

  const initialLocation = React.useRef(location);
  const runningAnimation = React.useRef<Animate | null>(null);

  const animate = React.useCallback<GMapAnimatedMarker.Animate>(
    (opts) => {
      if (!marker.current) return;

      if (runningAnimation.current) {
        runningAnimation.current.stop();
      }

      const lat = marker.current.location.lat();
      const lng = marker.current.location.lng();

      runningAnimation.current = animation.animate({
        duration: opts.duration || duration,
        easing: animation.easings.easeInOutCubic,
        tick: (t) => {
          const latDiff = opts.location.lat - lat;
          const lngDiff = opts.location.lng - lng;

          marker.current?.update({
            zIndex: opts.zIndex,
            location: {
              lat: lat + latDiff * t,
              lng: lng + lngDiff * t,
            },
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
    ...(marker.current as GMapMarker.Ref),
    animate,
  }));

  return (
    <GMapMarker ref={marker} location={initialLocation.current} {...props} />
  );
});
