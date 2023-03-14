import { useState, KeyboardEvent, useEffect, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import { useSpotify, SpotifyActions } from "../../contexts/SpotifyContext";
import { HiPauseCircle } from "react-icons/hi2";
import SpotifyServices from "../../services/Api";
import ArtistsRow from "../../components/artistsRow/ArtistsRow";
import AlbunsRow from "../../components/albunsRow/AlbunsRow";
import PlaylistsRow from "../../components/playlistsRow/PlaylistsRow";
import EpisodesRow from "../../components/episodesRow/EpisodesRow";
import "./styles.css";
import CardMusic from "../../components/cardMusic/CardMusic";
import Header from "../../components/header/Header";

type DataType = {
  tracks: [string];
  albums: [];
  artists: [];
  episodes: [];
  playlists: [];
};

const Search = () => {
  const [buttonPlayActive, setButtonPlayActive] = useState(false);
  const { state, dispatch } = useSpotify();
  const [tracksLimited, setTracksLimited] = useState<any>([]);
  const [filter, setFilter] = useState("track,playlist,album,episode,artist");

  useMemo(() => {
    let tracks = [];
    if (state.data.tracks) {
      if (state.data.tracks.items) {
        for (let i = 0; i <= 3; i++) {
          tracks.push(state.data.tracks.items[i]);
        }
      }
    } else {
      return;
    }
    setTracksLimited(tracks);
  }, [state.data]);

  useEffect(() => {
    const getDataDefault = async () => {
      let data = await SpotifyServices.search(state.query, filter);

      dispatch({
        type: SpotifyActions.setData,
        payload: data,
      });
      // LIMIT TRAKCS IN 4 ITEM
      let tracks = [];
      if (state.data.tracks) {
        if (state.data.tracks.items) {
          for (let i = 0; i <= 3; i++) {
            tracks.push(state.data.tracks.items[i]);
          }
        }
      } else {
        return;
      }
      setTracksLimited(tracks);
    };
    getDataDefault();
  }, []);

  console.log(state.data);

  const handleHoverBestResult = (e: any) => {
    if (e.type == "mouseenter") {
      setButtonPlayActive(true);
    } else if (e.type == "mouseleave") {
      setButtonPlayActive(false);
    }
  };

  return (
    <div className="search-page">
      {state.data && (
        <div className="container">
          <Header />
          <div className="body">
            <div className="container-body">
              <div className="box">
                <div className="best-result">
                  <h1>Melhor resultado</h1>
                  {state.data.tracks && (
                    <div
                      onMouseLeave={handleHoverBestResult}
                      onMouseEnter={handleHoverBestResult}
                      className="result"
                    >
                      <div
                        style={{
                          opacity:
                            buttonPlayActive == true
                              ? "1"
                              : state.song?.id == state.data.tracks.items[0].id
                              ? "1"
                              : "0",
                        }}
                        onClick={function () {
                          dispatch({
                            type: SpotifyActions.setSong,
                            payload: state.data.tracks.items[0],
                          });
                        }}
                        className="spotify-button"
                      >
                        {state.song?.id == state.data.tracks.items[0].id ? (
                          <HiPauseCircle id="button-pause" />
                        ) : (
                          <button className="spotify-play-button"></button>
                        )}
                      </div>
                      <img
                        src={state.data.tracks.items[0].album.images[0].url}
                        alt=""
                      />
                      <h1>{state.data.tracks.items[0].name}</h1>

                      <span>
                        {state.data.tracks.items[0].artists.map(
                          (artist: any) => (
                            <span>{artist.name}, </span>
                          )
                        )}
                      </span>
                    </div>
                  )}
                </div>
                <div className="musics">
                  <h1>Músicas</h1>
                  <div className="container-musics">
                    {state.data.tracks &&
                      tracksLimited.map((track: any) => (
                        <CardMusic track={track} />
                      ))}
                  </div>
                </div>
              </div>
              {state.data.artists && (
                <ArtistsRow items={state.data.artists.items} type="artist" />
              )}

              {state.data.albums && (
                <AlbunsRow items={state.data.albums.items} type="album" />
              )}

              {state.data.playlists && (
                <PlaylistsRow
                  items={state.data.playlists.items}
                  type="playlist"
                />
              )}
              {state.data.episodes && (
                <EpisodesRow items={state.data.episodes.items} type="episode" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
