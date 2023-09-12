import * as React from "react";

export const GoogleMapInstance = React.createContext<google.maps.Map | null>(
  null
);

export const useGMapsInstance = () => {
  return React.useContext(GoogleMapInstance);
};
