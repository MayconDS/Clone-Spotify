import React, { useState, KeyboardEvent, useEffect } from "react";

import { FiSearch } from "react-icons/fi";

import SpotifyServices from "../../services/Api";
import {
  useSpotify,
  SpotifyProvider,
  SpotifyActions,
} from "../../contexts/SpotifyContext";

import "./styles.css";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
const Header = () => {
  const { state, dispatch } = useSpotify();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("track,playlist,album,episode,artist");
  const [filterActive, setFilterActive] = useState(state.filterActiveHeader);

  useEffect(() => {
    setFilterActive(state.filterActiveHeader);
  }, [state.filterActiveHeader]);

  useEffect(() => {
    const getMe = async () => {
      let data = await SpotifyServices.getMe();

      dispatch({
        type: SpotifyActions.setUser,
        payload: data,
      });
    };
    getMe();
  }, []);

  const handleButton = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilter(e.target.value);

    setFilterActive(e.target.value);
  };

  const handleInput = async (event: KeyboardEvent) => {
    if (event.key == "Enter") {
      let data = await SpotifyServices.search(search, filter);
      dispatch({
        type: SpotifyActions.setData,
        payload: data,
      });
    }
  };

  return (
    <header>
      <div className="header-top">
        <div className="search-input">
          <FiSearch />{" "}
          <input
            type="text"
            name=""
            id=""
            onKeyUp={handleInput}
            placeholder="artistas, tracks, álbuns, episódios"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {state.user.display_name && (
          <div className="user">
            <div className="icon">
              <AiOutlineUser />
            </div>
            <h1>{state.user.display_name.substring(0, 12)}</h1>
          </div>
        )}
      </div>
      <nav>
        <Link to="/search">
          {" "}
          <button
            style={{
              backgroundColor:
                filterActive == "track,playlist,album,episode,artist"
                  ? "white"
                  : "",
              color:
                filterActive == "track,playlist,album,episode,artist"
                  ? "black"
                  : "",
            }}
            value="track,playlist,album,episode,artist"
            onClick={function (e: any) {
              handleButton(e);
              dispatch({
                type: SpotifyActions.setActiveFilterHeader,
                payload: e.target.value,
              });
            }}
          >
            Tudo
          </button>
        </Link>
        <Link to="/search/tracks">
          <button
            style={{
              backgroundColor: filterActive == "track" ? "white" : "",
              color: filterActive == "track" ? "black" : "",
            }}
            value="track"
            onClick={function (e: any) {
              handleButton(e);
              dispatch({
                type: SpotifyActions.setActiveFilterHeader,
                payload: e.target.value,
              });
            }}
          >
            Músicas
          </button>
        </Link>
        <Link to="/search/playlists">
          <button
            style={{
              backgroundColor: filterActive == "playlist" ? "white" : "",
              color: filterActive == "playlist" ? "black" : "",
            }}
            value="playlist"
            onClick={function (e: any) {
              handleButton(e);
              dispatch({
                type: SpotifyActions.setActiveFilterHeader,
                payload: e.target.value,
              });
            }}
          >
            Playlists
          </button>
        </Link>
        <Link to="/search/artists">
          <button
            style={{
              backgroundColor: filterActive == "artist" ? "white" : "",
              color: filterActive == "artist" ? "black" : "",
            }}
            value="artist"
            onClick={function (e: any) {
              handleButton(e);
              dispatch({
                type: SpotifyActions.setActiveFilterHeader,
                payload: e.target.value,
              });
            }}
          >
            Artistas
          </button>
        </Link>
        <Link to="/search/albums">
          <button
            style={{
              backgroundColor: filterActive == "album" ? "white" : "",
              color: filterActive == "album" ? "black" : "",
            }}
            value="album"
            onClick={function (e: any) {
              handleButton(e);
              dispatch({
                type: SpotifyActions.setActiveFilterHeader,
                payload: e.target.value,
              });
            }}
          >
            Álbuns
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
