import Header from "../../components/header/Header";
import { HiOutlineClock } from "react-icons/hi2";
import { useSpotify } from "../../contexts/SpotifyContext";
import "./styles.css";
import { useEffect, useState } from "react";
import CardMusicWithIndex from "../../components/CardMusicWithIndex/CardMusicWithIndex";
import Player from "../../components/Player/Player";
import Card from "../../components/card";

const Albums = () => {
  const { state } = useSpotify();
  const [albums, setAlbums] = useState(state.data.albums);
  useEffect(() => {
    setAlbums(state.data.albums);
  }, [state.data]);
  return (
    <>
      {state.song != null && <Player />}
      <div className="albums-page">
        <Header />

        <div className="container-albums">
          <div className="albums">
            {albums &&
              albums.items.map((playlist: any, index: any) => (
                <Card data={playlist} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Albums;
