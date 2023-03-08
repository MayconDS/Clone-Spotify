import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/login";
import SpotifyServices from "./services/Api";
import { SpotifyProvider } from "./contexts/SpotifyContext";
import Router from "./routes/routes";

function App() {
  return (
    <SpotifyProvider>
      <Router />
    </SpotifyProvider>
  );
}

export default App;
