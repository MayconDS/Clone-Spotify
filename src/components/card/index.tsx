import { useState, MouseEvent } from "react";
import { BsPlayCircleFill } from "react-icons/bs";

import "./styles.css";
import { formatString } from "../../functions/FormatString/FormatString";
import { useNavigate } from "react-router-dom";
import {
  SpotifyAlbumsAndPlaylists,
  SpotifyArtistsAlbums,
} from "../../Types/AllTypes";

type PropsCard = {
  data: SpotifyAlbumsAndPlaylists;
  type: string;
};

const Card = ({ data, type }: PropsCard) => {
  let navigate = useNavigate();
  const [buttonPlayActive, setButtonPlayActive] = useState(false);

  const handleHoverCard = (e: MouseEvent) => {
    if (e.type == "mouseenter") {
      setButtonPlayActive(true);
    } else if (e.type == "mouseleave") {
      setButtonPlayActive(false);
    }
  };

  const redirect = () => {
    if (type == "playlist") {
      return navigate(`/playlist/${data.id}`);
    } else if (type == "album") {
      return navigate(`/album/${data.id}`);
    }
  };

  return (
    <div
      className="card"
      onMouseEnter={handleHoverCard}
      onMouseLeave={handleHoverCard}
      onClick={redirect}
    >
      <div
        style={{ opacity: buttonPlayActive == true ? "1" : "0" }}
        className="spotify-button"
      >
        <button className="spotify-play-button"></button>
      </div>
      <img
        className="banner"
        src={data.images.length > 0 ? data.images[0].url : ""}
      />
      <h1>{formatString(data.name, undefined)}</h1>
      {type == "album" ? (
        formatString(
          "",
          <span style={{ color: "gray" }}>
            {data.release_date.split("-")[0]} •
            {data.artists.map((artist: SpotifyArtistsAlbums, key: number) => (
              <span key={key}> {artist.name}, </span>
            ))}
          </span>
        )
      ) : type == "playlist" ? (
        <span>{formatString(data.owner.display_name, undefined)}</span>
      ) : (
        <span>{Math.ceil(data.duration_ms * 3600) / 3600}</span>
      )}
    </div>
  );
};

export default Card;
