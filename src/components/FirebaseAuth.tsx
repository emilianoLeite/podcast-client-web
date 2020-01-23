import React from "react";
import { auth as googleAuth } from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import AuthContext from "../context/Auth";

import { auth } from "../shared/Firebase";
import { Redirect } from "react-router-dom";

const FirebaseAuth: React.FC = () => {
  const { login, loggedIn, setCurrentUser } = React.useContext(AuthContext);
  const [redirectToHome, setRedirectToHome] = React.useState(false);

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "", // not used
    signInOptions: [googleAuth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (result: { user: { uid: string } }) => {
        setCurrentUser(result.user);
        setRedirectToHome(true);
        login();
        return false; // Avoid firebase's default redirect after successful sign-in.
      }
    }
  };

  return loggedIn ? (
    redirectToHome ? (
      <Redirect to="/home" />
    ) : (
      <></>
    )
  ) : (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
  );
};

export default FirebaseAuth;
