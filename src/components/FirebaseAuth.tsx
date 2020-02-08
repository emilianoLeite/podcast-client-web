import React from "react";
import { auth as googleAuth } from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { PublicContext, PrivateContext } from "../context/Auth";

import { auth } from "../shared/Firebase";
import { Redirect } from "react-router-dom";

const FirebaseAuth: React.FC = () => {
  const { login, loggedIn } = React.useContext(PublicContext);
  const [redirectToHome, setRedirectToHome] = React.useState(false);

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "", // not used
    signInOptions: [googleAuth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (result: { user: { uid: string } }) => {
        login(result.user);
        setRedirectToHome(true);
        return false; // Avoid firebase's default redirect after successful sign-in.
      },
    },
  };

  if (loggedIn) {
    return redirectToHome ? (
      <Redirect to="/home" />
    ) : (
      <h1> Unreachable element - DEBUG IS THIS SHOWS ON SCREEN </h1>
    );
  } else {
    // TODO:
    // parece que este componente "se esconde" automaticamente após login com sucesso...
    // investigar se é isso mesmo
    return (
      <StyledFirebaseAuth
        uiCallback={ui => ui.disableAutoSignIn()}
        uiConfig={uiConfig}
        firebaseAuth={auth}
      />
    );
  }
};

export default FirebaseAuth;
