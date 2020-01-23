import React from "react";
import { Feed } from "react-native-rss-parser";
import SearchInput from "../components/SearchInput";
import Podcast from "../types/Podcast";
import { Link } from "react-router-dom";

interface Props {
  feed: Feed;
}

const Landing: React.FC<Props> = ({ feed }) => {
  const [podcastsList, setPodcastsList] = React.useState<Podcast[]>([]);

  return (
    <div>
      <h1>Home</h1>
      <SearchInput setPodcastsList={setPodcastsList}></SearchInput>
      <nav>
        <Link to="/">Home</Link> | <Link to="/home">Dashboard</Link>
      </nav>

      <p>{feed.title}</p>
      <ul>
        {podcastsList.map(podcast => (
          <li> {podcast.title_original} </li>
        ))}
      </ul>
    </div>
  );
};

export default Landing;
