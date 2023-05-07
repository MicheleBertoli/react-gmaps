import { useEffect } from "react";
import { GMap, useGMapAnimatedMarker, GMapAnimatedMarker } from "react-gmap";

const apiKey = "YOUR API KEY";
const mapID = "YOUR MAP ID";

const defaultLocation = {
  // New York
  lat: 40.73061,
  lng: -73.935242,
};

function MyMarker() {
  const marker = useGMapAnimatedMarker();

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
    <GMapAnimatedMarker ref={marker} location={defaultLocation}>
      <p style={{ backgroundColor: "red" }}>
        Hello I'm a React Component,
        <br />
        randomly moving every 2s :D
      </p>
    </GMapAnimatedMarker>
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
