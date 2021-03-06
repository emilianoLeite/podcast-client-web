import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { UserData } from "./interfaces";

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

const userConverter: firebase.firestore.FirestoreDataConverter<UserData> = {
  // acho que este toFirestore serve só pra fazer ações de #set, não de #update
  toFirestore: (user) => user,

  fromFirestore: (snapshot, options): UserData => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      podcastIds: data.podcastIds || [],
      playQueue: data.playQueue || [],
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

export const firestoreFunctions = (userId: UserData["id"]) => ({
  subscribe: (podcast: { id: string }) => {
    currentUserRecord(userId).update({
      podcastIds: firebase.firestore.FieldValue.arrayUnion(podcast.id),
    });
  },

  addToPlayQueue: (episode: { id: string }) => {
    currentUserRecord(userId).update({
      playQueue: firebase.firestore.FieldValue.arrayUnion(episode.id),
    });
  },

  updatePlayQueue: (playQueue: UserData["playQueue"]) => {
    currentUserRecord(userId).set({
      playQueue,
    } as UserData, { merge: true });
  },
});
