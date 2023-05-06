import { GMapMarker, GMap } from "react-gmap";

const apiKey = "YOUR API KEY";
const mapID = "YOUR MAP ID";

const defaultLocation = {
  // New York
  lat: 40.73061,
  lng: -73.935242,
};

function MyMarker() {
  return (
    <GMapMarker location={defaultLocation}>
      <p style={{ backgroundColor: "red" }}>Hello World</p>
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
