import Player from "../../components/Player/Player";
import Sidebar from "../../components/sidebar";
import { useSpotify } from "../../contexts/SpotifyContext";
import Search from "../search";
import "./styles.css";

const Home = () => {
  const { state } = useSpotify();
  return (
    <div className="home">
      <Sidebar />
      {state.song != null && <Player />}

      <div className="fixed">
        <Search />
      </div>
    </div>
  );
};

export default Home;
