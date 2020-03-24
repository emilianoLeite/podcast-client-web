import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { PodcastSearchResults } from "../../types/Podcast";
import { User } from "./entities";

const firebaseInstance = firebase.initializeApp({
  apiKey: "AIzaSyADf8s9TqPGHjucv_lzgO9wMzAdpoKZNzE",
  authDomain: "podcast-client-2c09d.firebaseapp.com",
  databaseURL: "https://podcast-client-2c09d.firebaseio.com",
  projectId: "podcast-client-2c09d",
  storageBucket: "podcast-client-2c09d.appspot.com",
  messagingSenderId: "411094111032",
  appId: "1:411094111032:web:2c0633dd36b384343fa7cd",
});


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
      podcasts_ids: data.podcasts_ids,
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


export const subscribe = (podcast: PodcastSearchResults, userId: User["id"]) => {
  currentUserRecord(userId).update({
    podcasts_ids: firebase.firestore.FieldValue.arrayUnion(podcast.id),
  });
};
