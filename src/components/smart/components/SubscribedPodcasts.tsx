import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LatestSubscribedEpisodes } from "../../dumb/LatestSubscribedEpisodes";
import { PodcastDetails, PodcastEpisode } from "../../../types/Podcast";
import { PrivateContext } from "../../../context/Auth";

interface Props {
  podcasts: PodcastDetails[];
}
export const SubscribedPodcasts = ({ podcasts }: Props) => {
  const { currentUser } = useContext(PrivateContext);

  const handleAddToQueue = (episode: PodcastEpisode) => {
    currentUser.addToPlayQueue(episode);
  };

  return (
    <React.Fragment>
      <h2> Subscribed Podcasts</h2>
      <ul>
        {podcasts.map((podcast) => (
          <li key={podcast.id}>
            <Link to={`/podcasts/${podcast.id}`} key={podcast.id}>
              {podcast.title}
            </Link>
          </li>
        ))}
      </ul>

      <LatestSubscribedEpisodes podcasts={podcasts} onAddToQueue={handleAddToQueue}/>
    </React.Fragment>
  );
};
