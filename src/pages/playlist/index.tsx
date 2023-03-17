import { useEffect, useState, useRef, LegacyRef, createRef } from "react";
import { BsPlayCircleFill, BsThreeDots } from "react-icons/bs";
import { useParams } from "react-router-dom";
import ArtistsRow from "../../components/artistsRow/ArtistsRow";
import CardMusic from "../../components/cardMusic/CardMusic";
import SpotifyServices from "../../services/Api";
import ColorThief from "color-thief-react";

import "./styles.css";
import CardMusicWithIndex from "../../components/CardMusicWithIndex/CardMusicWithIndex";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar";
import { useSpotify } from "../../contexts/SpotifyContext";
import Player from "../../components/Player/Player";
import { HiOutlineClock } from "react-icons/hi2";

const Playlist = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const myDivRef: LegacyRef<HTMLDivElement> = useRef(null);

  const { state } = useSpotify();
  const [bgColor, setBgColor] = useState("");
  const [playlist, setPlaylist] = useState<any>({});
  const [tracks, setTracks] = useState<any>([]);
  const [owner, setOwner] = useState<any>({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const { id } = useParams<any>();

  myDivRef.current?.addEventListener("scroll", (e) => {
    setScrollY(myDivRef.current?.scrollTop || 0);
  });

  useEffect(() => {
    const getAllDataOfPlaylist = async () => {
      if (id) {
        let data = await SpotifyServices.getPlaylist(id);
        setPlaylist(data);

        // get owner of playlist

        let ownerData = await SpotifyServices.getUserById(data.owner.id);
        setOwner(ownerData);

        setTracks(data.tracks.items);

        setDataLoaded(true);
      }
    };

    const backToTop = () => {
      if (scrollY > 0) {
        myDivRef?.current?.scrollTo(0, 0);
      }
    };
    getAllDataOfPlaylist();
    backToTop();
  }, [id]);

  return (
    <div className="playlist-page">
      {state.song != null && <Player />}

      <Sidebar />
      {dataLoaded && (
        <div
          ref={myDivRef}
          style={{ transition: "all ease 0.3s" }}
          className="container"
        >
          <ColorThief
            format="rgbString"
            crossOrigin="anonymous"
            src={playlist.images[0].url}
          >
            {(data: any) => <>{setBgColor(data.data)}</>}
          </ColorThief>
          <div
            className="flyer-playlist"
            style={{
              backgroundColor: bgColor,
            }}
          >
            <div
              style={{
                background: `linear-gradient(to right top, #000000 -21%, transparent 35%)`,
              }}
              className="shadow"
            ></div>
            <div className="box">
              <div className="picture-playlist">
                <img src={playlist.images[0].url} alt="" />
              </div>
              <div className="info">
                <h3>{playlist.type}</h3>
                <h1>{playlist.name}</h1>
                <span id="description">{playlist.description}</span>
                <div className="owner">
                  <img
                    src={owner.images.length > 0 ? owner.images[0].url : ""}
                    alt={owner.display_name}
                  />
                  <b>{owner.display_name}</b>
                  <span>•</span>
                  <span>{playlist.followers.total} curtidas</span>
                  <span>•</span>
                  <span>{playlist.tracks.total} músicas</span>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              background: `linear-gradient( rgba(0,0,0,.6) 0%, #121212 10%), ${bgColor}`,
            }}
            className="top-tracks"
          >
            <div className="header">
              <BsPlayCircleFill id="play" />
              <button>SEGUIR</button>
              <BsThreeDots id="dots" />
            </div>
            <div className="tracks-container">
              <div className="header-tracks">
                <h1
                  style={{ display: "flex", gap: "18px", marginLeft: "23px" }}
                >
                  {" "}
                  <span>#</span> Título
                </h1>
                <h1>Álbum</h1>
                <h1>
                  <HiOutlineClock />
                </h1>
              </div>

              <div className="container-track">
                {tracks &&
                  tracks.map((track: any, key: number) => (
                    <CardMusicWithIndex
                      index={key + 1}
                      key={key}
                      track={track.track != null ? track.track : null}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Playlist;
