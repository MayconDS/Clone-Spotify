import Header from "../../components/header/Header";
import { HiOutlineClock } from "react-icons/hi2";
import { useSpotify } from "../../contexts/SpotifyContext";
import "./styles.css";
import { useEffect, useState } from "react";
import CardMusicWithIndex from "../../components/CardMusicWithIndex/CardMusicWithIndex";
import Player from "../../components/Player/Player";
import Card from "../../components/card";
import Sidebar from "../../components/sidebar";

const Playlists = () => {
  const { state } = useSpotify();
  const [playlists, setPlaylists] = useState(state.data.playlists);
  useEffect(() => {
    setPlaylists(state.data.playlists);
  }, [state.data]);
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      {state.song != null && <Player />}
      <div className="playlists-page">
        <Header />

        <div className="container-playlists">
          <div className="playlists">
            {playlists &&
              playlists.items.map((playlist: any, index: number) => (
                <Card data={playlist} type="playlist" key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlists;
