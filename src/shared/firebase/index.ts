import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { User } from "./entities";
import { config } from "./config";

const firebaseInstance = firebase.initializeApp(config);


export default firebaseInstance;
export const database = firebaseInstance.firestore();
export const auth = firebaseInstance.auth();

const userConverter: firebase.firestore.FirestoreDataConverter<User> = {
  // acho que este toFirestore serve só pra fazer ações de #set, não de #update
  // como ainda não estou usando #set em lugar algum, vou deixar como uma função
  // pass-through
  // TODO: fazer uma implementação real
  toFirestore: (...args) => args,

  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      podcastIds: data.podcastIds,
    };
  },
};

export const currentUserRecord = (userAuthId: firebase.User["uid"]) => {
  return database
    .collection("users")
    .doc(userAuthId)
    .withConverter(userConverter);
};

// ....
// nossa entidade User está diferente do state currentUser. Deveriam ser a mesma
// coisa ?
// Acho que não... 1 é o usuário retornado pelo Firebase Auth (como se fosse uma
// tabela users), outro é a representação da Collection users (como se fosse uma
// tabela podcasts).

// Deveria ter um lugar que deixar explícito que o currentUser.uid (auth) deve
// ser igual ao user.id (entidade)?
// Por enquanto estou deixando isso "explícito" somente no userConverter acima


export const subscribe = (podcast: { id: string }, userId: User["id"]) => {
  currentUserRecord(userId).update({
    podcastIds: firebase.firestore.FieldValue.arrayUnion(podcast.id),
  });
};

export const addToPlayQueue = (episode: { id: string }, userId: User["id"]) => {
  currentUserRecord(userId).update({
    playQueue: firebase.firestore.FieldValue.arrayUnion(episode.id),
  });
};
