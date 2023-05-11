import * as React from "react";
import { GMapsMarker } from "../../components/gmaps-marker";

export const useGMapsMarker = () => {
  return React.useRef<GMapsMarker.Ref | null>(null);
};
