import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSpotify, SpotifyActions } from "../contexts/SpotifyContext";

import Home from "../pages/home";
import Search from "../pages/search";
import Login from "../pages/login";
import PrivateRouter from "./PrivateRouter";
import Musics from "../pages/musics";
import Playlists from "../pages/playlists";
import Artists from "../pages/artists";
import Albums from "../pages/albums";

const Router = () => {
  const { state, dispatch } = useSpotify();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/search"
          element={
            <PrivateRouter>
              <Home />
            </PrivateRouter>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/search/tracks"
          element={
            <PrivateRouter>
              <Musics />
            </PrivateRouter>
          }
        />
        <Route
          path="/search/playlists"
          element={
            <PrivateRouter>
              <Playlists />
            </PrivateRouter>
          }
        />
        <Route
          path="/search/artists"
          element={
            <PrivateRouter>
              <Artists />
            </PrivateRouter>
          }
        />
        <Route
          path="/search/albums"
          element={
            <PrivateRouter>
              <Albums />
            </PrivateRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
