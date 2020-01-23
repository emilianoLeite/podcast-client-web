import React from "react";

import FirebaseAuth from "../components/FirebaseAuth";
import { Link } from "react-router-dom";

const Navbar: React.FC<{}> = () => {
  return (
    <nav>
      <Link to="/">Home</Link> | <FirebaseAuth />
    </nav>
  );
};

export default Navbar;
