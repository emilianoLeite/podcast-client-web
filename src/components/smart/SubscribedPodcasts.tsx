import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LatestSubscribedEpisodes } from "../dumb/LatestSubscribedEpisodes";
import { PodcastDetails, PodcastEpisode } from "../../types/Podcast";
import { addToPlayQueue } from "../../shared/firebase";
import { PrivateContext } from "../../context/Auth";

interface Props {
  podcasts: PodcastDetails[];
}
export function SubscribedPodcasts({ podcasts }: Props) {
  const { currentUser } = useContext(PrivateContext);

  function handleAddToQueue(episode: PodcastEpisode) {
    addToPlayQueue(episode, currentUser.uid);
  }

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
}
