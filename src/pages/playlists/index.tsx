import Header from "../../components/header/Header";
import { HiOutlineClock } from "react-icons/hi2";
import { useSpotify, SpotifyActions } from "../../contexts/SpotifyContext";
import "./styles.css";
import { useEffect, useState } from "react";
import Card from "../../components/card";
import Sidebar from "../../components/sidebar";
import { SpotifyAlbumsAndPlaylists } from "../../Types/AllTypes";

const Playlists = () => {
  const { state, dispatch } = useSpotify();
  const [playlists, setPlaylists] = useState(state.data.playlists);

  useEffect(() => {
    dispatch({
      type: SpotifyActions.setActiveFilterHeader,
      payload: "playlist",
    });
  }, []);

  useEffect(() => {
    setPlaylists(state.data.playlists);
  }, [state.data]);
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="playlists-page">
        <Header />

        <div className="container-playlists">
          <div className="playlists">
            {playlists &&
              playlists.items.map(
                (playlist: SpotifyAlbumsAndPlaylists, index: number) => (
                  <Card data={playlist} type="playlist" key={index} />
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlists;
