import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import "./styles.css";

const ArtistsRow = ({ items }: any) => {
  const [scrollX, setScrollX] = useState(0);
  const [finalList, setFinalList] = useState(false);
  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };
  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.length * 178;

    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }

    setScrollX(x);
  };
  useEffect(() => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.length * 178;

    if (window.innerWidth - (listW + 534) > x) {
      setFinalList(true);
    } else {
      setFinalList(false);
    }
  }, [scrollX]);
  return (
    <div className="artists">
      <h1>Artistas</h1>
      {items && (
        <div className="container-artists">
          <div
            style={{ opacity: scrollX == 0 ? "0" : "" }}
            onClick={handleLeftArrow}
            className="arrowLeft"
          >
            <AiOutlineLeft />
          </div>
          <div
            style={{ opacity: finalList == true ? "0" : "" }}
            onClick={handleRightArrow}
            className="arrowRight"
          >
            <AiOutlineRight />
          </div>
          <div className="artists-area">
            <div
              style={{
                marginLeft: scrollX,
                width: items.length * 178,
              }}
              className="artists-list"
            >
              {items &&
                items.map((artist: any) => (
                  <div className="artist">
                    <img
                      src={artist.images.length > 0 && artist.images[0].url}
                      alt=""
                    />
                    <h1>{artist.name}</h1>
                    <span>{artist.type}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistsRow;
