import { useEffect } from "react";
import { GMapMarker, GMap, useGMapMarker } from "react-gmap";

const apiKey = "YOUR API KEY";
const mapID = "YOUR MAP ID";

const defaultLocation = {
  // New York
  lat: 40.73061,
  lng: -73.935242,
};

function MyMarker() {
  const marker = useGMapMarker();

  useEffect(() => {
    const id = setInterval(() => {
      const location = {
        lat: defaultLocation.lat + Math.random() * 0.08,
        lng: defaultLocation.lng + Math.random() * 0.08,
      };

      marker.current?.update({ location });
    }, 3000);

    return () => clearInterval(id);
  }, [marker]);

  return (
    <GMapMarker ref={marker} location={defaultLocation}>
      <p style={{ backgroundColor: "red" }}>
        Hello I'm a React Component,
        <br />
        randomly moving every 3s :D
      </p>
    </GMapMarker>
  );
}

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <GMap
        loaderOptions={{ apiKey }}
        mapId={mapID}
        center={defaultLocation}
        zoom={12}
      >
        <MyMarker />
      </GMap>
    </div>
  );
}

export default App;
