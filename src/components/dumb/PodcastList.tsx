import React from "react";
import { PodcastSearchResult } from "../../types/Podcast";

interface Props {
  podcasts: PodcastSearchResult["results"];
  handleSubscription?: (podcast: PodcastSearchResult["results"][0]) => void;
}

const PodcastList: React.FC<Props> = ({ podcasts, handleSubscription }) => {
  return (
    <ul>
      {podcasts.map(podcast => (
        <React.Fragment key={podcast.id}>
          <li data-testid={`list-item-${podcast.id}`}> {podcast.title_original} </li>
          {handleSubscription && (
            <button onClick={() => handleSubscription(podcast)}>
              Subscribe
            </button>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default PodcastList;
