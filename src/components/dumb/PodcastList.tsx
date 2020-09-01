import React from "react";
import { PodcastDetails } from "../../types/Podcast";

interface Props {
  podcasts: PodcastDetails[];
  handleSubscription?: (podcast: PodcastDetails) => unknown;
}

const PodcastList: React.FC<Props> = ({ podcasts, handleSubscription }) => {
  return (
    <ul>
      {podcasts.map(podcast => (
        <React.Fragment key={podcast.id}>
          <li> {podcast.title} </li>
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
