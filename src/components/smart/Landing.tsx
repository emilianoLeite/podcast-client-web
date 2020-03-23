import React from "react";

import PodcastSearch from "./PodcastSearch";
import PodcastList from "../dumb/PodcastList";
import Podcast from "../../types/Podcast";
import { subscribe } from "../../shared/firebase";
import { PublicContext, Public } from "../../context/Auth";


const podcastList = (
  currentUser: Public["currentUser"],
  podcastsList: Podcast[]
): JSX.Element => {
  if (currentUser) {
    return (
      <PodcastList
        handleSubscription={(podcast) => subscribe(podcast, currentUser.uid)}
        podcasts={podcastsList}
      />
    );
  } else {
    return <PodcastList podcasts={podcastsList} />;
  }
};

const Landing: React.FC = () => {
  const [podcastsList, setPodcastsList] = React.useState<Podcast[]>([]);
  const { currentUser } = React.useContext(PublicContext);

  return (
    <div>
      <h1>Home</h1>
      <PodcastSearch handleSearchResults={setPodcastsList} />

      {podcastList(currentUser, podcastsList)}
    </div>
  );
};

export default Landing;
