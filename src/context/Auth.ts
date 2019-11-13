import { createContext } from "react";

export interface AuthType {
  currentUser: Maybe<{
    uid: string;
    name?: string;
  }>;
  setCurrentUser: React.Dispatch<React.SetStateAction<AuthType["currentUser"]>>;
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export default createContext<AuthType>({} as AuthType);
