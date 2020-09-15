import { useEffect, useState } from "react";
import { UserData } from "../../../shared/firebase/interfaces";
import { PodcastEpisode } from "../../../types/Podcast";

const fetchEpisode = (episodeId: string) => {

  return fetch(`https://listen-api.listennotes.com/api/v2/episodes/${episodeId}`, {
    method: "GET",
    headers: {
      // TODO: dynamically get this value. Maybe save in firebase?
      "X-ListenAPI-Key": "bf15efdf2c5d4c3fbf07529180de1fc5",
    },
  }).then(response => response.json());
};

export const usePlayQueue = (userData?: UserData) => {
  const [playQueue, setPlayQueue] = useState<ReadonlyArray<PodcastEpisode>>([]);

  useEffect(() => {
    const episodeIds = userData?.playQueue || [];
    if (episodeIds.length > 0) {
      Promise
        .all(episodeIds.map(fetchEpisode))
        .then(setPlayQueue);
    }
  }, [userData]);

  return playQueue;
};
