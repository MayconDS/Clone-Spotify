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

const Artist = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const myDivRef: LegacyRef<HTMLDivElement> = useRef(null);

  const { state } = useSpotify();
  const [bgColor, setBgColor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [artist, setArtist] = useState<any>({});
  const [relatedArtists, setRelatedArtists] = useState<any>([]);
  const [topTracks, setTopTracks] = useState<any>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { id } = useParams<any>();

  myDivRef.current?.addEventListener("scroll", (e) => {
    setScrollY(myDivRef.current?.scrollTop || 0);
  });

  useEffect(() => {
    const getAllDataOfArtist = async () => {
      if (id) {
        // get artist
        let artistData = await SpotifyServices.getArtist(id);
        setArtist(artistData);

        //   get related-artists
        let relatedArtistsData = await SpotifyServices.getRelatedArtists(id);
        setRelatedArtists(relatedArtistsData);

        // get top tracks
        let topTracksData = await SpotifyServices.getArtistTopTracks(id);
        setTopTracks(topTracksData);
        setDataLoaded(true);
      }
    };

    const backToTop = () => {
      if (scrollY > 0) {
        myDivRef?.current?.scrollTo(0, 0);
      }
    };

    getAllDataOfArtist();
    backToTop();
  }, [id]);

  return (
    <div className="artist-page">
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
            src={artist.images[0].url}
          >
            {(data: any) => <>{setBgColor(data.data)}</>}
          </ColorThief>
          <div
            className="flyer-artist"
            style={{
              backgroundColor: bgColor,
            }}
          >
            <div
              style={{
                background: `linear-gradient(to right top, #000  -41%, transparent 90%)`,
              }}
              className="shadow"
            ></div>
            <div className="box">
              <div className="picture-artist">
                <img src={artist.images[0].url} alt="" />
              </div>
              <div className="info">
                <h1>{artist.name}</h1>
                <span>{artist.followers.total} ouvintes mensais</span>
              </div>
            </div>
          </div>
          <div
            style={{
              background: `linear-gradient(rgba(0,0,0,.6) 0, #121212 30%), ${bgColor}`,
            }}
            className="top-tracks"
          >
            <div className="header">
              <BsPlayCircleFill id="play" />
              <button>SEGUIR</button>
              <BsThreeDots id="dots" />
            </div>
            <div className="tracks-container">
              <h1 id="title">Populares</h1>
              <div className="container-track">
                {topTracks &&
                  topTracks.tracks.map((track: any, key: number) => (
                    <CardMusicWithIndex
                      index={key + 1}
                      key={key}
                      track={track}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="related-artists">
            <h1 id="title">Os fãs também curtem</h1>
            <div className="container-card-artists">
              {relatedArtists && (
                <ArtistsRow key={artist.id} items={relatedArtists.artists} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Artist;
