import * as React from "react";
import { GMapMarker } from "../../components/gmap-marker";

export const useGMapMarker = () => {
  return React.useRef<GMapMarker.Ref | null>(null);
};
