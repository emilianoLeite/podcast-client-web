import React from "react";
import Podcast from "../../types/Podcast";


interface Props {
  podcasts: Podcast[];
  handleSubscription?: (podcast: Podcast) => unknown;
}

const PodcastList: React.FC<Props> = ({ podcasts, handleSubscription }) => {
  return (
    <ul>
      {podcasts.map(podcast => (
        <React.Fragment>
          <li key={podcast.id}> {podcast.title_original} </li>
          {/* desta maneira abaixo, o componente fica agnóstico em relação a estar sendo renderizado num contexto público/privado */}
          {handleSubscription && <button onClick={() => handleSubscription(podcast)}>
            Subscribe
          </button>}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default PodcastList;
