import Header from "../../components/header/Header";
import { HiOutlineClock } from "react-icons/hi2";
import { SpotifyActions, useSpotify } from "../../contexts/SpotifyContext";
import "./styles.css";
import { useEffect, useState } from "react";
import CardMusicWithIndex from "../../components/CardMusicWithIndex/CardMusicWithIndex";
import Player from "../../components/Player/Player";
import Card from "../../components/card";
import Sidebar from "../../components/sidebar";
import { SpotifyAlbumsAndPlaylists } from "../../Types/AllTypes";

const Albums = () => {
  const { state, dispatch } = useSpotify();
  const [albums, setAlbums] = useState(state.data.albums);

  useEffect(() => {
    dispatch({
      type: SpotifyActions.setActiveFilterHeader,
      payload: "album",
    });
  }, []);

  useEffect(() => {
    setAlbums(state.data.albums);
  }, [state.data]);
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="albums-page">
        <Header />

        <div className="container-albums">
          <div className="albums">
            {albums &&
              albums.items.map(
                (playlist: SpotifyAlbumsAndPlaylists, index: number) => (
                  <Card key={index} data={playlist} type="album" />
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Albums;
