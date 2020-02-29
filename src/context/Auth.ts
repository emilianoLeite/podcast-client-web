import { createContext } from "react";

export interface Private {
  currentUser: {
    uid: string;
    name?: string;
  };
  logout: () => void;
}

export type CurrentUser = Private["currentUser"];

export interface Public {
  login: (user: CurrentUser) => void;
  loggedIn: boolean; // necessary to redirect from Public to Private route upon login
  currentUser: Maybe<CurrentUser>; // necessary to "enhance" Public pages with logged-in functionality
}

export const PublicContext = createContext<Public>({} as Public);

export const PrivateContext = createContext<Private>({} as Private);
