import React from "react";

import { User } from "../shared/User";
import { database } from "../shared/Firebase";
import { PrivateContext } from "../context/Auth";

interface Podcast {
  title: string;
}

function noPodcastsMesssage() {
  return <h2> Você não está inscrito em nenhum podcast </h2>;
}

function podscastsList(podcasts: Podcast[]) {
  return (
    <ul>
      {podcasts.map((podcast, i) => (
        <li key={i}>{podcast.title}</li>
      ))}
    </ul>
  );
}

const Home: React.FC = () => {
  const { currentUser } = React.useContext(PrivateContext);
  const [podcasts, setPodcasts] = React.useState<Podcast[]>([]);
  const [userData, setUserData] = React.useState<User>();

  React.useEffect(() => {
    return database
      .collection("users")
      .doc(currentUser.uid)
      .onSnapshot(doc => setUserData(doc.data() as User));

  });

  React.useEffect(() => {
    if (userData && userData.podcasts_ids && userData.podcasts_ids.length > 0) {
      fetch("https://listen-api.listennotes.com/api/v2/podcasts", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "X-ListenAPI-Key": "bf15efdf2c5d4c3fbf07529180de1fc5",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `ids=${userData.podcasts_ids.join(",")}`,
      })
        .then(response => response.json())
        .then(parsedResponse => parsedResponse.podcasts)
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
