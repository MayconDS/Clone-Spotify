import { useEffect, useState, useRef, LegacyRef, createRef } from "react";
import { BsPlayCircleFill, BsThreeDots } from "react-icons/bs";
import { useParams } from "react-router-dom";
import SpotifyServices from "../../services/Api";
import ColorThief from "color-thief-react";

import "./styles.css";
import CardMusicWithIndex from "../../components/CardMusicWithIndex/CardMusicWithIndex";
import Sidebar from "../../components/sidebar";
import { useSpotify } from "../../contexts/SpotifyContext";
import Player from "../../components/Player/Player";
import { HiOutlineClock } from "react-icons/hi2";
import CardMusicAlbum from "../../components/cardMusicAlbum/CardMusicAlbum";

const Album = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const myDivRef: LegacyRef<HTMLDivElement> = useRef(null);

  const { state } = useSpotify();
  const [bgColor, setBgColor] = useState("");
  const [album, setAlbum] = useState<any>({});
  const [tracks, setTracks] = useState<any>([]);
  const [artists, setArtists] = useState<any>("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const { id } = useParams<any>();

  myDivRef.current?.addEventListener("scroll", (e) => {
    setScrollY(myDivRef.current?.scrollTop || 0);
  });

  useEffect(() => {
    const getAllDataOfAlbum = async () => {
      if (id) {
        let data = await SpotifyServices.getAlbum(id);
        setAlbum(data);

        setTracks(data.tracks.items);

        // set artists of album
        let artistsString = "";
        data.artists.map((item: any) => {
          artistsString += ` ${item.name} •`;
        });
        setArtists(artistsString);
        setDataLoaded(true);
      }
    };

    const backToTop = () => {
      if (scrollY > 0) {
        myDivRef?.current?.scrollTo(0, 0);
      }
    };
    getAllDataOfAlbum();
    backToTop();
  }, [id]);

  console.log(tracks);

  return (
    <div className="album-page">
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
            src={album.images[0].url}
          >
            {(data: any) => <>{setBgColor(data.data)}</>}
          </ColorThief>
          <div
            className="flyer-album"
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
              <div className="picture-album">
                <img src={album.images[0].url} alt="" />
              </div>
              <div className="info">
                <h3>{album.type}</h3>
                <h1>{album.name}</h1>
                <span id="description">{album.description}</span>
                <div className="owner">
                  <b>{artists}</b>
                  <span>{album.release_date.split("-")[0]}</span>
                  <span>•</span>
                  <span>{album.total_tracks} músicas</span>
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
                    <CardMusicAlbum index={key + 1} key={key} track={track} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Album;