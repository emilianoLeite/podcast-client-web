import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { PublicContext, CurrentUser, PrivateContext } from "./context/Auth";
import Navbar from "./components/dumb/Navbar";
import { Landing, Home } from "./components/smart";
import "./styles.css";
import PodcastShow from "./components/smart/PodcastShow";
import { auth } from "./shared/firebase";

function App() {
  const [currentUser, setCurrentUser] = React.useState<CurrentUser>();
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

  const login = (user: CurrentUser) => {
    setCurrentUser(user);
    setLoggedIn(true);
  };

  const logout = () => {
    setCurrentUser(undefined);
    setLoggedIn(false);
  };

  React.useEffect(() => {
    return auth.onAuthStateChanged(
      (user) => user ? login(user) : null
    );
  }, []);

  const publicAuth = { currentUser, setCurrentUser, login, loggedIn };

  return (
    <React.StrictMode>
      <PublicContext.Provider value={publicAuth}>
        <Router>
          <Navbar />

          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>

            <Route exact path="/podcasts/:id">
              <PodcastShow/>
            </Route>

            {currentUser && (
              <PrivateContext.Provider value={{ currentUser, logout }}>
                <Route path="/home">
                  <Home />
                </Route>
              </PrivateContext.Provider>
            )}

            <Route path="*">
              <Landing />
            </Route>
          </Switch>
        </Router>
      </PublicContext.Provider>
    </React.StrictMode>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
