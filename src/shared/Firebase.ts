import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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
