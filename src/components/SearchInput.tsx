import React from "react";
import Podcast from "../types/Podcast";

const SearchInput: React.FC<{setPodcastsList: (podcasts: Podcast[]) => void}> = ({setPodcastsList}) => {

  const [searchTerm, setSearchTerm ] = React.useState("")

  return (
    <React.Fragment>
      <input type="text" onChange={(e) => setSearchTerm(e.target.value)}></input>
      <button onClick={
        () => {
          fetch(`https://listen-api.listennotes.com/api/v2/search?q=${searchTerm}`, {
            method: "GET",
            headers: {
              "X-ListenAPI-Key": "bf15efdf2c5d4c3fbf07529180de1fc5",
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
          .then((response) => response.json())
          .then((parsedReponse : { results: Podcast[]} ) => setPodcastsList(parsedReponse.results))
        }
      }>Search</button>
    </React.Fragment>
  );
};

export default SearchInput;