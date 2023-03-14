import { useState } from "react";
import { BsPlayCircleFill } from "react-icons/bs";

import "./styles.css";
import { formatString } from "../../functions/FormatString/FormatString";

const Card = ({ data, type }: any) => {
  const [buttonPlayActive, setButtonPlayActive] = useState(false);

  const handleHoverCard = (e: any) => {
    if (e.type == "mouseenter") {
      setButtonPlayActive(true);
    } else if (e.type == "mouseleave") {
      setButtonPlayActive(false);
    }
  };

  return (
    <div
      className="card"
      onMouseEnter={handleHoverCard}
      onMouseLeave={handleHoverCard}
    >
      <div
        style={{ opacity: buttonPlayActive == true ? "1" : "0" }}
        className="spotify-button"
      >
        <button className="spotify-play-button"></button>
      </div>
      <img className="banner" src={data.images[0].url} />
      <h1>{formatString(data.name, undefined)}</h1>
      {type == "album" ? (
        formatString(
          "",
          <span style={{ color: "gray" }}>
            {data.release_date.split("-")[0]} •
            {data.artists.map((artist: any) => (
              <span> {artist.name}, </span>
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
