import Header from "../../components/header/Header";
import { HiOutlineClock } from "react-icons/hi2";
import { SpotifyActions, useSpotify } from "../../contexts/SpotifyContext";
import "./styles.css";
import { useEffect, useState } from "react";
import CardMusicWithIndex from "../../components/CardMusicWithIndex/CardMusicWithIndex";
import Player from "../../components/Player/Player";
import Card from "../../components/card";
import CardArtist from "../../components/cardArtist/CardArtist";
import Sidebar from "../../components/sidebar";
import { SpotifyArtist } from "../../Types/AllTypes";

const Artists = () => {
  const { state, dispatch } = useSpotify();
  const [artists, setArtists] = useState(state.data.artists);

  useEffect(() => {
    dispatch({
      type: SpotifyActions.setActiveFilterHeader,
      payload: "artist",
    });
  }, []);

  useEffect(() => {
    setArtists(state.data.artists);
  }, [state.data]);
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="artists-page">
        <Header />

        <div className="container-artists">
          <div className="artists">
            {artists &&
              artists.items.map((artist: SpotifyArtist, index: any) => (
                <div key={index}>
                  <CardArtist data={artist} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artists;
