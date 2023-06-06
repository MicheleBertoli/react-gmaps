import { useEffect } from "react";
import {
  GMaps,
  useGMapsAnimatedMarker,
  GMapsAnimatedMarker,
} from "@gmaps/reactjs";

const apiKey = import.meta.env.GMAPS_API_KEY || "YOUR API KEY";
const mapID = import.meta.env.GMAPS_MAP_ID || "YOUR MAP ID";

const defaultLocation = {
  // New York
  lat: 40.73061,
  lng: -73.935242,
};

function MyMarker() {
  const marker = useGMapsAnimatedMarker();

  useEffect(() => {
    const id = setInterval(() => {
      const location = {
        lat: defaultLocation.lat + Math.random() * 0.08,
        lng: defaultLocation.lng + Math.random() * 0.08,
      };

      marker.current?.animate({
        location,
        duration: 1500,
      });
    }, 2000);

    return () => clearInterval(id);
  }, [marker]);

  return (
    <GMapsAnimatedMarker ref={marker} location={defaultLocation}>
      <p style={{ backgroundColor: "red" }}>
        Hello I'm a React Component,
        <br />
        randomly moving every 2s :D
      </p>
    </GMapsAnimatedMarker>
  );
}

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <GMaps
        loaderOptions={{ apiKey }}
        mapId={mapID}
        center={defaultLocation}
        zoom={12}
      >
        <MyMarker />
      </GMaps>
    </div>
  );
}

export default App;
