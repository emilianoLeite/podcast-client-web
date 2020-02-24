import React from "react";

import FirebaseAuth from "../smart/FirebaseAuth";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav>
      <Link to="/">Home</Link>{" "}
      | <Link to="/home">Dashboard</Link>{" "}
      | <FirebaseAuth />
    </nav>
  );
};

export default Navbar;
