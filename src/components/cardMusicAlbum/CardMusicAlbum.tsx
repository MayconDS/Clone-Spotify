import { ReactNode, useState } from "react";
import { BiPlay } from "react-icons/bi";
import { CgLoadbarSound } from "react-icons/cg";
import { SpotifyActions, useSpotify } from "../../contexts/SpotifyContext";
import "./styles.css";
import { formatTime } from "../../functions/FormatTime";
import SpotifyServices from "../../services/Api";

const CardMusicAlbum = ({ track, index }: any) => {
  const [trackWithFullInfo, setTrackWithFullInfo] = useState({});
  const [hoverMusic, setHoverMusic] = useState(false);
  const { state, dispatch } = useSpotify();
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
    if (strLimited.length > 50) {
      strLimited = strLimited.substring(0, 50);
      strLimited += "...";
      return (
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
      return (
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
  const handlePlayMusic = async () => {
    if (track.preview_url !== null) {
      let data = await SpotifyServices.getTrack(track.id);
      dispatch({
        type: SpotifyActions.setSong,
        payload: data,
      });
    }
  };
  return (
    <>
      {track !== null && (
        <div
          onMouseLeave={() => setHoverMusic(false)}
          onMouseEnter={() => setHoverMusic(true)}
          className="cardMusicAlbum"
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
            <div className="banner"></div>
            <div className="title">
              <h1
                style={{
                  color: state.song?.id == track.id ? "#1db954" : "white",
                }}
              >
                {track.name}
              </h1>

              {formatString(
                <span>
                  {track.explicit == true ? (
                    <div className="explicit">E</div>
                  ) : null}
                  {track.artists.map((artist: any, key: number) => (
                    <span key={key}>{artist.name}, </span>
                  ))}
                </span>
              )}
            </div>
          </div>

          <div className="music-duration">{formatTime(track.duration_ms)}</div>
        </div>
      )}
    </>
  );
};

export default CardMusicAlbum;
