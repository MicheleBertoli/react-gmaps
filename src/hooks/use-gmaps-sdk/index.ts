import * as React from "react";

export const GoogleMapContext = React.createContext<typeof google | null>(null);

export const useGMapsSDK = () => {
  return React.useContext(GoogleMapContext);
};
