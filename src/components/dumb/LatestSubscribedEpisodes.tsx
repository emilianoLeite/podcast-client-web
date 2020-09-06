import React from "react";
import { PodcastDetails } from "../../types/Podcast";
import { msToLocaleString } from "../../shared/utils/date";

interface Props {
  podcasts: PodcastDetails[];
}

function latestsEpisodes(podcasts: PodcastDetails[]) {
  return podcasts.map((podcast) => {
    const latestEpisode = [...podcast.episodes]
      .sort((epi1, epi2) => epi2.pub_date_ms - epi1.pub_date_ms)[0];
    return {
      ...podcast,
      latestEpisode,
    };
  });
}

export function LatestSubscribedEpisodes({ podcasts }: Props) {
  return (
    <React.Fragment>
      <h2> Latest Episodes</h2>
      <ul>
        {latestsEpisodes(podcasts).map(({ title, latestEpisode }) => (
          <li key={latestEpisode.id}>
            [{msToLocaleString(latestEpisode.pub_date_ms)}] - {title} - {latestEpisode.title}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}
