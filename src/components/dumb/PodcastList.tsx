import React from "react";
import { PodcastSearchResults } from "../../types/Podcast";

interface Props {
  podcasts: PodcastSearchResults[];
  handleSubscription?: (podcast: PodcastSearchResults) => unknown;
}

const PodcastList: React.FC<Props> = ({ podcasts, handleSubscription }) => {
  return (
    <ul>
      {podcasts.map(podcast => (
        <React.Fragment key={podcast.id}>
          <li> {podcast.title_original} </li>
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
