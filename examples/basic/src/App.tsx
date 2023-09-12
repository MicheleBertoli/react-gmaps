import { GMaps } from "react-gmaps";

const apiKey = import.meta.env.GMAPS_API_KEY || ""; // YOUR API KEY
const mapID = import.meta.env.GMAPS_MAP_ID || ""; // YOUR MAP ID

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <GMaps loaderOptions={{ apiKey }} mapId={mapID} />
    </div>
  );
}

export default App;
