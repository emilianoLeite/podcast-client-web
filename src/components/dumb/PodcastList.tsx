import React from "react";
import Podcast from "../../types/Podcast";

interface Props {
  podcasts: Podcast[];
  handleSubscription?: (podcast: Podcast) => unknown;
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
