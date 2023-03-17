import { GrHomeRounded } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";

import "./styles.css";
import { useEffect, useState } from "react";
import SpotifyServices from "../../services/Api";
import { Link } from "react-router-dom";
import { useSpotify, SpotifyActions } from "../../contexts/SpotifyContext";

const Sidebar = () => {
  const { state, dispatch } = useSpotify();
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const getMyPlaylists = async () => {
      let data = await SpotifyServices.getMyPlaylists();
      setPlaylists(data.items);
    };
    getMyPlaylists();
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
      dispatch({
        type: SpotifyActions.setWindowWidth,
        payload: window.innerWidth,
      });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="sidebar">
      <header>
        <div className="items">
          <div className="item">
            <Link to="/">
              <svg
                className="home"
                role="img"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-encore-id="icon"
              >
                <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"></path>
              </svg>
              {state.windowWidth <= 600 ? null : "Inicio"}
            </Link>
          </div>
          <div className="item">
            <Link to="/search">
              <FiSearch />
              {state.windowWidth <= 600 ? null : "Buscar"}
            </Link>
          </div>
        </div>
      </header>
      <div className="line"></div>
      <div className="playlists">
        {playlists
          ? playlists.map((playlist: any) => (
              <Link to={`/playlist/${playlist.id}`}>
                {state.windowWidth <= 600
                  ? playlist.name.substring(0, 4) + "..."
                  : playlist.name.substring(0, 12)}
              </Link>
            ))
          : null}
      </div>
      <div className="copyright">
        <span>©️ Spotify</span>
      </div>
    </div>
  );
};

export default Sidebar;
