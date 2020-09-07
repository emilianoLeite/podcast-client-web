import React from "react";

import PodcastSearch from "./PodcastSearch";
import PodcastList from "../dumb/PodcastList";
import { PodcastSearchResult } from "../../types/Podcast";
import { auth, subscribe } from "../../shared/firebase";
import { PublicContext, Public } from "../../context/Auth";


const podcastList = (
  currentUser: Public["currentUser"],
  podcastsList: PodcastSearchResult["results"]
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
  const [podcastsList, setPodcastsList] = React.useState<PodcastSearchResult["results"]>([]);
  const { currentUser } = React.useContext(PublicContext);

  return (
    <div>
      <span>{auth.currentUser ? JSON.stringify(auth.currentUser) : "not logged in" }</span>
      <h1>Home</h1>
      <PodcastSearch handleSearchResults={setPodcastsList} />

      {podcastList(currentUser, podcastsList)}
    </div>
  );
};

export default Landing;
