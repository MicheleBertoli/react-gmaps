import * as React from "react";
import { GMapsAnimatedMarker } from "../../components/gmaps-animated-marker";

export const useGMapsAnimatedMarker = () => {
  return React.useRef<GMapsAnimatedMarker.Ref | null>(null);
};
