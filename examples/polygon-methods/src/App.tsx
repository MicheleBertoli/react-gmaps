import { useEffect } from "react";
import { GMaps, GMapsPolygon, useGMapsPolygon } from "@gmaps/reactjs";

const apiKey = import.meta.env.GMAPS_API_KEY || "YOUR API KEY";
const mapID = import.meta.env.GMAPS_MAP_ID || "YOUR MAP ID";

const defaultLocation = {
  lat: 24.886,
  lng: -70.268,
};

const defaultPath = [
  { lat: 25.774, lng: -80.19 },
  { lat: 18.466, lng: -66.118 },
  { lat: 32.321, lng: -64.757 },
];

function App() {
  const polygon = useGMapsPolygon();

  useEffect(() => {
    const id = setInterval(() => {
      polygon.current?.update({
        path: defaultPath.map((p) => ({
          lat: p.lat + Math.random() * 10 - 0.5,
          lng: p.lng + Math.random() * 10 - 0.5,
        })),
      });
    }, 2000);

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
        <GMapsPolygon
          ref={polygon}
          path={defaultPath}
          strokeColor="#FF0000"
          fillColor="#FF0000"
        />
      </GMaps>
    </div>
  );
}

export default App;
