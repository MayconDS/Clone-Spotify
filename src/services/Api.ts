import axios from "axios";
const route = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

const SpotifyServices = {
  search: async (query: string, type: any) => {
    let token = localStorage.getItem("token_spotify");

    let data = await route.get("/search", {
      params: {
        q: query,
        type: type,
        limit: "50",
      },
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    return data.data;
  },
};

export default SpotifyServices;
