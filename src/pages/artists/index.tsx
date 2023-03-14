import Header from "../../components/header/Header";
import { HiOutlineClock } from "react-icons/hi2";
import { useSpotify } from "../../contexts/SpotifyContext";
import "./styles.css";
import { useEffect, useState } from "react";
import CardMusicWithIndex from "../../components/CardMusicWithIndex/CardMusicWithIndex";
import Player from "../../components/Player/Player";
import Card from "../../components/card";
import CardArtist from "../../components/cardArtist/CardArtist";

const Artists = () => {
  const { state } = useSpotify();
  const [artists, setArtists] = useState(state.data.artists);
  useEffect(() => {
    setArtists(state.data.artists);
  }, [state.data]);
  return (
    <>
      {state.song != null && <Player />}
      <div className="artists-page">
        <Header />

        <div className="container-artists">
          <div className="artists">
            {artists &&
              artists.items.map((playlist: any, index: any) => (
                <CardArtist data={playlist} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Artists;
