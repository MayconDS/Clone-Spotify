import { useState } from "react";
import { BsPlayCircleFill } from "react-icons/bs";

import "./card.css";

const Card = ({ data, type }: any) => {
  const [buttonPlayActive, setButtonPlayActive] = useState(false);
  let nameLimited = "";
  if (data.name.length > 16) {
    nameLimited = data.name.substring(0, 16);
    nameLimited += "...";
  } else {
    nameLimited = data.name;
  }

  const handleHoverCard = (e: any) => {
    if (e.type == "mouseenter") {
      setButtonPlayActive(true);
    } else if (e.type == "mouseleave") {
      setButtonPlayActive(false);
    }
  };

  return (
    <div
      onMouseEnter={handleHoverCard}
      onMouseLeave={handleHoverCard}
      className="card"
    >
      <div
        style={{ opacity: buttonPlayActive == true ? "1" : "0" }}
        className="spotify-button"
      >
        <button className="spotify-play-button"></button>
      </div>
      <img className="banner" src={data.images[0].url} />
      <h1>{nameLimited}</h1>
      {type == "album" ? (
        <span>
          {data.release_date.split("-")[0]} •
          {data.artists.map((artist: any) => (
            <span> {artist.name}, </span>
          ))}
        </span>
      ) : type == "playlist" ? (
        <span>{data.owner.display_name}</span>
      ) : (
        <span>{Math.ceil(data.duration_ms * 3600) / 3600}</span>
      )}
    </div>
  );
};

export default Card;
