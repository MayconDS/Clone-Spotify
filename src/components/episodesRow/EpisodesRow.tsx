import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import "./styles.css";
import Card from "../card";

const EpisodesRow = ({ items, type }: any) => {
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
    <div className="episodes">
      <h1>Episódios</h1>
      {items && (
        <div className="container-episodes">
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
          <div className="episodes-area">
            <div
              style={{
                marginLeft: scrollX,
                width: items.length * 178,
              }}
              className="episodes-list"
            >
              {items &&
                items.map((album: any, key: number) => (
                  <Card key={key} data={album} type={type} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodesRow;
