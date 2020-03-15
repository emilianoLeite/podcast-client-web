import React from "react";

import PodcastSearch from "./PodcastSearch";
import PodcastList from "../dumb/PodcastList";
import Podcast from "../../types/Podcast";
import { subscribe } from "../../shared/firebase";
import { PublicContext } from "../../context/Auth";

const Landing: React.FC = () => {
  const [podcastsList, setPodcastsList] = React.useState<Podcast[]>([]);
  const { currentUser } = React.useContext(PublicContext);

  const handleSubscription = (podcast: Podcast) => {
    if (currentUser) {
      subscribe(podcast, currentUser.uid);
    } else {
      // should never hit this path
      alert("Please log in before subscribing to podcasts");
    }
  };

  const podcastList = (): JSX.Element => {
    return currentUser ? (
      <PodcastList
        handleSubscription={handleSubscription}
        podcasts={podcastsList}
      />
    ) : (
      <PodcastList podcasts={podcastsList} />
    );
  };

  return (
    <div>
      <h1>Home</h1>
      <PodcastSearch handleSearchResults={setPodcastsList} />

      {podcastList()}
    </div>
  );
};

export default Landing;
