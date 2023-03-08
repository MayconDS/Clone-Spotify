import { HiHome } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import { VscLibrary } from "react-icons/vsc";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import "./styles.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <header>
        <div className="items">
          <div className="item">
            <HiHome />
          </div>
          <div className="item">
            <BiSearchAlt />
          </div>
          <div className="item">
            <VscLibrary />
          </div>
        </div>
        <div className="items2">
          <div className="item">
            {" "}
            <BsFillPlusSquareFill />
          </div>
          <div className="item">
            {" "}
            <AiFillHeart />
          </div>
        </div>
      </header>
      <div className="line"></div>
      <div className="playlists">
        <span>Lindk</span>
        <span>Curti</span>
        <span>Perf</span>
      </div>
    </div>
  );
};

export default Sidebar;
