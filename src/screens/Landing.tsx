import React from 'react';
import { Feed } from "react-native-rss-parser";
import { Link, RouteComponentProps } from "@reach/router";

interface Props extends RouteComponentProps {
  feed: Feed;
};

const Landing: React.FC<Props> = ({ feed }) => {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="dashboard">Dashboard</Link>
      </nav>

      <p>{feed.title}</p>
    </div>
  );
};

export default Landing;
