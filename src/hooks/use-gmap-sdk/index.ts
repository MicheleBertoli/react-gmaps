import * as React from "react";

export const GoogleMapContext = React.createContext<typeof google | null>(null);

export const useGMapSDK = () => {
  return React.useContext(GoogleMapContext);
};
