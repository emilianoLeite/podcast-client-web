import React from "react";

import PodcastSearch from "./PodcastSearch";
import PodcastList from "../dumb/PodcastList";
import Podcast from "../../types/Podcast";
import { subscribe } from "../../shared/firebase";
import { PublicContext } from "../../context/Auth";

const Landing: React.FC = () => {
  const [podcastsList, setPodcastsList] = React.useState<Podcast[]>([]);
  const { currentUser } = React.useContext(PublicContext);

  // estava tentando deixar esta funçao fora do comp pra não ficar criando uma função
  // a cada re-render, mas foda-se por enquanto
  const handleSubscription = (podcast: Podcast) => {
    if (currentUser) {
      // tá foda pensar em como fazer...
      // pq desta maneira, *sempre* estaremos passando o callback pro PodcastList
      // ou seja, ele sempre vai exibir o botão de subscribe, e, seguindo nesta linha,
      // caso o usuário não esteja logado eu posso:
      // 1. Não fazer nada e "falhar silenciosamente"
      // 2. Exibir um erro (péssimo. Não faz sentido mostrar o botão de subscribe
      // só pra logo em seguida mostrar um erro caso o usuário aperte o botão)
      //  2.1 Por enquanto adotei esta abordagem
      // 3. Redirecionar pro fluxo do login
      // De qualquer maneiraaa não faz sentido o handleSubscription ser opcional
      //  no PodcastList se for assim.
      //   3.1 Vou tentar seguir com esta lógica, pra entender como implementa
      //   3.1.1 Não consegui entender como dá pra abrir o widget do firebase Auth
      //   imperativamente, o react-firebaseui não dá muito controle sobre o
      //   widget. Acho que a alternativa será usar o firebase/firebaseui-web (
      //   versão mais pelada do Firebase UI)
      subscribe(podcast, currentUser.uid);
    } else {
      // should never hit this path
      alert("Please log in before subscribing to podcasts");
    }
    // como pegar o currentUser? Acho que vou duplicar as coisas mesmo (neste caso
    // o currentUser pra dentor do PublicContexto)
  };

  return (
    <div>
      <h1>Home</h1>
      <PodcastSearch handleSearchResults={setPodcastsList} />

      <PodcastList handleSubscription={handleSubscription} podcasts={podcastsList}/>
    </div>
  );
};

export default Landing;
