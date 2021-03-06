import React from "react";

import PodcastSearch from "../components/PodcastSearch";
import PodcastList from "../../dumb/PodcastList";
import { PodcastSearchResult } from "../../../types/Podcast";
import { PublicContext, Public } from "../../../context/Auth";


const podcastList = (
  currentUser: Public["currentUser"],
  podcastsList: PodcastSearchResult["results"]
): JSX.Element => {
  if (currentUser) {
    return (
      <PodcastList
        handleSubscription={(podcast) => currentUser.subscribe(podcast)}
        podcasts={podcastsList}
      />
    );
  } else {
    return <PodcastList podcasts={podcastsList} />;
  }
};

export const Landing: React.FC = () => {
  const [podcastsList, setPodcastsList] = React.useState<PodcastSearchResult["results"]>([]);
  const { currentUser } = React.useContext(PublicContext);

  return (
    <div>
      <h1>Home</h1>
      <PodcastSearch handleSearchResults={setPodcastsList} />

      {podcastList(currentUser, podcastsList)}
    </div>
  );
};
