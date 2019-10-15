import React from 'react'
import { Link, RouteComponentProps } from "@reach/router";

const Protected: React.FC<RouteComponentProps>= () => (
  <>
    <h1> Generic Protected Route</h1>
    <div>
      <Link to="/">Back to Home</Link>
    </div>
  </>
);

export default Protected;
