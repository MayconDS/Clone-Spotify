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
  getSingle: async (type: string, id: string) => {
    let token = localStorage.getItem("token_spotify");
    let data = await route.get(`/${type}/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    console.log(data.data);
  },
};
SpotifyServices.getSingle("playlists", "0ecgPKgm2lzW7taroRXhQU/tracks");
export default SpotifyServices;
