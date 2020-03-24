import React from "react";
import { PodcastSearchResults } from "../../types/Podcast";

interface Props {
  handleSearchResults: (podcasts: PodcastSearchResults[]) => void;
}

const PodcastSearch: React.FC<Props> = ({ handleSearchResults }) => {

  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <React.Fragment>
      <input type="text" onChange={(e) => setSearchTerm(e.target.value)}></input>
      <button onClick={() => {
        fetch(`https://listen-api.listennotes.com/api/v2/search?type=podcast&q=${searchTerm}`, {
          method: "GET",
          headers: {
            "X-ListenAPI-Key": "bf15efdf2c5d4c3fbf07529180de1fc5",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
          .then(response => response.json())
          .then(parsedResponse => parsedResponse.results as PodcastSearchResults[])
          .then(handleSearchResults);
      }}>
        Search
      </button>
    </React.Fragment>
  );
};

export default PodcastSearch;
