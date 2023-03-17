import Card from "../../components/card";
import Sidebar from "../../components/sidebar";
import "./styles.css";
import { useState, useEffect } from "react";
import SpotifyServices from "../../services/Api";

const Home = () => {
  const [playlists, setPlaylists] = useState<any>([]);
  useEffect(() => {
    const getMyPlaylists = async () => {
      let data = await SpotifyServices.getMyPlaylists();
      setPlaylists(data.items);
    };
    getMyPlaylists();
  }, []);

  console.log(playlists);

  return (
    <div className="home">
      <Sidebar />
      <div className="container-home">
        <h1>Suas playlists</h1>
        <div className="container-playlists">
          {playlists.length > 0 &&
            playlists.map((playlist: any) => (
              <Card type="playlist" data={playlist} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
