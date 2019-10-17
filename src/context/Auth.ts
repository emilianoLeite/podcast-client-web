import { createContext } from "react";

export interface AuthType {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export default createContext<AuthType>({} as AuthType);
