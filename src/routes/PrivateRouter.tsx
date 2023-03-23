import { ReactElement } from "react";

import { Navigate } from "react-router-dom";

type PrivateRouterProps = {
  children: ReactElement;
};

const PrivateRouter = ({ children }: PrivateRouterProps) => {
  const token = localStorage.getItem("token_spotify");

  const currentTime = new Date().getTime();

  let tokenExpiresIn: string | null | bigint | null =
    localStorage.getItem("expires_in");

  const differ = currentTime - parseInt(tokenExpiresIn || "0");

  const hours = Math.floor((differ / 1000 / 60 / 60) % 24);
  const allowed = hours < 1 && hours != null && token != "" && token != null;

  if (allowed == true) {
    return children;
  } else if (hours > 1) {
    localStorage.removeItem("expires_in");
    localStorage.removeItem("token_spotify");
    alert("token expired");

    return <Navigate to={"/login"} />;
  } else {
    return <Navigate to={"/login"} />;
  }
};
export default PrivateRouter;
