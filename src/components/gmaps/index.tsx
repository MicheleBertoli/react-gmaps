import * as React from "react";
import { LoaderOptions } from "@googlemaps/js-api-loader";
import { useGMapsLoader } from "../../hooks/use-gmaps-loader";
import { GoogleMapContext, useGMapsSDK } from "../../hooks/use-gmaps-sdk";
import { GoogleMapInstance } from "../../hooks/use-gmaps-instance";

type GoogleMapProps = React.PropsWithChildren<
  google.maps.MapOptions & {
    loaderOptions?: Partial<LoaderOptions>;
  }
>;

type MapProps = React.PropsWithChildren<{
  options: google.maps.MapOptions;
}>;

const defaultMapOptions: google.maps.MapOptions = {
  center: { lat: 0, lng: 0 },
  zoom: 1,
};

const Map: React.FC<MapProps> = ({ children, options }) => {
  const google = useGMapsSDK();

  const [mapInstance, setMapInstance] = React.useState<google.maps.Map | null>(
    null
  );

  const onMount = React.useCallback(
    (node: HTMLDivElement) => {
      if (!node || !google) return;

      const map = new google.maps.Map(node, {
        ...defaultMapOptions,
        ...options,
      });

      setMapInstance(map);
    },
    [google]
  );

  return (
    <GoogleMapInstance.Provider value={mapInstance}>
      <div
        ref={onMount}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
    </GoogleMapInstance.Provider>
  );
};

export const GMaps: React.FC<GoogleMapProps> = ({
  children,
  loaderOptions = {},
  ...mapOptions
}) => {
  const google = useGMapsLoader(loaderOptions);

  if (!google) {
    return null;
  }

  return (
    <GoogleMapContext.Provider value={google}>
      <Map options={mapOptions}>{children}</Map>
    </GoogleMapContext.Provider>
  );
};
