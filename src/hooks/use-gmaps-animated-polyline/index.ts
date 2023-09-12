import * as React from "react";
import { GMapsAnimatedPolyline } from "../../components/gmaps-animated-polyline";

export const useGMapsAnimatedPolyline = () => {
  return React.useRef<GMapsAnimatedPolyline.Ref | null>(null);
};
