import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSpotify, SpotifyActions } from "../contexts/SpotifyContext";

import Home from "../pages/home";
import Search from "../pages/search";
import Login from "../pages/login";
import PrivateRouter from "./PrivateRouter";

const Router = () => {
  const { state, dispatch } = useSpotify();

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
        <Route path="/login" element={<Login />} />
        <Route
          path="/search"
          element={
            <PrivateRouter>
              <Search />
            </PrivateRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
