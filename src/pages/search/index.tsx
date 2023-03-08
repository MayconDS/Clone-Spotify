import { useState, KeyboardEvent, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { BsPlayCircleFill } from "react-icons/bs";
import { useSpotify } from "../../contexts/SpotifyContext";

import "./styles.css";
import Sidebar from "../../components/sidebar";
import SpotifyServices from "../../services/Api";
import Card from "../../components/card";
import ArtistsRow from "../../components/artistsRow/ArtistsRow";
import AlbunsRow from "../../components/albunsRow/AlbunsRow";
import PlaylistsRow from "../../components/playlistsRow/PlaylistsRow";
import EpisodesRow from "../../components/episodesRow/EpisodesRow";

type DataType = {
  tracks: [string];
  albums: [];
  artists: [];
  episodes: [];
  playlists: [];
};

const Search = () => {
  const [buttonPlayActive, setButtonPlayActive] = useState(false);
  const { state } = useSpotify();
  const [data, setData] = useState<any>([]);
  const [tracksLimited, setTracksLimited] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("track,playlist,album,episode,artist");
  const [filterActive, setFilterActive] = useState(
    "track,playlist,album,episode,artist"
  );

  useEffect(() => {
    const getDataDefault = async () => {
      let data = await SpotifyServices.search(state.query, filter);
      setData(data);
      let tracks = [];
      if (data.tracks) {
        if (data.tracks.items) {
          for (let i = 0; i <= 3; i++) {
            tracks.push(data.tracks.items[i]);
          }
        }
      } else {
        return;
      }
      setTracksLimited(tracks);
    };
    getDataDefault();
  }, []);

  const handleInput = async (event: KeyboardEvent) => {
    if (event.key == "Enter") {
      let data = await SpotifyServices.search(search, filter);
      setData(data);

      let tracks = [];
      if (data.tracks) {
        if (data.tracks.items) {
          for (let i = 0; i <= 3; i++) {
            tracks.push(data.tracks.items[i]);
          }
        }
      } else {
        return;
      }
      setTracksLimited(tracks);
    }
  };
  const handleButton = (e: any) => {
    setFilter(e.target.value);
    setFilterActive(e.target.value);
  };

  const handleHoverBestResult = (e: any) => {
    if (e.type == "mouseenter") {
      setButtonPlayActive(true);
    } else if (e.type == "mouseleave") {
      setButtonPlayActive(false);
    }
  };
  return (
    <div className="search-page">
      <Sidebar />

      {data && (
        <div className="container">
          <header>
            <div className="header-top">
              <div className="search-input">
                <FiSearch />{" "}
                <input
                  type="text"
                  name=""
                  id=""
                  onKeyUp={handleInput}
                  placeholder="artistas, tracks, álbuns, episódios"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <nav>
              <button
                style={{
                  backgroundColor:
                    filterActive == "track,playlist,album,episode,artist"
                      ? "white"
                      : "",
                  color:
                    filterActive == "track,playlist,album,episode,artist"
                      ? "black"
                      : "",
                }}
                value="track,playlist,album,episode,artist"
                onClick={(e) => handleButton(e)}
              >
                Tudo
              </button>
              <button
                style={{
                  backgroundColor: filterActive == "music" ? "white" : "",
                  color: filterActive == "music" ? "black" : "",
                }}
                value="music"
                onClick={(e) => handleButton(e)}
              >
                Músicas
              </button>
              <button
                style={{
                  backgroundColor: filterActive == "playlist" ? "white" : "",
                  color: filterActive == "playlist" ? "black" : "",
                }}
                value="playlist"
                onClick={(e) => handleButton(e)}
              >
                Playlists
              </button>
              <button
                style={{
                  backgroundColor: filterActive == "artist" ? "white" : "",
                  color: filterActive == "artist" ? "black" : "",
                }}
                value="artist"
                onClick={(e) => handleButton(e)}
              >
                Artistas
              </button>
              <button
                style={{
                  backgroundColor: filterActive == "album" ? "white" : "",
                  color: filterActive == "album" ? "black" : "",
                }}
                value="album"
                onClick={(e) => handleButton(e)}
              >
                Álbuns
              </button>
              <button
                style={{
                  backgroundColor: filterActive == "episode" ? "white" : "",
                  color: filterActive == "episode" ? "black" : "",
                }}
                value="episode"
                onClick={(e) => handleButton(e)}
              >
                Episódios
              </button>
            </nav>
          </header>
          <div className="body">
            <div className="container-body">
              <div className="box">
                <div className="best-result">
                  <h1>Melhor resultado</h1>
                  {data.tracks && (
                    <div
                      onMouseLeave={handleHoverBestResult}
                      onMouseEnter={handleHoverBestResult}
                      className="result"
                    >
                      <div
                        style={{
                          opacity: buttonPlayActive == true ? "1" : "0",
                        }}
                        className="buttonPlay"
                      >
                        <BsPlayCircleFill />
                      </div>
                      <img
                        src={data.tracks.items[0].album.images[0].url}
                        alt=""
                      />
                      <h1>{data.tracks.items[0].name}</h1>

                      <span>
                        {data.tracks.items[0].artists.map((artist: any) => (
                          <span>{artist.name}, </span>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
                <div className="musics">
                  <h1>Músicas</h1>
                  <div className="container-musics">
                    {data.tracks &&
                      tracksLimited.map((track: any) => (
                        <div className="music">
                          <div className="info">
                            <img src={track.album.images[0].url} alt="" />

                            <div className="title">
                              <h1>{track.name}</h1>
                              <span>
                                {track.artists.map((artist: any) => (
                                  <span>{artist.name}, </span>
                                ))}
                              </span>
                            </div>
                          </div>
                          <div className="time">3:13</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {data.artists && (
                <ArtistsRow items={data.artists.items} type="artist" />
              )}

              {data.albums && (
                <AlbunsRow items={data.albums.items} type="album" />
              )}

              {data.playlists && (
                <PlaylistsRow items={data.playlists.items} type="playlist" />
              )}
              {data.episodes && (
                <EpisodesRow items={data.episodes.items} type="episode" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
