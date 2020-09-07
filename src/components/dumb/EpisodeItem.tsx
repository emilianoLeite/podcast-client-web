import React from "react";
import { PodcastEpisode } from "../../types/Podcast";
import { msToLocaleString } from "../../shared/utils/date";

interface Props {
  episode: PodcastEpisode;
  podcastTitle?: string;
  onAddToQueue?: (episode: PodcastEpisode) => void;
}

export function EpisodeItem({ episode, podcastTitle, onAddToQueue }: Props) {
  return <React.Fragment>
    <span>
      [{msToLocaleString(episode.pub_date_ms)}] {podcastTitle ? `- ${podcastTitle} - ` : ""}{episode.title}
    </span>
    {onAddToQueue ? <button onClick={() => onAddToQueue(episode)}> Add to play queue </button> : null }
  </React.Fragment>;
}
