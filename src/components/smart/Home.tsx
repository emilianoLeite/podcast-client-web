import React from "react";

import { currentUserRecord } from "../../shared/firebase";
import { User } from "../../shared/firebase/entities";
import { PrivateContext } from "../../context/Auth";
import { Link } from "react-router-dom";
import { PodcastDetails } from "../../types/Podcast";

interface Podcast {
  id: string;
  title: string;
}

function noPodcastsMesssage() {
  // TODO: Arrumar este "flicker" com React.Suspense
  return <h2> Você não está inscrito em nenhum podcast </h2>;
}

function podscastsList(podcasts: Podcast[]) {
  return (
    <ul>
      {podcasts.map((podcast) => (
        <li key={podcast.id}>
          <Link to={`/podcasts/${podcast.id}`} key={podcast.id}>
            {podcast.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function fetchPodcast(podcastId: string) {

  return fetch(`https://listen-api.listennotes.com/api/v2/podcasts/${podcastId}`, {
    method: "GET",
    headers: {
      // TODO: dynamically get this value. Maybe save in firebase?
      "X-ListenAPI-Key": "bf15efdf2c5d4c3fbf07529180de1fc5",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then(response => response.json());
}

const Home: React.FC = () => {
  const { currentUser } = React.useContext(PrivateContext);
  const [podcasts, setPodcasts] = React.useState<PodcastDetails[]>([]);
  const [userData, setUserData] = React.useState<User>();

  React.useEffect(() => {
    return currentUserRecord(currentUser.uid).onSnapshot(
      doc => setUserData(doc.data() as User)
    );
  }, [currentUser.uid]);

  React.useEffect(() => {
    const podcastsIds = userData?.podcasts_ids || [];
    if (podcastsIds.length > 0) {
      Promise
        .all(podcastsIds.map(fetchPodcast))
        .then(setPodcasts);
    }
  }, [userData]);

  return (
    <React.Fragment>
      <h1> Welcome! </h1>
      {podcasts.length > 0 ? podscastsList(podcasts) : noPodcastsMesssage()}
    </React.Fragment>
  );
};

export default Home;
