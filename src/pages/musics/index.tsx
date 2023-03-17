import Header from "../../components/header/Header";
import { HiOutlineClock } from "react-icons/hi2";
import { useSpotify } from "../../contexts/SpotifyContext";
import "./styles.css";
import { useEffect, useState } from "react";
import CardMusicWithIndex from "../../components/CardMusicWithIndex/CardMusicWithIndex";
import Player from "../../components/Player/Player";
import Sidebar from "../../components/sidebar";
const Musics = () => {
  const { state } = useSpotify();
  const [tracks, setTracks] = useState(state.data.tracks);
  useEffect(() => {
    setTracks(state.data.tracks);
  }, [state.data]);
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      {state.song != null && <Player />}
      <div className="tracks-page">
        <Header />

        <div className="container-tracks">
          <div className="header-tracks">
            <h1 style={{ display: "flex", gap: "18px", marginLeft: "23px" }}>
              {" "}
              <span>#</span> Título
            </h1>
            {state.windowWidth >= 1140 ? <h1>Álbum</h1> : null}
            <h1>
              <HiOutlineClock />
            </h1>
          </div>
          <div className="tracks">
            {tracks &&
              tracks.items.map((track: any, index: any) => (
                <CardMusicWithIndex track={track} index={index + 1} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Musics;
