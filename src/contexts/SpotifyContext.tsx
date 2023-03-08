import { useContext, useReducer, createContext, ReactNode } from "react";

type State = {
  token: string;
  query: string;
  filter: string;
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
};

const SpotifyContext = createContext<ContextType | undefined>(undefined);

export enum SpotifyActions {
  setToken,
  setQuery,
  setFilter,
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
