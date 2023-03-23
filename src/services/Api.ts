import axios from "axios";
const route = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

const SpotifyServices = {
  search: async (query: string, type: string) => {
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
  getUserById: async (id: string) => {
    let token = localStorage.getItem("token_spotify");

    let data = await route.get(`/users/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    return data.data;
  },
  getMe: async () => {
    let token = localStorage.getItem("token_spotify");
    if (token !== null) {
      let data = await route.get("/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      return data.data;
    }
  },
  getMyPlaylists: async () => {
    let token = localStorage.getItem("token_spotify");
    if (token !== null) {
      let data = await route.get("/me/playlists", {
        params: {
          limit: 10,
        },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      return data.data;
    }
  },
  getArtist: async (id: string) => {
    let token = localStorage.getItem("token_spotify");
    if (token !== null) {
      let data = await route.get(`/artists/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      return data.data;
    }
  },
  getRelatedArtists: async (id: string) => {
    let token = localStorage.getItem("token_spotify");
    if (token !== null) {
      let data = await route.get(`/artists/${id}/related-artists`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      return data.data;
    }
  },
  getArtistTopTracks: async (id: string) => {
    let token = localStorage.getItem("token_spotify");
    if (token !== null) {
      let data = await route.get(`/artists/${id}/top-tracks`, {
        params: {
          market: "ES",
        },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      return data.data;
    }
  },
  getPlaylist: async (id: string) => {
    let token = localStorage.getItem("token_spotify");
    if (token !== null) {
      let data = await route.get(`/playlists/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      return data.data;
    }
  },
  getAlbum: async (id: string) => {
    let token = localStorage.getItem("token_spotify");
    if (token !== null) {
      let data = await route.get(`/albums/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      return data.data;
    }
  },
  getTrack: async (id: string) => {
    let token = localStorage.getItem("token_spotify");
    if (token !== null) {
      let data = await route.get(`/tracks/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      return data.data;
    }
  },
};

export default SpotifyServices;
