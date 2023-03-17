import { AiOutlineHeart } from "react-icons/ai";
import { CgInpicture } from "react-icons/cg";
import { FaRandom, FaStepBackward, FaStepForward } from "react-icons/fa";
import { IoPlayCircleSharp } from "react-icons/io5";
import { TbRepeat, TbMicrophone2, TbH1 } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import { MdDevices, MdPauseCircle } from "react-icons/md";
import { RxSpeakerModerate } from "react-icons/rx";
import { useState, useRef, useEffect, useMemo } from "react";

import ReactH5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import "./styles.css";
import { useSpotify } from "../../contexts/SpotifyContext";
import RangeSlider from "../Range/Range";
const Player = () => {
  const { state } = useSpotify();
  const [stateVolume, setStateVolume] = useState(0.5);
  const audioRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayButtonClick = () => {
    if (audioRef.current.isPlaying()) {
      audioRef.current.audio.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.audio.current.play();
      setIsPlaying(true);
    }
  };
  useMemo(() => {
    if (audioRef.current) {
      audioRef.current.audio.current.volume = stateVolume;
    }
  }, [stateVolume]);

  useEffect(() => {
    setIsPlaying(true);
  }, [state.song]);

  const formatString = (html: any) => {
    let strLimited = "";

    html.props.children.map((item: any) => {
      item.props.children.map((item2: any) => {
        strLimited += item2;
      });
    });
    if (strLimited.length > 50) {
      strLimited = strLimited.substring(0, 50);
      strLimited += "...";
      return <span>{strLimited}</span>;
    } else {
      return <span>{strLimited}</span>;
    }
  };

  return (
    <div className="spotify-player">
      <div className="song">
        <div className="song-banner">
          <img src={state.song?.album.images[0].url} alt="" />
        </div>
        <div className="song-title">
          <h1>{state.song?.name}</h1>
          {formatString(
            <span>
              {state.song?.artists.map((artist: any) => (
                <span>{artist.name}, </span>
              ))}
            </span>
          )}
        </div>
        <div className="song-buttons">
          <AiOutlineHeart />

          <CgInpicture />
        </div>
      </div>
      <div className="controls-player">
        <div className="buttons">
          <button>
            {" "}
            <FaRandom />
          </button>
          <button>
            {" "}
            <FaStepBackward />
          </button>
          <button
            style={{
              transform: isPlaying == true ? "scale(1.05,1.05)" : "",
            }}
            onClick={handlePlayButtonClick}
            id="play-btn"
          >
            {isPlaying == true ? <MdPauseCircle /> : <IoPlayCircleSharp />}
          </button>
          <button>
            {" "}
            <FaStepForward />
          </button>
          <button>
            <TbRepeat />
          </button>
        </div>
        <div style={{ marginTop: "-6px" }} className="progress-bar">
          <ReactH5AudioPlayer
            src={state.song?.preview_url}
            ref={audioRef}
            autoPlay={false}
            volume={stateVolume}
            loop={false}
            customControlsSection={[]}
          />
        </div>
      </div>
      <div className="controls-adjust">
        <button>
          {" "}
          <TbMicrophone2 />{" "}
        </button>
        <button>
          {" "}
          <HiOutlineQueueList />{" "}
        </button>
        <button>
          <MdDevices />
        </button>
        <div className="volume">
          <RxSpeakerModerate />
          <RangeSlider setVolume={setStateVolume} />
        </div>
      </div>
    </div>
  );
};

export default Player;
