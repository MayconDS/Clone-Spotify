import Header from "../../components/header/Header";
import { HiOutlineClock } from "react-icons/hi2";
import { useSpotify } from "../../contexts/SpotifyContext";
import "./styles.css";
import { useEffect, useState } from "react";
import CardMusicWithIndex from "../../components/CardMusicWithIndex/CardMusicWithIndex";
import Player from "../../components/Player/Player";
import Card from "../../components/card";

const Playlists = () => {
  const { state } = useSpotify();
  const [playlists, setPlaylists] = useState(state.data.playlists);
  useEffect(() => {
    setPlaylists(state.data.playlists);
  }, [state.data]);
  return (
    <>
      {state.song != null && <Player />}
      <div className="playlists-page">
        <Header />

        <div className="container-playlists">
          <div className="playlists">
            {playlists &&
              playlists.items.map((playlist: any, index: any) => (
                <Card data={playlist} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlists;
