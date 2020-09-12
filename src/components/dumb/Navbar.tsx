import React, { useContext } from "react";

import FirebaseAuth from "../smart/components/FirebaseAuth";
import { Link } from "react-router-dom";
import { PublicContext } from "../../context/Auth";

const privateLinks = () => <React.Fragment>
  | <Link to="/home">Dashboard</Link>{" "}
  | <Link to="/play_queue">Play Queue</Link>{" "}
</React.Fragment>;

export const Navbar: React.FC = () => {
  const { currentUser } = useContext(PublicContext);

  return (
    <nav>
      <Link to="/">Home</Link>{" "}
      {currentUser ? privateLinks() : <FirebaseAuth />}
    </nav>
  );
};
