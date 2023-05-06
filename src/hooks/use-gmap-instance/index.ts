import * as React from "react";

export const GoogleMapInstance = React.createContext<google.maps.Map | null>(
  null
);

export const useGMapInstance = () => {
  return React.useContext(GoogleMapInstance);
};
