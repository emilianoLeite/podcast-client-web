import { createContext } from "react";
import { firestoreFunctions } from "../shared/firebase";

export type FirebaseUser = {
  uid: string;
  name?: string;
}
type FirestoreFunctions = ReturnType<typeof firestoreFunctions>

export type CurrentUser = FirebaseUser & FirestoreFunctions

export interface Private {
  currentUser: CurrentUser;
  logout: () => void;
}

export interface Public {
  login: (user: FirebaseUser) => void;
  loggedIn: boolean; // necessary to redirect from Public to Private route upon login
  currentUser: Maybe<CurrentUser>; // necessary to "enhance" Public pages with logged-in functionality
}

export const PublicContext = createContext<Public>({} as Public);

export const PrivateContext = createContext<Private>({} as Private);
