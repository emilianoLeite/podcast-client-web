import React from "react";

import { currentUserRecord } from "../../../shared/firebase";
import { User } from "../../../shared/firebase/entities";
import { PrivateContext } from "../../../context/Auth";
import { PodcastDetails } from "../../../types/Podcast";
import { SubscribedPodcasts } from "../components";


// TODO: Arrumar este "flicker" com React.Suspense
const noPodcastsMesssage = () => <h2> Você não está inscrito em nenhum podcast </h2>;

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

export const Home: React.FC = () => {
  const { currentUser } = React.useContext(PrivateContext);
  const [podcasts, setPodcasts] = React.useState<PodcastDetails[]>([]);
  const [userData, setUserData] = React.useState<User>();

  React.useEffect(() => {
    return currentUserRecord(currentUser.uid).onSnapshot(
      doc => setUserData(doc.data() as User)
    );
  }, [currentUser.uid]);

  React.useEffect(() => {
    const podcastIds = userData?.podcastIds || [];
    if (podcastIds.length > 0) {
      Promise
        .all(podcastIds.map(fetchPodcast))
        .then(setPodcasts);
    }
  }, [userData]);

  return (
    <React.Fragment>
      <h1> Welcome! </h1>
      {podcasts.length > 0 ? <SubscribedPodcasts podcasts={podcasts} /> : noPodcastsMesssage() }
    </React.Fragment>
  );
};
