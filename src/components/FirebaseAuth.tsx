import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

import AuthContext from "../context/Auth";

firebase.initializeApp({
  apiKey: "AIzaSyADf8s9TqPGHjucv_lzgO9wMzAdpoKZNzE",
  authDomain: "podcast-client-2c09d.firebaseapp.com",
  databaseURL: "https://podcast-client-2c09d.firebaseio.com",
  projectId: "podcast-client-2c09d",
  storageBucket: "podcast-client-2c09d.appspot.com",
  messagingSenderId: "411094111032",
  appId: "1:411094111032:web:2c0633dd36b384343fa7cd",
});

const FirebaseAuth: React.FC<{}> = () => {
  const { login } = React.useContext(AuthContext);

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "", // not used
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        login();
        return false; // Avoid firebase's default redirect after successful sign-in.
      },
    },
  };

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />;
};

export default FirebaseAuth;
