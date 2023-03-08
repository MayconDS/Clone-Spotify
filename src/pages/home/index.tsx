import Sidebar from "../../components/sidebar";
import Search from "../search";
import "./styles.css";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="fixed">
        <Search />
      </div>
    </div>
  );
};

export default Home;
