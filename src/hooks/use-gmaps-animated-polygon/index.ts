import * as React from "react";
import { GMapsAnimatedPolygon } from "../../components/gmaps-animated-polygon";

export const useGMapsAnimatedPolygon = () => {
  return React.useRef<GMapsAnimatedPolygon.Ref | null>(null);
};
