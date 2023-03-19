import { useState, useEffect } from "react";
import { BiPause, BiPlay } from "react-icons/bi";
import "./styles.css";
import { SpotifyActions } from "../../contexts/SpotifyContext";
import { useSpotify } from "../../contexts/SpotifyContext";
import { formatTime } from "../../functions/FormatTime";
import { SpotifyTrack } from "../../Types/AllTypes";

type CardMusicProps = {
  track: SpotifyTrack;
};

const CardMusic = ({ track }: CardMusicProps) => {
  const [artist, setArtist] = useState<any>();
  const [hoverMusic, setHoverMusic] = useState(false);
  const { state, dispatch } = useSpotify();

  const handlePlaySong = () => {
    dispatch({
      type: SpotifyActions.setSong,
      payload: track,
    });
  };

  const formatStringCardMusic = (html: JSX.Element) => {
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
      } else if (state.windowWidth <= 398 && state.windowWidth > 343) {
        strLimited = strLimited.substring(0, 15);
        strLimited += "...";
      } else if (state.windowWidth <= 343) {
        strLimited = strLimited.substring(0, 8);
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
  const formatNameArtist = (name: string) => {
    if (
      (state.windowWidth <= 396 && state.windowWidth > 360) ||
      (name.length > 30 && state.windowWidth > 360)
    ) {
      return `${name.substring(0, 20)}...`;
    } else if (state.windowWidth <= 360 && state.windowWidth > 320) {
      return `${name.substring(0, 10)}...`;
    } else if (state.windowWidth <= 320) {
      return `${name.substring(0, 8)}...`;
    } else {
      return name;
    }
  };
  useEffect(() => {
    formatStringCardMusic(
      <span>
        {track.explicit == true ? <div className="explicit">E</div> : null}
        {track.artists.map((artist: any, key: number) => (
          <span style={{ color: hoverMusic == true ? "#fff" : "" }} key={key}>
            {artist.name},
          </span>
        ))}
      </span>
    );
  }, [state.windowWidth, track]);

  return (
    <div
      onMouseLeave={() => setHoverMusic(false)}
      onMouseEnter={() => setHoverMusic(true)}
      className="music"
      onClick={handlePlaySong}
    >
      <div className="info">
        <div className="banner">
          <img
            style={{
              filter: hoverMusic == true ? "brightness(0.7)" : "",
            }}
            src={track.album?.images[0].url}
            alt=""
          />
          <div
            style={{
              opacity:
                hoverMusic == true
                  ? "1"
                  : state.song?.id == track.id
                  ? "1"
                  : "0",
            }}
            className="play-icon"
          >
            {state.song?.id == track.id ? <BiPause /> : <BiPlay />}
          </div>
        </div>

        <div className="title">
          <h1
            style={{ color: state.song?.id == track.id ? "#1db954" : "white" }}
          >
            {formatNameArtist(track.name)}
          </h1>
          {artist}
        </div>
      </div>
      <div className="time">{formatTime(track.duration_ms)}</div>
    </div>
  );
};

export default CardMusic;
