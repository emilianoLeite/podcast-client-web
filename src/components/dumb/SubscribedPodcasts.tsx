import React from "react";
import { Link } from "react-router-dom";
import { LatestSubscribedEpisodes } from "./LatestSubscribedEpisodes";
import { PodcastDetails } from "../../types/Podcast";

interface Props {
  podcasts: PodcastDetails[];
}

export function SubscribedPodcasts({ podcasts }: Props) {
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

      <LatestSubscribedEpisodes podcasts={podcasts}/>
    </React.Fragment>
  );
}
