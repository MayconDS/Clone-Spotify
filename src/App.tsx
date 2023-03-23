import Router from "./routes/routes";
import { SpotifyProvider } from "./contexts/SpotifyContext";
import Player from "./components/Player/Player";

import "./App.css";
function App() {
  return (
    <SpotifyProvider>
      <Player />
      <Router />
    </SpotifyProvider>
  );
}

export default App;
