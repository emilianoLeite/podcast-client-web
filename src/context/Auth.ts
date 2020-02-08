import { createContext } from "react";

export interface Public {
  login: (user: CurrentUser) => void;
  loggedIn: boolean;
}

export interface Private {
  currentUser: {
    uid: string;
    name?: string;
  };
  logout: () => void;
}

export type CurrentUser = Private["currentUser"];

export const PublicContext = createContext<Public>({} as Public);

export const PrivateContext = createContext<Private>({} as Private);
