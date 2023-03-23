import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSpotify, SpotifyActions } from "../contexts/SpotifyContext";

import Search from "../pages/search";
import Login from "../pages/login";
import PrivateRouter from "./PrivateRouter";
import Musics from "../pages/musics";
import Playlists from "../pages/playlists";
import Artists from "../pages/artists";
import Albums from "../pages/albums";
import Artist from "../pages/artist";
import Playlist from "../pages/playlist";
import Album from "../pages/album";
import Home from "../pages/home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRouter>
              <Home />
            </PrivateRouter>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRouter>
              <Search />
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
        <Route
          path="/artist/:id"
          element={
            <PrivateRouter>
              <Artist />
            </PrivateRouter>
          }
        />
        <Route
          path="/playlist/:id"
          element={
            <PrivateRouter>
              <Playlist />
            </PrivateRouter>
          }
        />
        <Route
          path="/album/:id"
          element={
            <PrivateRouter>
              <Album />
            </PrivateRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
