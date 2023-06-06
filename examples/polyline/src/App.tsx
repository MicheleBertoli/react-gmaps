import { GMaps, GMapsPolyline } from "@gmaps/reactjs";

const apiKey = import.meta.env.GMAPS_API_KEY || "YOUR API KEY";
const mapID = import.meta.env.GMAPS_MAP_ID || "YOUR MAP ID";

const defaultLocation = {
  lat: 0,
  lng: -180,
};

const defaultPath = [
  { lat: 37.772, lng: -122.214 },
  { lat: 21.291, lng: -157.821 },
  { lat: -18.142, lng: 178.431 },
  { lat: -27.467, lng: 153.027 },
];

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <GMaps
        loaderOptions={{ apiKey }}
        mapId={mapID}
        center={defaultLocation}
        zoom={3}
      >
        <GMapsPolyline path={defaultPath} />
      </GMaps>
    </div>
  );
}

export default App;
