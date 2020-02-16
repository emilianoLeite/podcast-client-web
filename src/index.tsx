import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { parse, Feed } from "react-native-rss-parser";

import { PublicContext, CurrentUser, PrivateContext } from "./context/Auth";
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
  const [currentUser, setCurrentUser] = React.useState<CurrentUser | null>(null);
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

  React.useEffect(() => fetchRss(feeds.SyntaxFM, setFeed), []);

  const login = (user: CurrentUser) => {
    setCurrentUser(user);
    setLoggedIn(true);
  };

  const logout = () => {
    setCurrentUser(null);
    setLoggedIn(false);
  };

  const publicAuth = { setCurrentUser, login, loggedIn };

  return (
    <PublicContext.Provider value={publicAuth}>
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/">
            <Landing feed={feed} />
          </Route>
          {currentUser && (
            <PrivateContext.Provider value={{ currentUser, logout }}>
              <Route path="/home">
                <Home />
              </Route>
            </PrivateContext.Provider>
          )}
          <Route path="*">
            <Landing feed={feed} />
          </Route>
        </Switch>
      </Router>
    </PublicContext.Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
