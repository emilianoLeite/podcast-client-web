import React from 'react'
import { Link, Redirect, RouteComponentProps } from "@reach/router";

interface Props extends RouteComponentProps {
  isUserAuthenticated: boolean;
};

const renderContent = () => (
  <>
    <h1> Generic Protected Route</h1>
    <div>
      <Link to="/">Back to Home</Link>
    </div>
  </>
);

const Protected: React.FC<Props> = ({ isUserAuthenticated }) => {
  if (isUserAuthenticated) {
    return renderContent();
  } else {
    return <Redirect to="/" />
  }
};

export default Protected;
