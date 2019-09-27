import * as React from "react";
import { render } from "react-dom";
import { parse } from "react-native-rss-parser";
import "./styles.css";

interface IPodcastEpisode {
  title: string;
  links: string;
  description: string;
  content: string;
  id: string;
  authors: string[];
  categories: string[];
  published: string;
  enclosures: any[];
  itunes: any;
}

interface IPodcastFeed {
  type: string;
  title: string;
  links: string[];
  description: string;
  language: string;
  copyright: string | undefined;
  authors: string[];
  lastUpdated: string;
  lastPublished: string;
  categories: string[];
  image: {
    description: undefined;
    height: string | undefined;
    title: string;
    url: string;
    width: string | undefined;
  };
  itunes: any;
  items: IPodcastEpisode[];
}
function fetchRss(rssUrl: string, persistCallback) {
  fetch(rssUrl)
    .then(response => response.text())
    .then(parse)
    // .then(persistCallback)
    .then(x => {
      console.log("x", Object.keys(x));
      return x;
    })
    .catch(console.error);
  return () => {};
}
function App() {
  const [feed, setFeed] = React.useState<string>("podcast");
  React.useEffect(
    () => fetchRss("https://feeds.simplecast.com/ky3kewHN", setFeed),
    []
  );
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>{feed.title}</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
