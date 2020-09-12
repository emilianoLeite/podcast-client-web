import React from "react";
import { auth as googleAuth } from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { PublicContext } from "../../../context/Auth";
import { auth } from "../../../shared/firebase";

const FirebaseAuth: React.FC = () => {
  const { loggedIn } = React.useContext(PublicContext);

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/home",
    signInOptions: [googleAuth.GoogleAuthProvider.PROVIDER_ID],
  };

  // I can't return the JSX directly because I get an
  // "Could not find the FirebaseUI widget element on the page." error
  const firebaseButton = <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>;

  if (!loggedIn) {
    return firebaseButton;
  } else {
    return null;
  }
};

export default FirebaseAuth;
