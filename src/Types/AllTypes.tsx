export type SpotifyAlbums = {
  artists: {
    // tipo para informações dos artistas
  }[];

  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];

  name: string;
  release_date: string;

  total_tracks: number;
  type: string;

  duration_ms: number;
};

export type SpotifyPlaylists = {
  artists: {
    id: string;
    name: string;
    type: string;
  }[];
  release_date: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  duration_ms: number;
  name: string;
  owner: string;
  total_tracks: number;
  type: string;
};

export type SpotifyAlbumsAndPlaylists = {
  artists: SpotifyArtistsAlbums[];

  release_date: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  duration_ms: number;
  name: string;
  owner: {
    display_name: string;
  };
  total_tracks: number;
  type: string;
};
export type SpotifyArtistsAlbums = {
  id: string;
  name: string;
  type: string;
};

export type SpotifyArtist = {
  followers: {
    total: number;
  };
  id: string;
  images: {
    height: number;
    width: number;
    url: string;
  }[];
  name: string;
  type: string;
};

export type SpotifyTrack = {
  album?: {
    artists: SpotifyArtistsAlbums[];
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    name: string;
    total_tracks: number;
  };
  artists: SpotifyArtistsAlbums[];
  duration_ms: number;
  explicit: boolean;
  id: string;
  name: string;
  preview_url: string;
};

export type SpotifyPlaylist = {
  description: string;
  id: string;
  images: {
    height: number;
    width: number;
    url: string;
  }[];
  owner: {
    display_name: string;
  };
  tracks: {
    total: number;
  };
  name: string;
};

export type ColorThiefProps = {
  data: string;
  error: undefined;
  loading: boolean;
};
