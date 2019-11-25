import React from "react";
import { Feed } from "react-native-rss-parser";
import { Link, RouteComponentProps } from "@reach/router";
import SearchInput from "../components/SearchInput";

interface Props extends RouteComponentProps {
  feed: Feed;
}

const Landing: React.FC<Props> = ({ feed }) => {
  const [podcastsList, setPodcastsList ] = React.useState([])

  return (
    <div>
      <h1>Home</h1>
      <SearchInput setPodcastsList={setPodcastsList}></SearchInput>
      <nav>
        <Link to="/">Home</Link> | <Link to="dashboard">Dashboard</Link>
      </nav>

      <p>{feed.title}</p>
      {podcastsList.map((podcast: any) => {return <p> 1. {podcast.title_original}</p>})}
    </div>
  );
};

export default Landing;
