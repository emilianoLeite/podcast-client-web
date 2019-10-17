import React from "react";
import { Link, Redirect, RouteComponentProps } from "@reach/router";

import AuthContext from "../context/Auth";

const Protected: React.FC<RouteComponentProps> = () => {
  const { loggedIn } = React.useContext(AuthContext);

  if (!loggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <React.Fragment>
        <h1> Generic Protected Route</h1>
        <div>
          <Link to="/">Back to Home</Link>
        </div>
      </React.Fragment>
    );
  }
};

export default Protected;
