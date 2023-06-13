import { useEffect } from "react";
import {
  GMaps,
  GMapsAnimatedPolygon,
  useGMapsAnimatedPolygon,
} from "@gmaps/reactjs";

const apiKey = import.meta.env.GMAPS_API_KEY || "YOUR API KEY";
const mapID = import.meta.env.GMAPS_MAP_ID || "YOUR MAP ID";

const defaultLocation = {
  lat: 24.886,
  lng: -70.268,
};

const outerPath = [
  { lat: 25.774, lng: -80.19 },
  { lat: 18.466, lng: -66.118 },
  { lat: 32.321, lng: -64.757 },
];
const innerPath = [
  { lat: 26.745, lng: -72.579 },
  { lat: 27.57, lng: -69.514 },
  { lat: 25.339, lng: -68.668 },
];

const paths = [outerPath, innerPath];

function App() {
  const polygon = useGMapsAnimatedPolygon();

  useEffect(() => {
    const id = setInterval(() => {
      polygon.current?.animate({
        duration: 1000,
        paths: paths.map((path) => {
          return path.map((p) => ({
            lat: p.lat + Math.random() * 5 - 0.5,
            lng: p.lng + Math.random() * 5 - 0.5,
          }));
        }),
      });
    }, 1000);

    return () => clearInterval(id);
  }, [polygon]);

  return (
    <div style={{ height: "100vh" }}>
      <GMaps
        loaderOptions={{ apiKey }}
        mapId={mapID}
        center={defaultLocation}
        zoom={5}
      >
        <GMapsAnimatedPolygon
          ref={polygon}
          paths={paths}
          strokeColor="#FF0000"
          fillColor="#FF0000"
        />
      </GMaps>
    </div>
  );
}

export default App;
