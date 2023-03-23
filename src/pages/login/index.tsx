/// <reference types="vite/client" />
import { useEffect } from "react";
import { useSpotify, SpotifyActions } from "../../contexts/SpotifyContext";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const clientId = import.meta.env.VITE_CLIENT_ID;

function Login() {
  const { dispatch } = useSpotify();
  const navigate = useNavigate();
  useEffect(() => {
    const setToken = () => {
      const hash = window.location.hash;
      if (hash) {
        const tokenOauth2 = hash.substring(1).split("&")[0].split("=")[1];

        dispatch({
          type: SpotifyActions.setToken,
          payload: tokenOauth2,
        });
        const hoursTokenGenerate = new Date();
        localStorage.setItem(
          "expires_in",
          JSON.stringify(hoursTokenGenerate.getTime())
        );
        localStorage.setItem("token_spotify", tokenOauth2);
        return navigate("/search");
      }
    };
    setToken();
  }, []);

  const handleClick = () => {
    const redirectUrl = "https://newsound.vercel.app/login";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-position",
      "user-top-read",
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " "
    )}&response_type=token&show_daialog=true`;
  };

  return (
    <div className="container-login">
      <div className="logo">
        <img src="https://imgs.search.brave.com/3iRmqSnMQa6ZOq33c_CQYKg4VdfSULfm4owYs9mb7Bw/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9sb2dv/bG9vay5uZXQvd3At/Y29udGVudC91cGxv/YWRzLzIwMjEvMDYv/U3ltYm9sLVNwb3Rp/ZnkucG5n" />
      </div>
      <h1>Conecte-se com sua conta do Spotify</h1>
      <button onClick={handleClick}>Conectar</button>
    </div>
  );
}

export default Login;
