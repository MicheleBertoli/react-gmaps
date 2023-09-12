import * as React from "react";
import { GMapsPolygon } from "../../components/gmaps-polygon";

export const useGMapsPolygon = () => {
  return React.useRef<GMapsPolygon.Ref | null>(null);
};
