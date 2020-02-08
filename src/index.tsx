import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { parse, Feed } from "react-native-rss-parser";

import AuthContext, { AuthType } from "./context/Auth";
import Navbar from "./components/Navbar";
import { Landing, Home } from "./screens";
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
  return () => {
    return undefined;
  };
}

function App() {
  const [feed, setFeed] = React.useState<Feed>({} as Feed);
  const [currentUser, setCurrentUser] = React.useState<
    AuthType["currentUser"]
  >();
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  React.useEffect(() => fetchRss(feeds.SyntaxFM, setFeed), []);

  const auth = {
    currentUser,
    setCurrentUser,
    loggedIn,
    login: () => {
      setLoggedIn(true);
    },
    logout: () => setLoggedIn(false),
  };

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <Navbar />

        <Switch>
          <Route path="/home">
            <Home />
          </Route>

          <Route path="/">
            <Landing feed={feed} />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
