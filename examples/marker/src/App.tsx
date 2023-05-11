import { GMapsMarker, GMaps } from "@gmaps/reactjs";

const apiKey = "YOUR API KEY";
const mapID = "YOUR MAP ID";

const defaultLocation = {
  // New York
  lat: 40.73061,
  lng: -73.935242,
};

function MyMarker() {
  return (
    <GMapsMarker location={defaultLocation}>
      <p style={{ backgroundColor: "red" }}>Hello World</p>
    </GMapsMarker>
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
