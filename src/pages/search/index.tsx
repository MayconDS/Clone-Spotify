import Sidebar from "../../components/sidebar";
import Search from "../../components/search";
import "./styles.css";

const Home = () => {
  return (
    <div className="search">
      <Sidebar />

      <div className="fixed">
        <Search />
      </div>
    </div>
  );
};

export default Home;
