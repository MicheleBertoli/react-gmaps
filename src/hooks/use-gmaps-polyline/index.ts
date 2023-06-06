import * as React from "react";
import { GMapsPolyline } from "../../components/gmaps-polyline";

export const useGMapsPolyline = () => {
  return React.useRef<GMapsPolyline.Ref | null>(null);
};
