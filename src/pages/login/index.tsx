import { useEffect, useState } from "react";
import { useSpotify, SpotifyActions } from "../../contexts/SpotifyContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Login() {
  const { state, dispatch } = useSpotify();
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
    const clientId = "272442fc1fd44c6faeba458eaaefd1c6";
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
      <button onClick={handleClick}>Connect Spotify</button>
    </div>
  );
}

export default Login;
