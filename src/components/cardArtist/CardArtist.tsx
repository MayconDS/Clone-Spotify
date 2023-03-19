import { MouseEvent, useState } from "react";
import { BsPlayCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { SpotifyArtist } from "../../Types/AllTypes";

type CardArtistProps = {
  data: SpotifyArtist;
};

const CardArtist = ({ data }: CardArtistProps) => {
  const navigate = useNavigate();
  const [buttonPlayActive, setButtonPlayActive] = useState(false);
  let nameLimited = "";
  if (data.name.length > 16) {
    nameLimited = data.name.substring(0, 16);
    nameLimited += "...";
  } else {
    nameLimited = data.name;
  }

  const handleHoverCard = (e: MouseEvent) => {
    if (e.type == "mouseenter") {
      setButtonPlayActive(true);
    } else if (e.type == "mouseleave") {
      setButtonPlayActive(false);
    }
  };
  const redirect = () => {
    return navigate(`/artist/${data.id}`);
  };
  return (
    <div
      onMouseEnter={handleHoverCard}
      onMouseLeave={handleHoverCard}
      className="card-artist"
      onClick={redirect}
    >
      <div
        style={{ opacity: buttonPlayActive == true ? "1" : "0" }}
        className="spotify-button"
      >
        <button className="spotify-play-button"></button>
      </div>
      <img src={data.images[0] && data.images[0].url} alt="" />
      <h1>{nameLimited}</h1>
      <span>{data.type}</span>
    </div>
  );
};

export default CardArtist;
