import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/login";
import Router from "./routes/routes";
import { SpotifyProvider } from "./contexts/SpotifyContext";

function App() {
  return (
    <SpotifyProvider>
      <Router />
    </SpotifyProvider>
  );
}

export default App;
