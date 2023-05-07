import * as React from "react";
import { GMapAnimatedMarker } from "../../components/gmap-animated-marker";

export const useGMapAnimatedMarker = () => {
  return React.useRef<GMapAnimatedMarker.Ref | null>(null);
};
