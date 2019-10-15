import * as React from "react";
import { render } from "react-dom";
import { parse, Feed } from "react-native-rss-parser";
import { Router } from "@reach/router";

import { Landing, Protected } from "./screens";
import "./styles.css";

const feeds = {
  SyntaxFM: "https://feed.syntax.fm/rss",
  TheBikeShed: "https://feeds.simplecast.com/ky3kewHN",
  MamilosPod: "https://feeds.simplecast.com/jfDMsRjh",
};

function fetchRss(
  rssUrl: string,
  persistCallback: React.Dispatch<React.SetStateAction<Feed>>
) {
  fetch(rssUrl)
    .then(response => response.text())
    .then(parse)
    // .then((x) => {
    //   console.log("feed", x);
    //   console.log("item", x.items[0]);
    //   return x;
    // })
    .then(persistCallback)
    .catch(console.error); // eslint-disable-line no-console
  return () => {};
}

function App() {
  const [feed, setFeed] = React.useState<Feed>({} as Feed);
  React.useEffect(() => fetchRss(feeds.SyntaxFM, setFeed), []);

  return (
    <Router>
      <Landing path="/" feed={feed} />
      <Protected path="dashboard" isUserAuthenticated={true} />
    </Router>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
