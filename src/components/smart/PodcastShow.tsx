
import React from "react";
import { useParams } from "react-router-dom";
import { PodcastDetails } from "../../types/Podcast";


// TODO: receive podcast as prop
const PodcastShow = () => {
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

  return podcast ? <>
    <h1> {podcast.title} </h1>
    <p>{podcast.description}</p>
    <h2> Latest episodes </h2>
    <ul>
      {podcast.episodes.slice(0, 10).map((episode) => (
        <li key={episode.id}> [{new Date(episode.pub_date_ms).toLocaleDateString()}] {episode.title} </li>
      ))}
    </ul>
  </>
    : <h3> Loading... </h3>;
};

export default PodcastShow;
