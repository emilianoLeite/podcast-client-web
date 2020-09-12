
import React from "react";
import { useParams } from "react-router-dom";
import { PodcastDetails } from "../../../types/Podcast";
import { EpisodeItem } from "../../dumb/EpisodeItem";


// TODO: receive podcast as prop
export const PodcastShow = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = React.useState<PodcastDetails>();
  React.useEffect(() => {
    fetch(`https://listen-api.listennotes.com/api/v2/podcasts/${id}`, {
      method: "GET",
      headers: {
        "X-ListenAPI-Key": "bf15efdf2c5d4c3fbf07529180de1fc5",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((podcast) => podcast.json())
      .then(setPodcast);
  }, [id]);

  return podcast ? <React.Fragment>
    <h1> {podcast.title} </h1>
    <p>{podcast.description}</p>
    <h2> Latest episodes </h2>
    <ul>
      {podcast.episodes.slice(0, 10).map((episode) => (
        <li key={episode.id}> <EpisodeItem episode={episode}/> </li>
      ))}
    </ul>
  </React.Fragment>
    : <h3> Loading... </h3>;
};
