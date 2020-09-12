import React from "react";
import { PodcastDetails, PodcastEpisode } from "../../types/Podcast";
import { EpisodeItem } from "./EpisodeItem";

interface Props {
  podcasts: PodcastDetails[];
  onAddToQueue?: (episode: PodcastEpisode) => void;
}

const latestsEpisodes = (podcasts: PodcastDetails[]) => {
  return podcasts.map((podcast) => {
    const latestEpisode = [...podcast.episodes]
      .sort((epi1, epi2) => epi2.pub_date_ms - epi1.pub_date_ms)[0];
    return {
      ...podcast,
      latestEpisode,
    };
  });
};

export const LatestSubscribedEpisodes = ({ podcasts, onAddToQueue }: Props) => {
  return (
    <React.Fragment>
      <h2> Latest Episodes</h2>
      <ul>
        {latestsEpisodes(podcasts).map(({ title, latestEpisode }) => (
          <li key={latestEpisode.id}>
            <EpisodeItem episode={latestEpisode} podcastTitle={title} onAddToQueue={onAddToQueue}/>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};
