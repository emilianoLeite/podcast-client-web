import { useEffect, useState } from "react";
import { User } from "../../../shared/firebase/entities";
import { PodcastDetails } from "../../../types/Podcast";

const fetchPodcast = (podcastId: string) => {

  return fetch(`https://listen-api.listennotes.com/api/v2/podcasts/${podcastId}`, {
    method: "GET",
    headers: {
      // TODO: dynamically get this value. Maybe save in firebase?
      "X-ListenAPI-Key": "bf15efdf2c5d4c3fbf07529180de1fc5",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then(response => response.json());
};

export const useSubscribedPodcasts = (userData?: User) => {
  const [podcasts, setPodcasts] = useState<PodcastDetails[]>([]);

  useEffect(() => {
    const podcastIds = userData?.podcastIds || [];
    if (podcastIds.length > 0) {
      Promise
        .all(podcastIds.map(fetchPodcast))
        .then(setPodcasts);
    }
  }, [userData]);

  return podcasts;
};
