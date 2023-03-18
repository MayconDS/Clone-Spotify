import { ReactNode, useState, useEffect } from "react";
import { BiPlay } from "react-icons/bi";
import { CgLoadbarSound } from "react-icons/cg";
import { SpotifyActions, useSpotify } from "../../contexts/SpotifyContext";
import "./styles.css";
import { formatTime } from "../../functions/FormatTime";

const CardMusicWithIndex = ({ track, index }: any) => {
  const [artist, setArtist] = useState<any>();
  const [hoverMusic, setHoverMusic] = useState(false);
  const { state, dispatch } = useSpotify();

  const formatNameArtist = (name: string) => {
    if (
      (state.windowWidth <= 396 && state.windowWidth > 375) ||
      (name.length > 30 && state.windowWidth > 375)
    ) {
      return `${name.substring(0, 20)}...`;
    } else if (state.windowWidth <= 375 && state.windowWidth > 340) {
      return `${name.substring(0, 10)}...`;
    } else if (state.windowWidth <= 340) {
      return `${name.substring(0, 4)}...`;
    } else {
      return name;
    }
  };

  const formatString = (html: any) => {
    let strLimited = "";
    let explicit = false;

    if (html.props.children[0]) {
      explicit = true;
    }

    html.props.children[1].map((item: any) => {
      item.props.children.map((item2: any) => {
        strLimited += item2;
      });
    });
    if (strLimited.length > 20) {
      if (state.windowWidth >= 600) {
        strLimited = strLimited.substring(0, 40);
        strLimited += "...";
      } else if (state.windowWidth <= 503 && state.windowWidth > 398) {
        strLimited = strLimited.substring(0, 25);
        strLimited += "...";
      } else if (state.windowWidth <= 398 && state.windowWidth > 343) {
        strLimited = strLimited.substring(0, 15);
        strLimited += "...";
      } else if (state.windowWidth <= 343) {
        strLimited = strLimited.substring(0, 5);
        strLimited += "...";
      } else {
        strLimited = strLimited.substring(0, 30);
        strLimited += "...";
      }
      return setArtist(
        <span
          style={{
            color: hoverMusic == true ? "white" : "",
          }}
        >
          {" "}
          {explicit && <div className="explicit">E</div>} {strLimited}{" "}
        </span>
      );
    } else {
      return setArtist(
        <span
          style={{
            color: hoverMusic == true ? "white" : "",
          }}
        >
          {strLimited}
        </span>
      );
    }
  };
  const handlePlayMusic = () => {
    if (track.preview_url !== null) {
      dispatch({
        type: SpotifyActions.setSong,
        payload: track,
      });
    }
  };
  useEffect(() => {
    formatString(
      <span>
        {track.explicit == true ? <div className="explicit">E</div> : null}
        {track.artists.map((artist: any, key: number) => (
          <span key={key}>{artist.name}, </span>
        ))}
      </span>
    );
  }, [state.windowWidth]);

  return (
    <>
      {track !== null && (
        <div
          onMouseLeave={() => setHoverMusic(false)}
          onMouseEnter={() => setHoverMusic(true)}
          className="cardMusic"
          onClick={handlePlayMusic}
        >
          <div className="music-info">
            <div className="index">
              <span
                style={{
                  color: state.song?.id == track.id ? "#1db954" : "#b3b3b3",
                }}
              >
                {hoverMusic == true ? (
                  <BiPlay />
                ) : state.song?.id == track.id ? (
                  <CgLoadbarSound style={{ color: "#1db954" }} />
                ) : (
                  index
                )}
              </span>
            </div>
            <div className="banner">
              <img
                src={track.album.images ? track.album.images[0].url : ""}
                alt=""
              />
            </div>
            <div className="title">
              <h1
                style={{
                  color: state.song?.id == track.id ? "#1db954" : "white",
                }}
              >
                {formatNameArtist(track.name)}
              </h1>
              {artist}
            </div>
          </div>
          {state.windowWidth >= 1140 ? (
            <div className="music-album">
              <span>{track.album.name}</span>
            </div>
          ) : null}
          <div className="music-duration">{formatTime(track.duration_ms)}</div>
        </div>
      )}
    </>
  );
};

export default CardMusicWithIndex;
