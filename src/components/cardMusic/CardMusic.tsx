import { useState } from "react";
import { BiPause, BiPlay } from "react-icons/bi";
import "./styles.css";
import { SpotifyActions } from "../../contexts/SpotifyContext";
import { useSpotify } from "../../contexts/SpotifyContext";
import { formatTime } from "../../functions/FormatTime";

const CardMusic = ({ track }: any) => {
  const { state, dispatch } = useSpotify();

  const handlePlaySong = () => {
    dispatch({
      type: SpotifyActions.setSong,
      payload: track,
    });
  };
  const [hoverMusic, setHoverMusic] = useState(false);
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
            src={track.album.images[0].url}
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
          <h1>{track.name}</h1>

          <span
            style={{
              color: hoverMusic == true ? "white" : "",
            }}
          >
            {track.explicit == true ? <div className="explicit">E</div> : null}
            {track.artists.map((artist: any) => (
              <span>{artist.name}, </span>
            ))}
          </span>
        </div>
      </div>
      <div className="time">{formatTime(track.duration_ms)}</div>
    </div>
  );
};

export default CardMusic;
