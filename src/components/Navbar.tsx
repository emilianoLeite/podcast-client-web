import React from "react";
import { Link } from "@reach/router";
import FirebaseAuth from "../components/FirebaseAuth";
import AuthContext from "../context/Auth";

const Navbar: React.FC<{}> = () => {
  const { login, logout } = React.useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="dashboard">Dashboard</Link> | <button onClick={login}> Login </button> | <button onClick={logout}> Logout </button> | <FirebaseAuth/>
    </nav>
  );
};

export default Navbar;
