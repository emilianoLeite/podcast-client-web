import React from "react";

import { SubscribedPodcasts } from "../components/SubscribedPodcasts";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useSubscribedPodcasts } from "../hooks/useSubscribedPodcasts";

// TODO: Arrumar este "flicker" com React.Suspense
const noPodcastsMesssage = () => <h2> Você não está inscrito em nenhum podcast </h2>;

export const Home: React.FC = () => {
  const { userData } = useCurrentUser();
  const podcasts = useSubscribedPodcasts(userData);

  return (
    <React.Fragment>
      <h1> Welcome! </h1>
      {podcasts.length > 0 ? <SubscribedPodcasts podcasts={podcasts} /> : noPodcastsMesssage() }
    </React.Fragment>
  );
};
