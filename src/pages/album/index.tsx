import { useEffect, useState, useRef, LegacyRef, createRef } from "react";
import { BsPlayCircleFill, BsThreeDots } from "react-icons/bs";
import { useParams } from "react-router-dom";
import SpotifyServices from "../../services/Api";
import ColorThief from "color-thief-react";

import "./styles.css";
import Sidebar from "../../components/sidebar";
import { useSpotify } from "../../contexts/SpotifyContext";
import Player from "../../components/Player/Player";
import { HiOutlineClock } from "react-icons/hi2";
import CardMusicAlbum from "../../components/cardMusicAlbum/CardMusicAlbum";
import { ColorThiefProps, SpotifyTrack } from "../../Types/AllTypes";

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

  const FormatStringArtists = () => {
    if (state.windowWidth > 790) {
      return artists;
    } else if (state.windowWidth <= 790 && state.windowWidth > 340) {
      return artists.slice(0, 15) + "...";
    } else if (state.windowWidth <= 340) {
      return artists.slice(0, 8) + "...";
    } else {
      return artists;
    }
  };

  useEffect(() => {
    FormatStringArtists();
  }, [state.windowWidth]);
  const formatAlbumName = (html: JSX.Element) => {
    if (state.windowWidth <= 789 && html.props.children.length >= 29) {
      return <h1 style={{ fontSize: "20px" }}>{html.props.children}</h1>;
    } else {
      return html;
    }
  };

  return (
    <div className="album-page">
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
            {(data: ColorThiefProps) => <>{setBgColor(data.data)}</>}
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
                <h3>Álbum</h3>

                {formatAlbumName(<h1>{album.name}</h1>)}

                <span id="description">{album.description}</span>
                <div className="owner">
                  <b>{FormatStringArtists()}</b>
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

                <h1>
                  <HiOutlineClock />
                </h1>
              </div>

              <div className="container-track">
                {tracks &&
                  tracks.map((track: SpotifyTrack, key: number) => (
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
