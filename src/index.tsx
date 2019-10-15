import * as React from "react";
import { render } from "react-dom";
import { parse, Feed } from "react-native-rss-parser";
import { Button, Icon } from "semantic-ui-react";
import "./styles.css";
import 'semantic-ui-css/semantic.min.css'

const feeds = {
  SyntaxFM: "https://feed.syntax.fm/rss",
  TheBikeShed: "https://feeds.simplecast.com/ky3kewHN",
  MamilosPod: "https://feeds.simplecast.com/jfDMsRjh",
};

function fetchRss(rssUrl: string, persistCallback: React.Dispatch<React.SetStateAction<Feed>>): () => void {
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
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>{feed.title}</p>
      <Button animated>
        <Button.Content visible> Login </Button.Content>
        <Button.Content hidden>
          <Icon name='arrow right' />
        </Button.Content>
      </Button>
      <Button>
        <Button.Content visible>
          <Icon name='google' />
        </Button.Content>
      </Button>
      <Button content={<Icon name="google" />} />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
