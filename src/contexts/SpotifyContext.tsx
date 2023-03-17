import { useContext, useReducer, createContext, ReactNode } from "react";

type SongType = {
  name: string;
  artists: [];
  preview_url: string;
  album: {
    images: [
      {
        url: string;
      }
    ];
  };
  id: string;
};

type State = {
  token: string;
  query: string;
  filter: string;
  song: SongType | null;
  data: any;
  filterActiveHeader: string;
  user: any;
  windowWidth: number;
};

type Action = {
  type: SpotifyActions;
  payload: any;
};

type ContextType = {
  state: State;
  dispatch: (action: Action) => void;
};

type SpotifyProividerProps = {
  children: ReactNode;
};

const initialData: State = {
  token: "",
  query: "Caio Luccas",
  filter: "all",
  song: null,
  data: [],
  filterActiveHeader: "track,playlist,album,episode,artist",
  user: {},
  windowWidth: 0,
};

const SpotifyContext = createContext<ContextType | undefined>(undefined);

export enum SpotifyActions {
  setToken,
  setQuery,
  setFilter,
  setSong,
  setData,
  setActiveFilterHeader,
  setUser,
  setWindowWidth,
}

const SpotifyReducer = (state: State, action: Action) => {
  switch (action.type) {
    case SpotifyActions.setToken:
      return {
        ...state,
        token: action.payload,
      };
    case SpotifyActions.setQuery:
      return {
        ...state,
        query: action.payload,
      };
    case SpotifyActions.setFilter:
      return {
        ...state,
        filter: action.payload,
      };
    case SpotifyActions.setSong:
      return {
        ...state,
        song: action.payload,
      };
    case SpotifyActions.setData:
      return {
        ...state,
        data: action.payload,
      };
    case SpotifyActions.setActiveFilterHeader:
      return {
        ...state,
        filterActiveHeader: action.payload,
      };
    case SpotifyActions.setUser:
      return {
        ...state,
        user: action.payload,
      };
    case SpotifyActions.setWindowWidth:
      return {
        ...state,
        windowWidth: action.payload,
      };
    default:
      return state;
  }
};

export const SpotifyProvider = ({ children }: SpotifyProividerProps) => {
  const [state, dispatch] = useReducer(SpotifyReducer, initialData);
  const value = { state, dispatch };
  return (
    <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
  );
};

export const useSpotify = () => {
  const context = useContext(SpotifyContext);
  if (context === undefined) {
    throw new Error("useSpotify preicsa ser usado dentro do SpotifyProivder");
  } else {
    return context;
  }
};
