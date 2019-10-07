import * as React from "react";
import { render } from "react-dom";
import { parse, IFeed } from "react-native-rss-parser";
import "./styles.css";

const feeds = {
  SyntaxFM: "https://feed.syntax.fm/rss",
  TheBikeShed: "https://feeds.simplecast.com/ky3kewHN",
  MamilosPod: "https://feeds.simplecast.com/jfDMsRjh",
}

function fetchRss(rssUrl: string, persistCallback: React.Dispatch<React.SetStateAction<IFeed>>) {
  fetch(rssUrl)
    .then(response => response.text())
    .then(parse)
    // .then((x) => {
    //   console.log("feed", x);
    //   console.log("item", x.items[0]);
    //   return x;
    // })
    .then(persistCallback)
    .catch(console.error);
  return () => {};
}
function App() {
  const [feed, setFeed] = React.useState<IFeed>({} as IFeed);
  React.useEffect(
    () => fetchRss(feeds.MamilosPod, setFeed),
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
