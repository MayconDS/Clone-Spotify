import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/login";
import Router from "./routes/routes";
import { SpotifyProvider, useSpotify } from "./contexts/SpotifyContext";
import Player from "./components/Player/Player";

function App() {
  return (
    <SpotifyProvider>
      <Player />
      <Router />
    </SpotifyProvider>
  );
}

export default App;
