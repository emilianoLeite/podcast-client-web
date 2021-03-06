import React from "react";
import { PodcastSearchResult } from "../../types/Podcast";

interface Props {
  podcasts: PodcastSearchResult["results"];
  handleSubscription?: (podcast: Props["podcasts"][0]) => void;
}

const PodcastList: React.FC<Props> = ({ podcasts, handleSubscription }) => {
  return (
    <ul data-testid="podcast-list">
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
