import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { SpotifyAlbums, SpotifyAlbumsAndPlaylists } from "../../Types/AllTypes";
import "./styles.css";
import Card from "../card";

type ItemsType = {
  items: SpotifyAlbumsAndPlaylists[];
  type: string;
};

const AlbunsRow = ({ items, type }: ItemsType) => {
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
    <div className="albuns">
      <h1>Álbuns</h1>
      <div className="container-albuns">
        <div
          className="arrowLeft"
          style={{
            opacity: scrollX == 0 ? "0" : "",
          }}
          onClick={handleLeftArrow}
        >
          <AiOutlineLeft />
        </div>
        <div
          style={{
            opacity: finalList == true ? "0" : "",
          }}
          onClick={handleRightArrow}
          className="arrowRight"
        >
          <AiOutlineRight />
        </div>

        {items && (
          <>
            <div className="albuns-area">
              <div
                style={{
                  marginLeft: scrollX,
                  width: items.length * 178,
                }}
                className="albuns-list"
              >
                {items &&
                  items.map((album: SpotifyAlbumsAndPlaylists, key: number) => (
                    <div key={key} className="card-wrapper">
                      <Card data={album} type={type} />
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AlbunsRow;
